import { FC, useState, useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import Recent from './components/Recent';
import Statics from './components/Statics';
import TopScales from './components/TopScales';
import YearColumn from './components/YearColumn';
import ScorePie from './components/ScorePie';
import styles from './index.less';

interface dvProps {}

const DV: FC<dvProps> = ({}) => {
  return (
    <div style={{ backgroundColor: '#05082B', height: '100vh' }}>
      <Row
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          lineHeight: 4,
        }}
      >
        <div>logo</div>
        <div>header</div>
        <div>time</div>
      </Row>

      <Row className={styles.row + ' ' + styles.rowHeight}>
        <Col span={6} className={styles.cardHeight}>
          <Recent />
        </Col>
        <Col span={6} className={styles.cardHeight}>
          <Statics />
        </Col>
      </Row>

      <Row className={styles.row + ' ' + styles.rowHeight}>
        <Col span={6} className={styles.cardHeight}>
          <TopScales />
        </Col>
        <Col span={12} className={styles.cardHeight}>
          <YearColumn />
        </Col>
      </Row>

      <Row className={styles.row + ' ' + styles.rowHeight}>
        <Col span={20} className={styles.cardHeight}>
          <ScorePie />
        </Col>
      </Row>
    </div>
  );
};

export default DV;
