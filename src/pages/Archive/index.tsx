import { FC } from 'react';
import { Space, Card, Tabs } from 'antd';
import UserInfo from './UserInfo';
const { TabPane } = Tabs;

const Archive: FC = () => {
  const callback = () => {};

  return (
    <div>
      <Card>
        <Tabs defaultActiveKey="userInfo" onChange={callback}>
          <TabPane tab="个人信息" key="userInfo">
            <UserInfo />
          </TabPane>
          <TabPane tab="成长史" key="grownInfo">
            成长史
          </TabPane>
          <TabPane tab="抚养史" key="raiseInfo">
            抚养史
          </TabPane>
          <TabPane tab="父母信息" key="parentInfo">
            父母信息
          </TabPane>
          <TabPane tab="其他家庭成员" key="family">
            其他家庭成员
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Archive;
