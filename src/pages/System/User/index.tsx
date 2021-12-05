import React, { useState } from 'react';
import { Table, Tag, Space, Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { connect, Loading } from 'umi';
import { UserModelState } from '@/models/system/user';
import UserModal from './components/UserModal';

const User = ({ users, dispatch }: { users: UserModelState[] }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [record, setRecord] = useState(undefined);

  const columns = [
    // {
    //   key: 'id',
    // },
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
      title: '出生日期',
      dataIndex: 'birthday',
      key: 'birthday',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: UserModelState) => (
        <Space size="middle">
          <a
            onClick={() => {
              editHandler(record);
            }}
          >
            编辑
          </a>
          <a
            onClick={() => {
              deleteConfirm(record);
            }}
          >
            删除
          </a>
        </Space>
      ),
    },
  ];

  const editHandler = (record) => {
    setModalVisible(true);
    console.log('record', record);
    setRecord(record);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  const onFinish = (values) => {
    let id = 0;
    if (record) {
      id = record.id;
    }
    if (id) {
      dispatch({
        type: 'users/updateUser',
        payload: { id, ...values },
      });
    } else {
      dispatch({
        type: 'users/addUser',
        payload: values,
      });
    }
    setModalVisible(false);
    // console.log('Success:', values);
  };

  const deleteConfirm = (record) => {
    const id = record.id;
    Modal.confirm({
      // title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: '确定删除当前用户？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'users/deleteUser',
          payload: { id },
        });
      },
    });
  };

  const addHandler = () => {
    setModalVisible(true);
    setRecord(undefined);
  };

  return (
    <div>
      <Button type="primary" onClick={addHandler}>
        Add
      </Button>
      <Table columns={columns} dataSource={users} rowKey="id" />
      <UserModal
        visible={modalVisible}
        handleClose={handleClose}
        record={record}
        onFinish={onFinish}
      />
    </div>
  );
};

// namespace: 'users'
const mapStateToProps = ({
  users,
  loading,
}: {
  users: UserModelState[];
  loading: Loading;
}) => {
  console.log('users', users);
  // console.log('users1', users);
  return {
    users,
    loading: loading.models.index,
  };
};

export default connect(mapStateToProps)(User);
