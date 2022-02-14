import { FC, useEffect } from 'react';
import { Modal, Collapse, Skeleton, Descriptions, Table } from 'antd';
const { Panel } = Collapse;
import { Bullet, Column, Line } from '@ant-design/plots/es';
// import Line from '@ant-design/charts/es/plots/line';
import { Dispatch, resultState, connect, Loading } from 'umi';
import './ResultView.css';

interface ResultViewProps {
  visible: boolean;
  resultId?: string;
  result: resultState;
  loading: boolean;
  closeHandler: () => void;
  dispatch?: Dispatch;
}

const ResultView: FC<ResultViewProps> = (props) => {
  const { visible, resultId, result, loading, closeHandler, dispatch } = props;

  // 第二个参数是触发条件
  useEffect(() => {
    if (visible && resultId) {
      if (dispatch) {
        dispatch({
          type: 'result/fetchView',
          payload: {
            resultId,
          },
        });
      }
    }
    if (!visible) {
      if (dispatch) {
        dispatch({
          type: 'result/clear',
          payload: {
            resultId,
          },
        });
      }
    }
  }, [visible]);

  const onOk = () => {};

  return (
    <div>
      <Modal
        title="查看结果"
        maskClosable={false}
        centered
        forceRender
        width={1000}
        bodyStyle={{ height: 600, overflowY: 'auto' }}
        // style={{ overflowY: 'auto', height: 700 }}
        visible={visible}
        onOk={onOk}
        onCancel={closeHandler}
        // confirmLoading={confirmLoading}
      >
        <Collapse
          bordered={false}
          defaultActiveKey={[
            'scaleInfo',
            'userInfo',
            'assessTime',
            'assessResult',
            'assessConclusion',
          ]}
        >
          <Panel
            header="量表信息"
            key="scaleInfo"
            className="site-collapse-custom-panel"
          >
            <Skeleton loading={loading}>
              <Descriptions column={1}>
                <Descriptions.Item label="量表名称">
                  {result.scaleName}
                </Descriptions.Item>
                <Descriptions.Item label="量表编号">
                  {result.scaleCode}
                </Descriptions.Item>
              </Descriptions>
            </Skeleton>
          </Panel>
          <Panel header="用户基本信息" key="userInfo">
            <Skeleton loading={loading}>
              <Descriptions column={2}>
                <Descriptions.Item label="账号">
                  {result.username}
                </Descriptions.Item>
                <Descriptions.Item label="姓名">
                  {result.realName}
                </Descriptions.Item>
                <Descriptions.Item label="性别">{result.sex}</Descriptions.Item>
                <Descriptions.Item label="年龄">{result.age}</Descriptions.Item>
              </Descriptions>
            </Skeleton>
          </Panel>
          <Panel header="测评时间" key="assessTime">
            <Skeleton loading={loading}>
              <Descriptions column={1}>
                <Descriptions.Item label="开始时间">
                  {result.startTime}
                </Descriptions.Item>
                <Descriptions.Item label="结束时间">
                  {result.endTime}
                </Descriptions.Item>
                <Descriptions.Item label="用时">
                  {result.usedTime}
                </Descriptions.Item>
              </Descriptions>
            </Skeleton>
          </Panel>
          <Panel header="测评结果" key="assessResult">
            <Skeleton loading={loading}>
              <Table
                columns={result.columns}
                dataSource={result?.scores}
                // rowKey="id"
                loading={loading}
                pagination={false}
                size="small"
              />
              {result.chartsType == 'Bullet' ? (
                <Bullet {...result?.charts} />
              ) : result.chartsType == 'Column' ? (
                <Column {...result?.charts} />
              ) : result.chartsType == 'Line' ? (
                <Line {...result?.charts} />
              ) : (
                ''
              )}
            </Skeleton>
          </Panel>
          <Panel header="分析建议" key="assessConclusion">
            <Skeleton loading={loading}>
              <Descriptions column={1}>
                {result?.adviseList?.map((item: string, index: number) => {
                  return (
                    <Descriptions.Item label="" key={index}>
                      {item}
                    </Descriptions.Item>
                  );
                })}
              </Descriptions>
            </Skeleton>
          </Panel>
          <Panel header="附答卷" key="appendix">
            <Skeleton loading={loading}>
              <Descriptions column={1}>
                {result?.appendixList?.map((item: any, index: number) => {
                  return (
                    <Descriptions.Item
                      key={index}
                      label={`${index + 1}. ${item.question}`}
                    >
                      {item.option}. {item.answer}
                    </Descriptions.Item>
                  );
                })}
              </Descriptions>
            </Skeleton>
          </Panel>
        </Collapse>
      </Modal>
    </div>
  );
};

const mapStateToProps = ({
  result,
  loading,
}: {
  result: resultState;
  loading: Loading;
}) => {
  return {
    result,
    loading: loading.models.result,
  };
};

export default connect(mapStateToProps)(ResultView);
