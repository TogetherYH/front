import React, { useState, FC } from 'react';
import {
  Table,
  Tag,
  Space,
  Modal,
  Button,
  Popconfirm,
  Card,
  Pagination,
} from 'antd';
// import ProTable, { ProColumns, TableDropdown, ActionType } from '@ant-design/pro-table';
import { connect, Dispatch, Loading, userState } from 'umi';
import UserModal from './components/UserModal';
import { getReomteList } from './service';
import { SingleUserType, FormValues } from './data';

interface UserPageProps {
  users: userState;
  dispatch: Dispatch;
  userListLoading: boolean;
}

const User: FC<UserPageProps> = ({ users, dispatch, userListLoading }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [record, setRecord] = useState<SingleUserType | undefined>(undefined);

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
      render: (text: string, record: SingleUserType) => (
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

  const confirm = (record: SingleUserType) => {
    setRecord(record);
    const id = record.id;
    dispatch({
      type: 'users/del',
      payload: { id },
    });
  };

  const editHandler = (record: SingleUserType) => {
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
    let id = 0;
    if (record) {
      id = record.id;
    }
    if (id) {
      dispatch({
        type: 'users/edit',
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
        type: 'users/add',
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
      type: 'users/getRemote',
      payload: {
        pageNum: users.pageNum,
        pageSize: users.pageSize,
      },
    });
  };

  const paginationHandler = (pageNum: number, pageSize: number | undefined) => {
    dispatch({
      type: 'users/getRemote',
      payload: {
        pageNum,
        pageSize,
      },
    });
  };

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card>
          <Space>
            <Button type="primary" onClick={addHandler}>
              添加
            </Button>
            <Button onClick={refreshHandler}>刷新</Button>
          </Space>
        </Card>
        <Card>
          <Table
            columns={columns}
            dataSource={users.list}
            rowKey="id"
            loading={userListLoading}
            pagination={false}
            size="middle"
            // request={requestHandler}
          />
          <Pagination
            style={{ marginTop: '10px', textAlign: 'right' }}
            total={users.total}
            size="small"
            onChange={paginationHandler}
            current={users.pageNum}
            defaultPageSize={20}
            pageSizeOptions={['10', '20', '50', '100']}
            // onShowSizeChange={pageSizeHandler}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `共 ${total} 条记录`}
          />
        </Card>
        <UserModal
          visible={modalVisible}
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
  console.log('uuuuuuuuu', users, loading);
  return {
    users,
    userListLoading: loading.models.users,
  };
};

export default connect(mapStateToProps)(User);
