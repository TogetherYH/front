import { FC, useState, useEffect } from 'react';
import {
  Table,
  Space,
  Button,
  Popconfirm,
  Card,
  Pagination,
  Input,
  Form,
  Row,
  Col,
  Tree,
} from 'antd';
import {
  connect,
  Dispatch,
  Loading,
  questionListState,
  scaleTreeState,
} from 'umi';
import QuestionModal from './components/QuestionModal';
import { QuestionType, FormValues } from './data';

interface QuestionProps {
  questions: questionListState;
  scaleTree: scaleTreeState;
  dispatch: Dispatch;
  questionListLoading: boolean;
}

const Question: FC<QuestionProps> = ({
  questions,
  scaleTree,
  dispatch,
  questionListLoading,
}) => {
  const [questionModalVisible, setQuestionModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [record, setRecord] = useState<UserType | undefined>(undefined);
  const [questionId, setQuestionId] = useState<string | undefined>('');
  const [scaleId, setScaleId] = useState<string>('');
  const [searchForm] = Form.useForm();

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 300,
    },
    {
      title: '编码',
      dataIndex: 'code',
      key: 'code',
      width: 100,
    },
    {
      title: '答案编码',
      dataIndex: 'answerGroupCode',
      key: 'answerGroupCode',
      width: 100,
    },
    {
      title: '顺序',
      dataIndex: 'order',
      key: 'order',
      width: 50,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 170,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 70,
    },
    {
      title: '操作',
      key: 'action',
      // render: (text: string, record: QuestionType) => (
      //   <Space size="middle">
      //     <a
      //       onClick={() => {
      //         editHandler(record);
      //       }}
      //     >
      //       修改
      //     </a>
      //     <Popconfirm
      //       title="Are you sure to delete this task?"
      //       onConfirm={() => {
      //         deleteHandler(record);
      //       }}
      //       okText="Yes"
      //       cancelText="No"
      //     >
      //       <a style={{}}>删除</a>
      //     </Popconfirm>
      //   </Space>
      // ),
    },
  ];

  // 分页
  const paginationHandler = (pageNum: number, pageSize: number | undefined) => {
    dispatch({
      type: 'questions/fetchList',
      payload: {
        name: searchForm.getFieldValue('name'),
        scaleId,
        pageNum,
        pageSize,
      },
    });
  };

  // 搜索
  const searchHandler = () => {
    dispatch({
      type: 'questions/fetchList',
      payload: {
        name: searchForm.getFieldValue('name'),
        scaleId,
        pageNum: 1,
        pageSize: questions?.pageSize,
      },
    });
  };

  // 刷新
  const refreshHandler = () => {
    dispatch({
      type: 'questions/fetchList',
      payload: {
        name: searchForm.getFieldValue('name'),
        scaleId,
        pageNum: questions?.pageNum,
        pageSize: questions?.pageSize,
      },
    });
  };

  // 打开添加modal
  const addHandler = () => {
    setQuestionId(undefined);
    setQuestionModalVisible(true);
  };

  // 打开编辑modal
  const editHandler = (record: QuestionType) => {
    setQuestionId(record.id);
    setQuestionModalVisible(true);
  };

  // 关闭Modal
  const closeHandler = () => {
    setQuestionModalVisible(false);
  };

  // 添加、更新处理方法
  const onFinish = (values: FormValues) => {
    // console.log('form on finish');
    setConfirmLoading(true);
    let id = '';
    if (questionId) {
      id = questionId;
    }
    if (id) {
      dispatch({
        type: 'questions/fetchUpdate',
        payload: {
          id,
          values: {
            ...values,
            status: values.status ? '1' : '0',
          },
        },
      });
    } else {
      dispatch({
        type: 'questions/fetchAdd',
        payload: {
          values: {
            ...values,
            status: values.status ? '1' : '0',
          },
        },
      });
    }

    // 关闭modal
    setQuestionModalVisible(false);
    setConfirmLoading(false);
  };

  // 删除记录
  const deleteHandler = (record: QuestionType) => {
    // setRecord(record);
    const id = record.id;
    dispatch({
      type: 'questions/fetchDelete',
      payload: { id },
    });
  };

  const handleSelect = (selectedKeys: React.Key[], info: any) => {
    // console.log('selected', selectedKeys, info);
    setScaleId(selectedKeys[0]);
    dispatch({
      type: 'questions/fetchList',
      payload: {
        name: searchForm.getFieldValue('name'),
        scaleId: selectedKeys[0],
        pageNum: questions?.pageNum,
        pageSize: questions?.pageSize,
      },
    });
  };

  return (
    <div>
      <Row gutter={12}>
        <Col span={5}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Card>
              <Input.Search style={{ marginBottom: 8 }} placeholder="Search" />
              <Tree
                // showLine
                onSelect={handleSelect}
                blockNode
                treeData={scaleTree?.tree}
                fieldNames={{ title: 'name', key: 'id', children: 'children' }}
                // switcherIcon
                // defaultExpandedKeys={['asdf']}
                // selectedKeys={selectedKeys}
                // onExpand={onExpand}
              />
            </Card>
          </Space>
        </Col>
        <Col span={19}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Card>
              <Row gutter={24}>
                <Col span={18}>
                  <Form form={searchForm} layout="inline">
                    <Form.Item
                      label="因子名称"
                      name="name"
                      style={{ marginBottom: '0' }}
                    >
                      <Input allowClear />
                    </Form.Item>
                  </Form>
                </Col>
                <Col span={6}>
                  <Space>
                    <Button type="primary" onClick={searchHandler}>
                      搜索
                    </Button>
                    <Button onClick={addHandler}>添加</Button>
                    <Button onClick={refreshHandler}>刷新</Button>
                  </Space>
                </Col>
              </Row>
            </Card>
            <Card>
              <Table
                columns={columns}
                dataSource={questions?.list}
                rowKey="id"
                loading={questionListLoading}
                pagination={false}
                size="middle"
                scroll={{ y: 600 }}
              />
              <Pagination
                style={{ marginTop: '10px', textAlign: 'right' }}
                total={questions?.total}
                size="small"
                onChange={paginationHandler}
                current={questions?.pageNum}
                defaultPageSize={20}
                pageSizeOptions={['10', '20', '50', '100']}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `共 ${total} 条记录`}
              />
            </Card>
            <QuestionModal
              visible={questionModalVisible}
              closeHandler={closeHandler}
              onFinish={onFinish}
              questionId={questionId}
              scaleTree={scaleTree}
              confirmLoading={confirmLoading}
            />
          </Space>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = ({
  questions,
  scaleTree,
  loading,
}: {
  questions: questionListState;
  scaleTree: scaleTreeState;
  loading: Loading;
}) => {
  return {
    questions,
    scaleTree,
    questionListLoading: loading.models.questions,
  };
};

export default connect(mapStateToProps)(Question);
