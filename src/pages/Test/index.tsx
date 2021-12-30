import { FC, ReactDOM, useState, useEffect, isValidElement } from 'react';
import {
  Modal,
  Typography,
  Button,
  Radio,
  Progress,
  RadioChangeEvent,
  Space,
  notification,
} from 'antd';
import { Dispatch, connect, testState } from 'umi';
import { UserType } from '@/pages/System/User/data';
import { ScaleType } from '@/pages/Base/Scale/data';

interface TestProps {
  isModalVisible: boolean;
  user: UserType;
  scale: ScaleType[];
  test: testState;
  dispatch: Dispatch;
  handleOk: () => void;
  handleCancel: () => void;
}

interface QAType {
  questionId: string;
  answerId: string;
}

const Test: FC<TestProps> = (props) => {
  const {
    isModalVisible,
    user,
    scale,
    test,
    dispatch,
    handleOk,
    handleCancel,
  } = props;
  const { Paragraph, Text, Title } = Typography;
  const [started, setStarted] = useState<boolean>(false);

  /**
   * 点击答案，setCurrentA,setQAValues,下一题setCurrentQ，setCurrentA
   * 上一题：setCurrentQ,setCurrentA
   * 下一题：setCurrentQ,setCurrentA
   * current.disable避免重复点击
   */
  const [current, setCurrent] = useState<{
    currentQ: number;
    currentA: '';
    fromRadio: boolean;
    disabled: boolean;
  }>({
    currentQ: 1,
    currentA: '',
    fromRadio: true,
    disabled: false,
  });
  const [qaValues, setQaValues] = useState<any[]>([]);

  // 打开modal，加载量表、题目、答案
  useEffect(() => {
    setStarted(false);
    setCurrent({
      currentQ: 1,
      currentA: '',
      fromRadio: true,
      disabled: false,
    });
    setQaValues([]);
    if (isModalVisible) {
      // 加载量表信息
      dispatch({
        type: 'test/fetechScaleInfo',
        payload: { scaleId: scale?.at(0)?.id },
      });
    }
  }, [isModalVisible]);

  // 当前答案更新后，放入qsValues中
  useEffect(() => {
    if (current.fromRadio) {
      setTimeout(() => {
        // console.log('currentA', currentA);
        if (current.currentA !== '') {
          const questionId = test.question?.at(current.currentQ)?.id;
          setQaValues([
            ...qaValues.slice(0, current.currentQ - 1),
            { questionId: questionId, answerId: current.currentA },
            ...qaValues.slice(current.currentQ, qaValues.length),
          ]);
        }
      }, 200);
    }
  }, [current]);

  // qaValues更新后，跳转到下一题。如果是新打开modal则qaValues为空，不会跳转
  useEffect(() => {
    console.log('qa', qaValues);
    if (qaValues.length !== 0) {
      if (current.fromRadio) {
        nextQ();
      }
    }
  }, [qaValues]);

  // 开始测评
  const startTest = () => {
    setStarted(true);
    setCurrent({
      currentA: '',
      currentQ: 1,
      fromRadio: true,
      disabled: false,
    });
    setQaValues([]);
  };

  // 下一题
  const nextQ = () => {
    console.log('ca', current.currentA);
    if (current.currentA === '' || current.currentA === undefined) {
      notification.warn({
        message: `不允许跳题。`,
      });
      return;
    }
    if (current.currentQ + 1 <= test.question.length) {
      setCurrent({
        currentQ: current.currentQ + 1,
        currentA: qaValues.at(current.currentQ)?.answerId,
        fromRadio: false,
        disabled: false,
      });
    }
  };

  // 下一题按钮
  const nextButton = () => {
    nextQ();
  };

  // 上一题按钮
  const preButton = () => {
    if (current.currentQ - 1 >= 1) {
      // const questionId = test.question?.at(current.currentQ - 1)?.id;
      setCurrent({
        currentQ: current.currentQ - 1,
        currentA:
          qaValues.at(current.currentQ - 2) !== undefined
            ? qaValues.at(current.currentQ - 2).answerId
            : '',
        fromRadio: false,
        disabled: false,
      });
    }
  };

  // 点击答案，更新currentA
  const clickAnswer = (e: RadioChangeEvent) => {
    setCurrent({
      currentQ: current.currentQ,
      currentA: e.target.value,
      fromRadio: true,
      disabled: true,
    });
  };

  // 渲染答案选项
  const renderAnswser = () => {
    // console.log('rrrrr', current.currentQ);
    const q = test.question?.at(current.currentQ - 1);
    if (q !== undefined) {
      const qId = q.id;
      if (qId !== undefined) {
        const answerGroupCode = test.question?.at(
          current.currentQ - 1,
        )?.answerGroupCode;

        return (
          <Radio.Group value={current.currentA}>
            {/* <Radio.Group> */}
            <Space direction="vertical">
              {test.answer?.map((a) => {
                if (a.groupCode === answerGroupCode) {
                  return (
                    <Radio
                      value={a.option}
                      key={a.id}
                      onClick={clickAnswer}
                      disabled={current.disabled}
                    >
                      <Title level={5}>
                        {a.option}. {a.name}
                      </Title>
                    </Radio>
                  );
                }
              })}
            </Space>
          </Radio.Group>
        );
      }
    }
  };

  return (
    <div>
      <Modal
        title={`测评-${test?.scale?.name}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        footer={false}
        width={600}
        bodyStyle={{
          height: 400,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* 开始答题前，显示量表名称，提示信息和开始按钮 */}
        <div
          style={{
            display: started ? 'none' : 'flex',
            width: '70%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 360,
          }}
        >
          {/* 量表名称 */}
          <Title style={{ display: started ? 'none' : 'block' }} level={4}>
            {test?.scale?.name}
          </Title>
          {/* 提示信息 */}
          <Title level={5}>{test?.scale?.introduction}</Title>
          {/* 开始测评按钮 */}
          <Button
            type="primary"
            style={{ display: started ? 'none' : 'block' }}
            onClick={startTest}
          >
            开始测评
          </Button>
        </div>

        {/* 开始测评后，显示题目、选项和控制按钮 */}
        <div
          style={{
            display: started ? 'flex' : 'none',
            width: '70%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 360,
          }}
        >
          <Progress
            percent={(current.currentQ * 100) / test.question?.length}
            format={() => `${current.currentQ}/${test.question?.length}`}
          />
          <Title level={5} style={{ width: '70%' }}>
            {current.currentQ}. {test.question?.at(current.currentQ - 1)?.name}
          </Title>
          <div style={{}}>{renderAnswser()}</div>
          <Space direction="horizontal">
            <Button
              style={{ display: started ? 'block' : 'none' }}
              disabled={current.currentQ === 1 ? true : false}
              onClick={preButton}
            >
              上一题
            </Button>
            <Button
              style={{ display: started ? 'block' : 'none' }}
              disabled={
                current.currentQ === test.question.length ? true : false
              }
              onClick={nextButton}
            >
              下一题
            </Button>
            <Button
              type="primary"
              style={{ display: started ? 'block' : 'none' }}
            >
              提交
            </Button>
          </Space>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ test }: { test: testState }) => {
  return {
    test,
  };
};

export default connect(mapStateToProps)(Test);
