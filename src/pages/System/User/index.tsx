import { FC, useState } from 'react';
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
} from 'antd';
import { connect, Dispatch, Loading, userState } from 'umi';
import UserModal from './components/UserModal';
import { UserType, FormValues } from './data';

interface UserProps {
  users: userState;
  dispatch: Dispatch;
  userListLoading: boolean;
}

const User: FC<UserProps> = ({ users, dispatch, userListLoading }) => {
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [record, setRecord] = useState<UserType | undefined>(undefined);
  const [searchForm] = Form.useForm();

  const columns = [
    {
      title: '账号',
      dataIndex: 'username',
      key: 'username',
      width: 200,
    },
    {
      title: '姓名',
      dataIndex: 'realName',
      key: 'realName',
      width: 100,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      width: 100,
    },
    {
      title: '出生日期',
      dataIndex: 'birthday',
      key: 'birthday',
      width: 150,
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
      render: (text: string, record: UserType) => (
        <Space size="middle">
          <a
            onClick={() => {
              editHandler(record);
            }}
          >
            修改
          </a>
          {record.username !== 'admin' ? (
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
          ) : (
            ''
          )}
        </Space>
      ),
    },
  ];

  // 分页
  const paginationHandler = (pageNum: number, pageSize: number | undefined) => {
    dispatch({
      type: 'users/fetchList',
      payload: {
        username: searchForm.getFieldValue('username'),
        realName: searchForm.getFieldValue('realName'),
        pageNum,
        pageSize,
      },
    });
  };

  // 搜索
  const searchHandler = () => {
    dispatch({
      type: 'users/fetchList',
      payload: {
        username: searchForm.getFieldValue('username'),
        realName: searchForm.getFieldValue('realName'),
        pageNum: 1,
        pageSize: users.pageSize,
      },
    });
  };

  // 刷新
  const refreshHandler = () => {
    dispatch({
      type: 'users/fetchList',
      payload: {
        username: searchForm.getFieldValue('username'),
        realName: searchForm.getFieldValue('realName'),
        pageNum: users.pageNum,
        pageSize: users.pageSize,
      },
    });
  };

  // 打开添加modal
  const addHandler = () => {
    setRecord(undefined);
    setUserModalVisible(true);
  };

  // 打开编辑modal
  const editHandler = (record: UserType) => {
    setRecord(record);
    setUserModalVisible(true);
  };

  // 关闭Modal
  const closeHandler = () => {
    setUserModalVisible(false);
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
        type: 'users/fetchUpdate',
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
        type: 'users/fetchAdd',
        payload: {
          values: {
            ...values,
            status: values.status ? '1' : '0',
          },
        },
      });
    }

    // 关闭modal
    setUserModalVisible(false);
    setConfirmLoading(false);
  };

  // 删除记录
  const deleteHandler = (record: UserType) => {
    setRecord(record);
    const id = record.id;
    dispatch({
      type: 'users/fetchDelete',
      payload: { id },
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
                  label="账号"
                  name="username"
                  style={{ marginBottom: '0' }}
                >
                  <Input allowClear />
                </Form.Item>
                <Form.Item
                  label="姓名"
                  name="realName"
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
            dataSource={users?.list}
            rowKey="id"
            loading={userListLoading}
            pagination={false}
            size="middle"
            scroll={{ y: 600 }}
          />
          <Pagination
            style={{ marginTop: '10px', textAlign: 'right' }}
            total={users?.total}
            size="small"
            onChange={paginationHandler}
            current={users?.pageNum}
            defaultPageSize={20}
            pageSizeOptions={['10', '20', '50', '100']}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `共 ${total} 条记录`}
          />
        </Card>
        <UserModal
          visible={userModalVisible}
          closeHandler={closeHandler}
          onFinish={onFinish}
          record={record}
          confirmLoading={confirmLoading}
        />
      </Space>
    </div>
  );
};

const mapStateToProps = ({
  users,
  loading,
}: {
  users: userState;
  loading: Loading;
}) => {
  return {
    users,
    userListLoading: loading.models.users,
  };
};

export default connect(mapStateToProps)(User);
