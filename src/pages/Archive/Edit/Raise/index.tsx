import { FC, useEffect, useState } from 'react';
import { Space, Row, Col, Button, Table, Popconfirm } from 'antd';
import { connect, raisingHistoryState, Loading, Dispatch } from 'umi';
import { RaisingHistoryType } from './data';
import RaisingModal from './components/RaisingModal';

interface RaisingHistoryProps {
  raising: raisingHistoryState;
  raisingListLoading: boolean;
  dispatch: Dispatch;
}

const RaisingHistory: FC<RaisingHistoryProps> = (props) => {
  const { raising, raisingListLoading, dispatch } = props;
  const [raisingModalVisible, setRaisingModalVisible] = useState(false);
  const [record, setRecord] = useState<RaisingHistoryType | undefined>(
    undefined,
  );
  const [confirmLoading, setConfirmLoading] = useState(false);

  // useEffect(() => {
  //   console.log('uu1', raising);
  //   // form.setFieldsValue({
  //   //   ...userInfo?.userInfo
  //   // });
  //   // setEditing(false);
  // }, [raising])

  const columns = [
    {
      title: '起始年龄',
      dataIndex: 'startingAge',
      key: 'startingAge',
      width: 150,
    },
    {
      title: '截至年龄',
      dataIndex: 'endingAge',
      key: 'endingAge',
      width: 150,
    },
    {
      title: '抚养人',
      dataIndex: 'guardian',
      key: 'guardian',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: RaisingHistoryType) => (
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
    setRaisingModalVisible(true);
  };

  // 打开编辑modal
  const editHandler = (record: RaisingHistoryType) => {
    setRecord(record);
    // console.log('rrr', record);
    setRaisingModalVisible(true);
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
        type: 'raising/fetchUpdate',
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
        type: 'raising/fetchAdd',
        payload: {
          values: {
            ...values,
            status: values.status ? '1' : '0',
          },
        },
      });
    }

    // 关闭rolemodal
    setRaisingModalVisible(false);
    setConfirmLoading(false);
  };

  // 关闭roleModal
  const closeHandler = () => {
    setRaisingModalVisible(false);
  };

  // 删除
  const deleteHandler = (record: RaisingHistoryType) => {
    setRecord(record);
    const id = record.id;
    dispatch({
      type: 'raising/fetchDel',
      payload: { id },
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
          dataSource={raising?.raisingHistory}
          rowKey="id"
          pagination={false}
          loading={raisingListLoading}
        ></Table>
      </Space>
      <RaisingModal
        visible={raisingModalVisible}
        closeHandler={closeHandler}
        onFinish={onFinish}
        record={record}
        confirmLoading={confirmLoading}
      ></RaisingModal>
    </div>
  );
};

const mapStateToProps = ({
  raising,
  loading,
}: {
  raising: raisingHistoryState;
  loading: Loading;
}) => {
  return {
    raising,
    raisingListLoading: loading.models.raising,
  };
};

export default connect(mapStateToProps)(RaisingHistory);
