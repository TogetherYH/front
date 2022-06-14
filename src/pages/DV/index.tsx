import { FC, useState, useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import RecentPublish from './components/RecentPublish';
import Statics from './components/Statics';
import TopScales from './components/TopScales';
import YearColumn from './components/YearColumn';
import ScorePie from './components/ScorePie';
import styles from './index.less';
import ScaleWarning from './components/ScaleWarning';
import PhyWarning from './components/PhyWarning';

interface dvProps {}

const DV: FC<dvProps> = ({}) => {
  const style: React.CSSProperties = { padding: '8px 0' };

  return (
    // <div style={{ backgroundColor: '#05082B', height: '100vh' }}>
    //   <Row
    //     style={{
    //       display: 'flex',
    //       flexDirection: 'row',
    //       justifyContent: 'space-around',
    //       lineHeight: 4,
    //     }}
    //   >
    //     <div>logo</div>
    //     <div>header</div>
    //     <div>time</div>
    //   </Row>

    //   <Row gutter={16}>
    //     <Col className={styles.gutterBox} span={6} >
    //       <Statics />
    //     </Col>
    //     <Col className={styles.gutterBox} span={6} >
    //       <Recent />
    //     </Col>
    //     <Col className={styles.gutterBox} span={6} >
    //       <Statics />
    //     </Col>
    //     <Col className={styles.gutterBox} span={6} >
    //       <Statics />
    //     </Col>
    //   </Row>

    //   <Row className={styles.row + ' ' + styles.rowHeight}>
    //     <Col span={6} className={styles.cardHeight}>
    //       <TopScales />
    //     </Col>
    //     <Col span={12} className={styles.cardHeight}>
    //       <YearColumn />
    //     </Col>
    //   </Row>

    //   <Row className={styles.row + ' ' + styles.rowHeight}>
    //     <Col span={20} className={styles.cardHeight}>
    //       <ScorePie />
    //     </Col>
    //   </Row>
    // </div>
    <div
      style={{ padding: '24px', backgroundColor: '#05082B', height: '100vh' }}
    >
      <Row
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          lineHeight: 4,
          paddingBottom: '24px',
        }}
      >
        <div>logo</div>
        <div>
          <span style={{ color: 'gray' }}>身心健康管理系统</span>
        </div>
        <div>time</div>
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
          <div style={style}>
            <RecentPublish />
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
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <div style={style}>
            <Statics />
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
