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
  factorListState,
  scaleTreeState,
} from 'umi';
import FactorModal from './components/FactorModal';
import { FactorType, FormValues } from './data';

interface FactorProps {
  factors: factorListState;
  scaleTree: scaleTreeState;
  dispatch: Dispatch;
  factorListLoading: boolean;
}

const Factor: FC<FactorProps> = ({
  factors,
  scaleTree,
  dispatch,
  factorListLoading,
}) => {
  const [factorModalVisible, setFactorModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [record, setRecord] = useState<UserType | undefined>(undefined);
  const [factorId, setFactorId] = useState<string | undefined>('');
  const [scaleId, setScaleId] = useState<string>('');
  const [searchForm] = Form.useForm();

  const columns = [
    {
      title: '因子名称',
      dataIndex: 'name',
      key: 'name',
      width: 300,
    },
    {
      title: '平均分',
      dataIndex: 'average',
      key: 'average',
      width: 100,
    },
    {
      title: '标准差',
      dataIndex: 'sd',
      key: 'sd',
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
      render: (text: string, record: FactorType) => (
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
      type: 'factors/fetchList',
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
      type: 'factors/fetchList',
      payload: {
        name: searchForm.getFieldValue('name'),
        scaleId,
        pageNum: 1,
        pageSize: factors?.pageSize,
      },
    });
  };

  // 刷新
  const refreshHandler = () => {
    dispatch({
      type: 'factors/fetchList',
      payload: {
        name: searchForm.getFieldValue('name'),
        scaleId,
        pageNum: factors?.pageNum,
        pageSize: factors?.pageSize,
      },
    });
  };

  // 打开添加modal
  const addHandler = () => {
    setFactorId(undefined);
    setFactorModalVisible(true);
  };

  // 打开编辑modal
  const editHandler = (record: FactorType) => {
    setFactorId(record.id);
    setFactorModalVisible(true);
  };

  // 关闭Modal
  const closeHandler = () => {
    setFactorModalVisible(false);
  };

  // 添加、更新处理方法
  const onFinish = (values: FormValues) => {
    // console.log('form on finish');
    setConfirmLoading(true);
    let id = '';
    if (factorId) {
      id = factorId;
    }
    if (id) {
      dispatch({
        type: 'factors/fetchUpdate',
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
        type: 'factors/fetchAdd',
        payload: {
          values: {
            ...values,
            status: values.status ? '1' : '0',
          },
        },
      });
    }

    // 关闭modal
    setFactorModalVisible(false);
    setConfirmLoading(false);
  };

  // 删除记录
  const deleteHandler = (record: FactorType) => {
    // setRecord(record);
    const id = record.id;
    dispatch({
      type: 'factors/fetchDelete',
      payload: { id },
    });
  };

  const handleSelect = (selectedKeys: React.Key[], info: any) => {
    // console.log('selected', selectedKeys, info);
    setScaleId(selectedKeys[0]);
    dispatch({
      type: 'factors/fetchList',
      payload: {
        name: searchForm.getFieldValue('name'),
        scaleId: selectedKeys[0],
        pageNum: factors?.pageNum,
        pageSize: factors?.pageSize,
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
                dataSource={factors?.list}
                rowKey="id"
                loading={factorListLoading}
                pagination={false}
                size="middle"
                scroll={{ y: 600 }}
              />
              <Pagination
                style={{ marginTop: '10px', textAlign: 'right' }}
                total={factors?.total}
                size="small"
                onChange={paginationHandler}
                current={factors?.pageNum}
                defaultPageSize={20}
                pageSizeOptions={['10', '20', '50', '100']}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `共 ${total} 条记录`}
              />
            </Card>
            <FactorModal
              visible={factorModalVisible}
              closeHandler={closeHandler}
              onFinish={onFinish}
              factorId={factorId}
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
  factors,
  scaleTree,
  loading,
}: {
  factors: factorListState;
  scaleTree: scaleTreeState;
  loading: Loading;
}) => {
  return {
    factors,
    scaleTree,
    factorListLoading: loading.models.factors,
  };
};

export default connect(mapStateToProps)(Factor);
