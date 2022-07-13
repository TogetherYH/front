import { FC, useState, useEffect } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { connect, Dispatch, staticsState } from 'umi';
import styles from '../index.less';

interface StaticsProps {
  statics: staticsState;
}

const Statics: FC<StaticsProps> = (props) => {
  const { statics } = props;
  return (
    <div className={styles.card + ' ' + styles.cardHeight}>
      <Card
        bodyStyle={{
          backgroundColor: '#05082B',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          height: '100%',
        }}
        style={{ height: '100%' }}
        bordered={false}
      >
        <Col
          style={{
            // backgroundColor: '#05082B',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}
        >
          <Row>
            <Statistic
              title={
                <span
                  style={{
                    fontSize: '16px',
                    color: 'lightgray',
                    fontWeight: 'bold',
                  }}
                >
                  用户
                </span>
              }
              suffix={
                <span style={{ fontSize: '14px', color: 'lightgray' }}>人</span>
              }
              value={statics.countUser}
              valueStyle={{ color: '#23B7E5', fontSize: '28px' }}
              style={{ color: 'gray' }}
            />
          </Row>
          <Row>
            <Statistic
              title={
                <span
                  style={{
                    fontSize: '16px',
                    color: 'lightgray',
                    fontWeight: 'bold',
                  }}
                >
                  测评
                </span>
              }
              suffix={
                <span style={{ fontSize: '14px', color: 'lightgray' }}>
                  人次
                </span>
              }
              value={statics.countResult}
              valueStyle={{ color: '#23B7E5', fontSize: '28px' }}
              style={{ color: 'gray' }}
            />
          </Row>
        </Col>

        <Col
          style={{
            // backgroundColor: '#05082B',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}
        >
          <Row>
            <Statistic
              title={
                <span
                  style={{
                    fontSize: '16px',
                    color: 'lightgray',
                    fontWeight: 'bold',
                  }}
                >
                  预警
                </span>
              }
              suffix={
                <span style={{ fontSize: '14px', color: 'lightgray' }}>人</span>
              }
              value={statics.countWarning}
              valueStyle={{ color: '#FAAA21', fontSize: '28px' }}
              style={{ color: 'gray' }}
            />
          </Row>
          <Row>
            <Statistic
              title={
                <span
                  style={{
                    fontSize: '16px',
                    color: 'lightgray',
                    fontWeight: 'bold',
                  }}
                >
                  中级及以上
                </span>
              }
              suffix={
                <span style={{ fontSize: '14px', color: 'lightgray' }}>人</span>
              }
              value={statics.countWarningMiddleAbove}
              valueStyle={{ color: '#FAAA21', fontSize: '28px' }}
              style={{ color: 'gray' }}
            />
          </Row>
        </Col>
      </Card>
    </div>
  );
};

const mapStateToProps = ({ statics }: { statics: staticsState }) => {
  return {
    statics,
  };
};

export default connect(mapStateToProps)(Statics);
