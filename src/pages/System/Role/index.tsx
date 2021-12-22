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
import { connect, Dispatch, Loading, roleState } from 'umi';
import { SingleRoleType, FormValues } from './data';
import RoleModal from './components/RoleModal';

interface RoleProps {
  roles: roleState;
  dispatch: Dispatch;
  roleListLoading: boolean;
}

const Role: FC<RoleProps> = ({ roles, dispatch, roleListLoading }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [record, setRecord] = useState<SingleRoleType | undefined>(undefined);
  const [searchForm] = Form.useForm();

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: '编号',
      dataIndex: 'code',
      key: 'code',
      width: 100,
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
      render: (text: string, record: SingleRoleType) => (
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

  const confirm = (record: SingleRoleType) => {
    setRecord(record);
    const id = record.id;
    dispatch({
      type: 'roles/del',
      payload: { id },
    });
  };

  const editHandler = (record: SingleRoleType) => {
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
        type: 'roles/edit',
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
        type: 'roles/add',
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
      type: 'roles/getRemote',
      payload: {
        name: searchForm.getFieldValue('name'),
        pageNum: roles.pageNum,
        pageSize: roles.pageSize,
      },
    });
  };

  const paginationHandler = (pageNum: number, pageSize: number | undefined) => {
    dispatch({
      type: 'roles/getRemote',
      payload: {
        name: searchForm.getFieldValue('name'),
        pageNum,
        pageSize,
      },
    });
  };

  const searchHandler = () => {
    dispatch({
      type: 'roles/getRemote',
      payload: {
        name: searchForm.getFieldValue('name'),
        pageNum: roles.pageNum,
        pageSize: roles.pageSize,
      },
    });
  };

  return (
    <div>
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
            dataSource={roles?.list}
            rowKey="id"
            loading={roleListLoading}
            pagination={false}
            size="middle"
            // request={requestHandler}
          />
          <Pagination
            style={{ marginTop: '10px', textAlign: 'right' }}
            total={roles?.total}
            size="small"
            onChange={paginationHandler}
            current={roles?.pageNum}
            defaultPageSize={20}
            pageSizeOptions={['10', '20', '50', '100']}
            // onShowSizeChange={pageSizeHandler}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `共 ${total} 条记录`}
          />
        </Card>
      </Space>
      <RoleModal
        visible={modalVisible}
        closeHandler={closeHandler}
        onFinish={onFinish}
        record={record}
        confirmLoading={confirmLoading}
      />
    </div>
  );
};

const mapStateToProps = ({
  roles,
  loading,
}: {
  roles: roleState;
  loading: Loading;
}) => {
  // console.log('uuuuuuuuu', roles);
  return {
    roles,
    roleListLoading: loading.models.Roles,
  };
};

export default connect(mapStateToProps)(Role);
