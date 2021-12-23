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
  Row,
  Col,
  Menu,
  // Icon,
  Dropdown,
} from 'antd';
import {
  DownOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { connect, Dispatch, Loading, roleState, menuTreeState } from 'umi';
import { RoleType, FormValues } from './data';
import RoleModal from './components/RoleModal';
import RoleMenuModal from './components/RoleMenuModal';

interface RoleProps {
  roles: roleState;
  menuTree: menuTreeState;
  dispatch: Dispatch;
  roleListLoading: boolean;
}

const Role: FC<RoleProps> = ({
  roles,
  menuTree,
  dispatch,
  roleListLoading,
}) => {
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [record, setRecord] = useState<RoleType | undefined>(undefined);
  const [searchForm] = Form.useForm();
  const [roleId, setRoleId] = useState<string>('');
  const [roleMenuModalVisible, setroleMenuModalVisible] = useState(false);

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
      render: (text: string, record: RoleType) => (
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
            <a>删除</a>
          </Popconfirm>
          <Dropdown
            overlay={() => {
              return (
                <Menu>
                  <Menu.Item
                    key="1"
                    icon={<UnorderedListOutlined />}
                    style={{ width: 100 }}
                    onClick={() => {
                      roleMenuHandler(record);
                    }}
                  >
                    菜单权限
                  </Menu.Item>
                  <Menu.Item key="2" icon={<UserOutlined />}>
                    角色用户
                  </Menu.Item>
                </Menu>
              );
            }}
            trigger={['click']}
          >
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              更多 <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  // 分页
  const paginationHandler = (pageNum: number, pageSize: number | undefined) => {
    dispatch({
      type: 'roles/fetchList',
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
      type: 'roles/fetchList',
      payload: {
        name: searchForm.getFieldValue('name'),
        pageNum: 1,
        pageSize: roles.pageSize,
      },
    });
  };

  // 刷新
  const refreshHandler = () => {
    dispatch({
      type: 'roles/fetchList',
      payload: {
        name: searchForm.getFieldValue('name'),
        pageNum: roles.pageNum,
        pageSize: roles.pageSize,
      },
    });
  };

  // 打开添加modal
  const addHandler = () => {
    setRecord(undefined);
    setRoleModalVisible(true);
  };

  // 打开编辑modal
  const editHandler = (record: RoleType) => {
    setRecord(record);
    // console.log('rrr', record);
    setRoleModalVisible(true);
  };

  // 添加、更新处理方法
  const onFinish = (values: FormValues) => {
    // console.log('form on finish');
    setConfirmLoading(true);
    let id = '';
    if (record) {
      id = record.id;
    }
    if (id) {
      dispatch({
        type: 'roles/fetchUpdate',
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
        type: 'roles/fetchAdd',
        payload: {
          values: {
            ...values,
            status: values.status ? '1' : '0',
          },
        },
      });
    }

    // 关闭rolemodal
    setRoleModalVisible(false);
    setConfirmLoading(false);
  };

  // 关闭roleModal
  const closeHandler = () => {
    setRoleModalVisible(false);
  };

  // 删除
  const deleteHandler = (record: RoleType) => {
    setRecord(record);
    const id = record.id;
    dispatch({
      type: 'roles/fetchDelete',
      payload: { id },
    });
  };

  // 角色菜单moal
  const roleMenuHandler = (record: RoleType) => {
    setRoleId(record.id);
    setroleMenuModalVisible(true);
  };

  // 关闭rolemodal
  const closeRoleMenuModal = () => {
    setroleMenuModalVisible(false);
  };

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card>
          <Row gutter={24}>
            <Col span={18}>
              <Form form={searchForm} layout="inline">
                <Form.Item
                  label="角色名称"
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
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `共 ${total} 条记录`}
          />
        </Card>
      </Space>
      <RoleModal
        visible={roleModalVisible}
        closeHandler={closeHandler}
        onFinish={onFinish}
        record={record}
        confirmLoading={confirmLoading}
      />
      <RoleMenuModal
        visible={roleMenuModalVisible}
        roleId={roleId}
        menuTree={menuTree}
        closeRoleMenuModal={closeRoleMenuModal}
      />
    </div>
  );
};

const mapStateToProps = ({
  roles,
  menuTree,
  loading,
}: {
  roles: roleState;
  menuTree: menuTreeState;
  loading: Loading;
}) => {
  return {
    roles,
    menuTree,
    roleListLoading: loading.models.roles,
  };
};

export default connect(mapStateToProps)(Role);
