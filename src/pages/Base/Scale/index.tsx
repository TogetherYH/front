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
  scaleListState,
  scaleTreeState,
} from 'umi';
import ScaleModal from './components/ScaleModal';
import { ScaleType, FormValues } from './data';

interface ScaleProps {
  scales: scaleListState;
  scaleTree: scaleTreeState;
  dispatch: Dispatch;
  scaleListLoading: boolean;
}

const Scale: FC<ScaleProps> = ({
  scales,
  scaleTree,
  dispatch,
  scaleListLoading,
}) => {
  const [scaleModalVisible, setScaleModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [record, setRecord] = useState<UserType | undefined>(undefined);
  const [scaleId, setScaleId] = useState<string | undefined>('');
  const [searchForm] = Form.useForm();

  const columns = [
    {
      title: '量表名称',
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
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 200,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: ScaleType) => (
        <Space size="middle">
          <a
            onClick={() => {
              editHandler(record);
            }}
          >
            修改
          </a>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => {
              deleteHandler(record);
            }}
            okText="Yes"
            cancelText="No"
          >
            <a style={{}}>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 分页
  const paginationHandler = (pageNum: number, pageSize: number | undefined) => {
    dispatch({
      type: 'scales/fetchList',
      payload: {
        name: searchForm.getFieldValue('name'),
        pageNum,
        pageSize,
      },
    });
  };

  // 搜索
  const searchHandler = () => {
    dispatch({
      type: 'scales/fetchList',
      payload: {
        name: searchForm.getFieldValue('name'),
        pageNum: 1,
        pageSize: scales?.pageSize,
      },
    });
  };

  // 刷新
  const refreshHandler = () => {
    dispatch({
      type: 'scales/fetchList',
      payload: {
        name: searchForm.getFieldValue('name'),
        pageNum: scales?.pageNum,
        pageSize: scales?.pageSize,
      },
    });
  };

  // 打开添加modal
  const addHandler = () => {
    setScaleId(undefined);
    setScaleModalVisible(true);
  };

  // 打开编辑modal
  const editHandler = (record: ScaleType) => {
    setScaleId(record.id);
    setScaleModalVisible(true);
  };

  // 关闭Modal
  const closeHandler = () => {
    setScaleModalVisible(false);
  };

  // 添加、更新处理方法
  const onFinish = (values: FormValues) => {
    // console.log('form on finish');
    setConfirmLoading(true);
    let id = '';
    if (scaleId) {
      id = scaleId;
    }
    if (id) {
      dispatch({
        type: 'scales/fetchUpdate',
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
        type: 'scales/fetchAdd',
        payload: {
          values: {
            ...values,
            status: values.status ? '1' : '0',
          },
        },
      });
    }

    // 关闭modal
    setScaleModalVisible(false);
    setConfirmLoading(false);
  };

  // 删除记录
  const deleteHandler = (record: ScaleType) => {
    // setRecord(record);
    const id = record.id;
    dispatch({
      type: 'scales/fetchDelete',
      payload: { id },
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
                // onSelect={handleSelect}
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
                      label="量表名称"
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
                dataSource={scales?.list}
                rowKey="id"
                loading={scaleListLoading}
                pagination={false}
                size="middle"
                scroll={{ y: 600 }}
              />
              <Pagination
                style={{ marginTop: '10px', textAlign: 'right' }}
                total={scales?.total}
                size="small"
                onChange={paginationHandler}
                current={scales?.pageNum}
                defaultPageSize={20}
                pageSizeOptions={['10', '20', '50', '100']}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `共 ${total} 条记录`}
              />
            </Card>
            <ScaleModal
              visible={scaleModalVisible}
              closeHandler={closeHandler}
              onFinish={onFinish}
              scaleId={scaleId}
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
  scales,
  scaleTree,
  loading,
}: {
  scales: scaleListState;
  scaleTree: scaleTreeState;
  loading: Loading;
}) => {
  return {
    scales,
    scaleTree,
    scaleListLoading: loading.models.scales,
  };
};

export default connect(mapStateToProps)(Scale);
