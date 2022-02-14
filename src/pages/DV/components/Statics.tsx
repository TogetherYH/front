import { FC, useState, useEffect } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import styles from '../index.less';

interface StaticsProps {}

const Statics: FC<StaticsProps> = ({}) => {
  return (
    <div className={styles.card}>
      <Card>
        <Col>
          <Row gutter={8}>
            <Col>
              <Statistic
                title="今日交易总额"
                suffix="元"
                value={123}
                valueStyle={{ color: '#eeeeee' }}
              />
            </Col>
            <Col>
              <Statistic
                title="销售目标完成率"
                value="92%"
                valueStyle={{ color: '#eeeeee' }}
              />
            </Col>
          </Row>
        </Col>
        {/* <Col>
          <Row>
            <Col md={12} sm={12} xs={24}>
              <Statistic
                title="今日交易总额"
                suffix="元"
                value={123}
              />
            </Col>
            <Col md={12} sm={12} xs={24}>
              <Statistic title="销售目标完成率" value="92%" />
            </Col>
          </Row>
        </Col> */}
      </Card>
    </div>
  );
};

export default Statics;
