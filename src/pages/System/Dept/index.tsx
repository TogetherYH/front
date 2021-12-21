import { FC, useState } from 'react';
import {
  Table,
  Space,
  Form,
  Input,
  Button,
  Card,
  Pagination,
  Popconfirm,
  Tree,
  Row,
  Col,
} from 'antd';
import { connect, Dispatch, Loading, deptState, deptTreeState } from 'umi';
import { SingleDeptType, FormValues } from './data';
import DeptModal from './components/DeptModal';

interface DeptProps {
  depts: deptState;
  deptTree: deptTreeState;
  dispatch: Dispatch;
  deptListLoading: boolean;
}

const Dept: FC<DeptProps> = ({
  depts,
  deptTree,
  dispatch,
  deptListLoading,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [record, setRecord] = useState<SingleDeptType | undefined>(undefined);
  const [searchForm] = Form.useForm();

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 250,
    },
    {
      title: '编号',
      dataIndex: 'code',
      key: 'code',
      width: 100,
    },
    {
      title: '排序',
      dataIndex: 'order',
      key: 'order',
      width: 70,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 150,
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
      render: (text: string, record: SingleDeptType) => (
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
              confirm(record);
            }}
            okText="Yes"
            cancelText="No"
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const confirm = (record: SingleDeptType) => {
    setRecord(record);
    const id = record.id;
    dispatch({
      type: 'depts/del',
      payload: { id },
    });
  };

  const editHandler = (record: SingleDeptType) => {
    setRecord(record);
    // console.log('rrr', record);
    setModalVisible(true);
  };

  const closeHandler = () => {
    setModalVisible(false);
  };

  const onFinish = (values: FormValues) => {
    // console.log('form on finish');
    setConfirmLoading(true);
    let id = '';
    if (record) {
      id = record.id;
    }
    if (id) {
      dispatch({
        type: 'depts/edit',
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
        type: 'depts/add',
        payload: {
          values: {
            ...values,
            status: values.status ? '1' : '0',
          },
        },
      });
    }

    setModalVisible(false);
    setConfirmLoading(false);
  };

  const addHandler = () => {
    setRecord(undefined);
    setModalVisible(true);
  };

  const refreshHandler = () => {
    dispatch({
      type: 'depts/getRemote',
      payload: {
        name: searchForm.getFieldValue('name'),
        pageNum: depts.pageNum,
        pageSize: depts.pageSize,
      },
    });
    dispatch({
      type: 'deptTree/getRemote',
      payload: {},
    });
  };

  const paginationHandler = (pageNum: number, pageSize: number | undefined) => {
    dispatch({
      type: 'depts/getRemote',
      payload: {
        name: searchForm.getFieldValue('name'),
        pageNum,
        pageSize,
      },
    });
  };

  const searchHandler = () => {
    dispatch({
      type: 'depts/getRemote',
      payload: {
        name: searchForm.getFieldValue('name'),
        pageNum: depts.pageNum,
        pageSize: depts.pageSize,
      },
    });
  };

  return (
    <div>
      <Row gutter={12}>
        <Col span={6}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Card>
              <Input.Search style={{ marginBottom: 8 }} placeholder="Search" />
              <Tree
                // showLine
                // onSelect={handleSelect}
                treeData={deptTree?.tree}
                fieldNames={{ title: 'name', key: 'id', children: 'children' }}
                // selectedKeys={selectedKeys}
                // onExpand={onExpand}
              />
            </Card>
          </Space>
        </Col>
        <Col span={18}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Card>
              <Row gutter={24}>
                <Col span={18}>
                  <Form form={searchForm} layout="inline">
                    <Form.Item
                      label="部门名称"
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
                dataSource={depts?.list}
                rowKey="id"
                loading={deptListLoading}
                pagination={false}
                size="middle"
                // request={requestHandler}
              />
              <Pagination
                style={{ marginTop: '10px', textAlign: 'right' }}
                total={depts?.total}
                size="small"
                onChange={paginationHandler}
                current={depts?.pageNum}
                defaultPageSize={20}
                pageSizeOptions={['10', '20', '50', '100']}
                // onShowSizeChange={pageSizeHandler}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `共 ${total} 条记录`}
              />
            </Card>
          </Space>
        </Col>
      </Row>
      <DeptModal
        visible={modalVisible}
        closeHandler={closeHandler}
        onFinish={onFinish}
        record={record}
        deptTree={deptTree}
        confirmLoading={confirmLoading}
      />
    </div>
  );
};

const mapStateToProps = ({
  depts,
  deptTree,
  loading,
}: {
  depts: deptState;
  deptTree: deptTreeState;
  loading: Loading;
}) => {
  console.log('uuuuuuuuu', depts);
  console.log('uuuuuuuuu2', deptTree);
  return {
    depts,
    deptTree,
    deptListLoading: loading.models.depts,
  };
};

export default connect(mapStateToProps)(Dept);
