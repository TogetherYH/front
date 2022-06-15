import { FC, useState, useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';
import RecentPublish from './components/RecentPublish';
import Statics from './components/Statics';
import TopScales from './components/TopScales';
import YearColumn from './components/YearColumn';
import ScorePie from './components/ScorePie';
import styles from './index.less';
import ScaleWarning from './components/ScaleWarning';
import PhyWarning from './components/PhyWarning';
import AgeWarning from './components/AgeWarning';
import DeptWarning from './components/DeptWarning';

interface dvProps {}

const DV: FC<dvProps> = ({}) => {
  const style: React.CSSProperties = { padding: '8px 0' };
  const headerStyle: React.CSSProperties = {
    padding: '0 8px',
    color: 'lightgray',
    fontWeight: 'bold',
    fontSize: '16px',
  };

  const [date, setDate] = useState('');
  const getNewDate = () => {
    const time = new Date();
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const hour = time.getHours();
    const mi = time.getMinutes();
    const minutes = mi <= 9 ? '0' + mi : mi;
    const sec = time.getSeconds();
    const seconds = sec <= 9 ? '0' + sec : sec;
    const t =
      year +
      '年' +
      month +
      '月' +
      day +
      '日 ' +
      hour +
      ':' +
      minutes +
      ':' +
      seconds;
    setDate(t);
  };
  setInterval(getNewDate, 1000);

  return (
    <div
      style={{ padding: '24px', backgroundColor: '#05082B', height: '100vh' }}
    >
      <Row
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: '14px',
          alignItems: 'flex-end',
        }}
      >
        <div>
          <span
            style={{
              color: '#20A1EF',
              fontSize: '16px',
              fontWeight: 'bold',
              textShadow: '1px 1px 1px lightgray',
            }}
          >
            全军心理卫生指导中心·济南
          </span>
        </div>
        <div>
          <span
            style={{
              color: '#20A1EF',
              fontSize: '36px',
              fontWeight: 'bold',
              textShadow: '1px 1px 1px lightgray',
            }}
          >
            军人身心健康大数据管理支撑平台
          </span>
        </div>
        <div>
          <span
            style={{ color: '#20A1EF', fontSize: '16px', fontWeight: 'bold' }}
          >
            {date}
          </span>
        </div>
      </Row>

      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <div style={headerStyle}>
            <BarChartOutlined /> 统计
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={headerStyle}>
            <BarChartOutlined /> 测评记录
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={headerStyle}>
            <BarChartOutlined /> 量表预警
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={headerStyle}>
            <BarChartOutlined /> 生理指标预警
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <Statics />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <YearColumn />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ScaleWarning />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <PhyWarning />
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <div style={headerStyle}>
            <BarChartOutlined /> 测评任务记录
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={headerStyle}>
            <BarChartOutlined /> 各年龄段预警统计
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={headerStyle}>
            <BarChartOutlined /> 部门预警统计
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <div style={style}>
            <RecentPublish />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <AgeWarning />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <DeptWarning />
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <div style={headerStyle}>
            <BarChartOutlined /> 测评结果分布
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <div style={headerStyle}>
            <BarChartOutlined /> 最近预警记录
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <div style={style}>
            <ScorePie />
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <div style={style}>
            <YearColumn />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DV;
