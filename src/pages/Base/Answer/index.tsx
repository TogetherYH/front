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
  answerListState,
  scaleTreeState,
} from 'umi';
import AnswerModal from './components/AnswerModal';
import { AnswerType, FormValues } from './data';

interface AnswerProps {
  answers: answerListState;
  scaleTree: scaleTreeState;
  dispatch: Dispatch;
  answerListLoading: boolean;
}

const Answer: FC<AnswerProps> = ({
  answers,
  scaleTree,
  dispatch,
  answerListLoading,
}) => {
  const [answerModalVisible, setAnswerModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [record, setRecord] = useState<UserType | undefined>(undefined);
  const [answerId, setAnswerId] = useState<string | undefined>('');
  const [scaleId, setScaleId] = useState<string>('');
  const [searchForm] = Form.useForm();

  const columns = [
    {
      title: '答案',
      dataIndex: 'name',
      key: 'name',
      width: 300,
    },
    {
      title: '编码',
      dataIndex: 'groupCode',
      key: 'groupCode',
      width: 100,
    },
    {
      title: '选项',
      dataIndex: 'option',
      key: 'option',
      width: 70,
    },
    {
      title: '分数',
      dataIndex: 'score',
      key: 'score',
      width: 70,
    },
    {
      title: '顺序',
      dataIndex: 'order',
      key: 'order',
      width: 70,
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
      // render: (text: string, record: AnswerType) => (
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
      type: 'answers/fetchList',
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
      type: 'answers/fetchList',
      payload: {
        name: searchForm.getFieldValue('name'),
        scaleId,
        pageNum: 1,
        pageSize: answers?.pageSize,
      },
    });
  };

  // 刷新
  const refreshHandler = () => {
    dispatch({
      type: 'answers/fetchList',
      payload: {
        name: searchForm.getFieldValue('name'),
        scaleId,
        pageNum: answers?.pageNum,
        pageSize: answers?.pageSize,
      },
    });
  };

  // 打开添加modal
  const addHandler = () => {
    setAnswerId(undefined);
    setAnswerModalVisible(true);
  };

  // 打开编辑modal
  const editHandler = (record: AnswerType) => {
    setAnswerId(record.id);
    setAnswerModalVisible(true);
  };

  // 关闭Modal
  const closeHandler = () => {
    setAnswerModalVisible(false);
  };

  // 添加、更新处理方法
  const onFinish = (values: FormValues) => {
    // console.log('form on finish');
    setConfirmLoading(true);
    let id = '';
    if (answerId) {
      id = answerId;
    }
    if (id) {
      dispatch({
        type: 'answers/fetchUpdate',
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
        type: 'answers/fetchAdd',
        payload: {
          values: {
            ...values,
            status: values.status ? '1' : '0',
          },
        },
      });
    }

    // 关闭modal
    setAnswerModalVisible(false);
    setConfirmLoading(false);
  };

  // 删除记录
  const deleteHandler = (record: AnswerType) => {
    // setRecord(record);
    const id = record.id;
    dispatch({
      type: 'answers/fetchDelete',
      payload: { id },
    });
  };

  const handleSelect = (selectedKeys: React.Key[], info: any) => {
    // console.log('selected', selectedKeys, info);
    setScaleId(selectedKeys[0]);
    dispatch({
      type: 'answers/fetchList',
      payload: {
        name: searchForm.getFieldValue('name'),
        scaleId: selectedKeys[0],
        pageNum: answers?.pageNum,
        pageSize: answers?.pageSize,
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
                      label="答案"
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
                dataSource={answers?.list}
                rowKey="id"
                loading={answerListLoading}
                pagination={false}
                size="middle"
                scroll={{ y: 600 }}
              />
              <Pagination
                style={{ marginTop: '10px', textAlign: 'right' }}
                total={answers?.total}
                size="small"
                onChange={paginationHandler}
                current={answers?.pageNum}
                defaultPageSize={20}
                pageSizeOptions={['10', '20', '50', '100']}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `共 ${total} 条记录`}
              />
            </Card>
            <AnswerModal
              visible={answerModalVisible}
              closeHandler={closeHandler}
              onFinish={onFinish}
              answerId={answerId}
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
  answers,
  scaleTree,
  loading,
}: {
  answers: answerListState;
  scaleTree: scaleTreeState;
  loading: Loading;
}) => {
  return {
    answers,
    scaleTree,
    answerListLoading: loading.models.answers,
  };
};

export default connect(mapStateToProps)(Answer);
