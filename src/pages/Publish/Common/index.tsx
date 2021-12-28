import { FC, useState, useEffect } from 'react';
import { Space, Card, Table, Button, Row, Input } from 'antd';
import { commonListState, Loading, connect, Dispatch } from 'umi';
import ScaleSelect from '@/components/System/ScaleSelect';

interface CommonProps {
  commons: commonListState;
  commonListLoading: boolean;
  dispatch: Dispatch;
}

const Common: FC<CommonProps> = ({
  commons,
  // scaleTree,
  dispatch,
  commonListLoading,
}) => {
  // const [scaleModalVisible, setScaleModalVisible] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  // // const [record, setRecord] = useState<UserType | undefined>(undefined);
  // const [scaleId, setScaleId] = useState<string | undefined>('');
  // const [searchForm] = Form.useForm();
  const [scaleSelectVisible, setScaleSelectVisible] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    // 为ScaleSelect初始化数据
    if (commons.list) {
      let keys: string[] = [];
      commons.list.map((c) => {
        keys.push(c.id);
      });
      setSelectedKeys(keys);
    }
  }, [commons]);

  const columns = [
    {
      title: '量表名称',
      dataIndex: 'scaleName',
      key: 'scaleName',
    },
  ];

  const openScaleSelect = () => {
    setScaleSelectVisible(true);
  };

  const openUserSelect = () => {};

  const startTest = () => {};

  const handleOk = () => {
    setScaleSelectVisible(false);
  };

  const handleCancel = () => {
    setScaleSelectVisible(false);
  };

  // 保存
  const saveCommons = (checkedKeys: string[]) => {
    dispatch({
      type: 'commons/fetchSave',
      payload: { scaleIds: checkedKeys },
    });
    setScaleSelectVisible(false);
  };

  // // 打开添加modal
  // const addHandler = () => {
  //   setScaleId(undefined);
  //   setScaleModalVisible(true);
  // };

  // // 打开编辑modal
  // const editHandler = (record: ScaleType) => {
  //   setScaleId(record.id);
  //   setScaleModalVisible(true);
  // };

  // // 关闭Modal
  // const closeHandler = () => {
  //   setScaleModalVisible(false);
  // };

  // // 添加、更新处理方法
  // const onFinish = (values: FormValues) => {
  //   // console.log('form on finish');
  //   setConfirmLoading(true);
  //   let id = '';
  //   if (scaleId) {
  //     id = scaleId;
  //   }
  //   if (id) {
  //     dispatch({
  //       type: 'scales/fetchUpdate',
  //       payload: {
  //         id,
  //         values: {
  //           ...values,
  //           status: values.status ? '1' : '0',
  //         },
  //       },
  //     });
  //   } else {
  //     dispatch({
  //       type: 'scales/fetchAdd',
  //       payload: {
  //         values: {
  //           ...values,
  //           status: values.status ? '1' : '0',
  //         },
  //       },
  //     });
  //   }

  //   // 关闭modal
  //   setScaleModalVisible(false);
  //   setConfirmLoading(false);
  // };

  // // 删除记录
  // const deleteHandler = (record: ScaleType) => {
  //   // setRecord(record);
  //   const id = record.id;
  //   dispatch({
  //     type: 'scales/fetchDelete',
  //     payload: { id },
  //   });
  // };

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space direction="horizontal">
              <Input />
              <Button onClick={openUserSelect}>选择用户</Button>
              <Button onClick={openScaleSelect}>量表设置</Button>
              <Button onClick={startTest} type="primary">
                测评
              </Button>
            </Space>
            <Table
              columns={columns}
              dataSource={commons?.list}
              rowKey="id"
              loading={commonListLoading}
              pagination={false}
              size="middle"
              rowSelection={{
                type: 'checkbox',
              }}
              // request={requestHandler}
            />
          </Space>
        </Card>
      </Space>
      <ScaleSelect
        isModalVisible={scaleSelectVisible}
        defaultChecked={selectedKeys}
        handleOk={saveCommons}
        handleCancel={handleCancel}
      ></ScaleSelect>
    </div>
  );
};

const mapStateToProps = ({
  commons,
  loading,
}: {
  commons: commonListState;
  loading: Loading;
}) => {
  return {
    commons,
    commonListLoading: loading.models.commons,
  };
};

export default connect(mapStateToProps)(Common);
