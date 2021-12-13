import React, { useState, FC } from 'react';
import { Table, Tag, Space, Modal, Button, Popconfirm } from 'antd';
import { connect, Dispatch, Loading, userState } from 'umi';
import UserModal from './components/UserModal';
import { SingleUserType, FormValues } from './data';

interface UserPageProps {
  users: userState;
  dispatch: Dispatch;
  userListLoading: boolean;
}

const User: FC<UserPageProps> = ({ users, dispatch, userListLoading }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [record, setRecord] = useState<SingleUserType | undefined>(undefined);

  const columns = [
    {
      title: '账号',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '姓名',
      dataIndex: 'realName',
      key: 'realName',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
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
            编辑
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
    let id = 0;
    if (record) {
      id = record.id;
    }
    if (id) {
      dispatch({
        type: 'users/edit',
        payload: { id, values },
      });
    } else {
      dispatch({
        type: 'users/add',
        payload: { values },
      });
    }

    setModalVisible(false);
  };

  const addHandler = () => {
    setRecord(undefined);
    setModalVisible(true);
  };

  return (
    <div>
      <Button type="primary" onClick={addHandler}>
        Add
      </Button>
      <Table
        columns={columns}
        dataSource={users.list}
        rowKey="id"
        loading={userListLoading}
      />
      <UserModal
        visible={modalVisible}
        closeHandler={closeHandler}
        onFinish={onFinish}
        record={record}
      />
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
