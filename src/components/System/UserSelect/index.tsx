import { FC, useState, useEffect } from 'react';
import { Modal, Space, Input, Table, Pagination, Button, Form } from 'antd';
import { userListState, connect, Dispatch, Loading } from 'umi';
import { UserType } from '@/pages/System/User/data';

interface UserSelectProps {
  isModalVisible: boolean;
  // defaultChecked: string[];
  users: userListState;
  userListLoading: boolean;
  dispatch: Dispatch;
  // handleOk: (checkedKeys: string[]) => void;
  onSelectUser: (user: UserType) => void;
  handleCancel: () => void;
}

const UserSelect: FC<UserSelectProps> = (props) => {
  const {
    isModalVisible,
    users,
    userListLoading,
    dispatch,
    handleCancel,
    onSelectUser,
  } = props;
  const [searchForm] = Form.useForm();
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    if (isModalVisible) {
      dispatch({
        type: 'users/fetchList',
        payload: {
          pageNum: users.pageNum,
          pageSize: users.pageSize,
        },
      });
    }
  }, [isModalVisible]);

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
  ];

  // 分页
  const paginationHandler = (pageNum: number, pageSize: number | undefined) => {
    dispatch({
      type: 'users/fetchList',
      payload: {
        username: searchForm.getFieldValue('name'),
        // realName: searchForm.getFieldValue('name'),
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
        username: searchForm.getFieldValue('name'),
        // realName: searchForm.getFieldValue('name'),
        pageNum: 1,
        pageSize: users?.pageSize,
      },
    });
  };

  const rowSelection = {
    // onChange: (selectedRowKeys, selectedRows) => {
    //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    // },
    onSelect: (
      record: UserType,
      selected: boolean,
      selectedRows: UserType[],
      nativeEvent: Event,
    ) => {
      // console.log(record, selected, selectedRows);
      setUser(record);
    },
    // onSelectAll: (selected, selectedRows, changeRows) => {
    //   console.log(selected, selectedRows, changeRows);
    // },
  };

  const onOk = () => {
    if (user) {
      onSelectUser(user);
    }
  };

  return (
    <div>
      <Modal
        title="选择用户"
        visible={isModalVisible}
        onOk={onOk}
        onCancel={handleCancel}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Space direction="horizontal">
            <Form form={searchForm} layout="inline">
              <Form.Item
                label="账号/密码"
                name="name"
                style={{ marginBottom: '0' }}
              >
                <Input allowClear />
              </Form.Item>
            </Form>

            <Button onClick={searchHandler}>搜索</Button>
          </Space>

          <Table
            columns={columns}
            dataSource={users?.list}
            rowKey="id"
            loading={userListLoading}
            pagination={false}
            size="middle"
            scroll={{ y: 300 }}
            rowSelection={{
              type: 'radio',
              ...rowSelection,
            }}
          />
          <Pagination
            style={{ textAlign: 'right' }}
            total={users?.total}
            size="small"
            onChange={paginationHandler}
            current={users?.pageNum}
            // defaultPageSize={20}
            // pageSizeOptions={['10', '20', '50', '100']}
            // showSizeChanger
            // showQuickJumper
            showTotal={(total) => `共 ${total} 条记录`}
          />
        </Space>
      </Modal>
    </div>
  );
};

const mapStateToProps = ({
  users,
  loading,
}: {
  users: userListState;
  loading: Loading;
}) => {
  return {
    users,
    userListLoading: loading.models.users,
  };
};
export default connect(mapStateToProps)(UserSelect);
