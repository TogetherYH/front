import { FC, useState, useEffect } from 'react';
import { Space, Card, Table, Button, Row, Input, notification } from 'antd';
import { commonListState, Loading, connect, Dispatch } from 'umi';
import ScaleSelect from '@/components/System/ScaleSelect';
import UserSelect from '@/components/System/UserSelect';
import Test from '@/pages/Assess/Test';
import { UserType } from '@/pages/System/User/data';
import { ScaleType } from '@/pages/Base/Scale/data';

interface CommonProps {
  commons: commonListState;
  commonListLoading: boolean;
  dispatch: Dispatch;
}

const Common: FC<CommonProps> = ({ commons, dispatch, commonListLoading }) => {
  const [scaleSelectVisible, setScaleSelectVisible] = useState(false);
  const [userSelectVisible, setUserSelectVisible] = useState(false);
  const [testVisible, setTestVisible] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [user, setUser] = useState<UserType>();
  const [scale, setScale] = useState<ScaleType[]>();

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

  const openUserSelect = () => {
    setUserSelectVisible(true);
  };

  const handleScaleModalCancel = () => {
    setScaleSelectVisible(false);
  };

  const handleUserModalCancel = () => {
    setUserSelectVisible(false);
  };

  const handleTestModalCancel = () => {
    setTestVisible(false);
  };

  // 保存常用量表
  // const saveCommons = (checkedKeys: string[]) => {
  //   dispatch({
  //     type: 'commons/fetchSave',
  //     payload: { scaleIds: checkedKeys },
  //   });
  //   setScaleSelectVisible(false);
  // };

  // 保存常用量表
  const saveCommons = (checkedNodes: any[]) => {
    var checkedKeys = checkedNodes.map((item) => {
      return item.id;
    });
    dispatch({
      type: 'commons/fetchSave',
      payload: { scaleIds: checkedKeys },
    });
    setScaleSelectVisible(false);
  };

  // 选中用户
  const onSelectUser = (user: UserType) => {
    setUser(user);
    setUserSelectVisible(false);
  };

  // 选中量表
  const rowSelection = {
    onSelect: (
      record: ScaleType,
      selected: boolean,
      selectedRows: ScaleType[],
      nativeEvent: Event,
    ) => {
      // console.log('selectedRows',selectedRows);
      setScale(selectedRows);
    },
  };

  // 开始测评
  const startTest = () => {
    if (!scale || scale.length === 0) {
      notification.warn({
        message: '请选择要测评的量表',
      });
      return;
    }
    if (!user || !user.id) {
      notification.warn({
        message: '请选择要测评的用户',
      });
      return;
    }
    setTestVisible(true);
  };

  const handleTestOk = () => {
    setTestVisible(false);
  };

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space direction="horizontal">
              <Input value={user?.realName} />
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
                ...rowSelection,
              }}
            />
          </Space>
        </Card>
      </Space>
      <ScaleSelect
        isModalVisible={scaleSelectVisible}
        defaultChecked={selectedKeys}
        handleOk={saveCommons}
        handleCancel={handleScaleModalCancel}
      />
      <UserSelect
        isModalVisible={userSelectVisible}
        handleCancel={handleUserModalCancel}
        onSelectUser={onSelectUser}
      />
      <Test
        isModalVisible={testVisible}
        user={user}
        scale={scale}
        publishId="common"
        handleOk={handleTestOk}
        handleCancel={handleTestModalCancel}
      />
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
