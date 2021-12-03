import React, { useState } from 'react';
import { Table, Tag, Space } from 'antd';
import { connect, Loading } from 'umi';
import { UserModelState } from '@/models/system/user';
import UserModal from './components/UserModal';

const User = ({ users }: { users: UserModelState[] }) => {
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
          <a>删除</a>
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

  return (
    <div>
      <Table columns={columns} dataSource={users} rowKey="id" />
      <UserModal
        visible={modalVisible}
        handleClose={handleClose}
        record={record}
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
