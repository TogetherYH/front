import { FC, useEffect, useState } from 'react';
import { Space, Row, Col, Button, Table, Popconfirm } from 'antd';
import { connect, childrenState, Loading, Dispatch } from 'umi';
import { ChildType } from './data';
import ChildModal from './components/ChildModal';

interface ChildProps {
  visible: boolean;
  userId?: string;
  children: childrenState;
  childrenListLoading: boolean;
  dispatch: Dispatch;
}

const Child: FC<ChildProps> = (props) => {
  const { visible, userId, children, childrenListLoading, dispatch } = props;
  const [childModalVisible, setChildModalVisible] = useState(false);
  const [record, setRecord] = useState<ChildType | undefined>(undefined);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (visible && userId && dispatch) {
      dispatch({
        type: 'children/fetchList',
        payload: {
          userId,
        },
      });
    }
  }, [visible, userId]);

  const columns = [
    {
      title: '性别',
      dataIndex: 'childSex',
      key: 'childSex',
      width: 150,
    },
    {
      title: '年龄',
      dataIndex: 'childAge',
      key: 'childAge',
      width: 150,
    },
    {
      title: '详细信息',
      dataIndex: 'childInfo',
      key: 'childInfo',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: ChildType) => (
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

  // 打开添加modal
  const addHandler = () => {
    setRecord(undefined);
    setChildModalVisible(true);
  };

  // 打开编辑modal
  const editHandler = (record: ChildType) => {
    setRecord(record);
    // console.log('rrr', record);
    setChildModalVisible(true);
  };

  // 添加、更新处理方法
  const onFinish = (values: any) => {
    setConfirmLoading(true);
    let id = '';
    if (record) {
      id = record.id;
    }
    if (id) {
      dispatch({
        type: 'children/fetchUpdate',
        payload: {
          id,
          values: {
            ...values,
            status: values.status ? '1' : '0',
            userId,
          },
        },
      });
    } else {
      dispatch({
        type: 'children/fetchAdd',
        payload: {
          values: {
            ...values,
            status: values.status ? '1' : '0',
            userId,
          },
        },
      });
    }

    // 关闭rolemodal
    setChildModalVisible(false);
    setConfirmLoading(false);
  };

  // 关闭roleModal
  const closeHandler = () => {
    setChildModalVisible(false);
  };

  // 删除
  const deleteHandler = (record: ChildType) => {
    setRecord(record);
    const id = record.id;
    dispatch({
      type: 'children/fetchDel',
      payload: { id, userId },
    });
  };

  return (
    <div>
      <Space style={{ width: '100%' }} direction="vertical">
        <Row justify="end">
          <Space direction="horizontal">
            <Button type="primary" onClick={addHandler}>
              添加
            </Button>
          </Space>
        </Row>
        <Table
          columns={columns}
          dataSource={children?.children}
          rowKey="id"
          pagination={false}
          loading={childrenListLoading}
        ></Table>
      </Space>
      <ChildModal
        visible={childModalVisible}
        closeHandler={closeHandler}
        onFinish={onFinish}
        record={record}
        confirmLoading={confirmLoading}
      ></ChildModal>
    </div>
  );
};

const mapStateToProps = ({
  children,
  loading,
}: {
  children: childrenState;
  loading: Loading;
}) => {
  return {
    children,
    childrenListLoading: loading.models.children,
  };
};

export default connect(mapStateToProps)(Child);
