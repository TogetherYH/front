import { FC, useState, useEffect } from 'react';

import { Space, Card, Button, Table, Popconfirm } from 'antd';
import { connect, Dispatch, Loading, dsListState } from 'umi';

interface DataSourceProps {
  dslist: dsListState;
  dsListLoading: boolean;
  dispatch: Dispatch;
}

const DataSource: FC<DataSourceProps> = (props) => {
  const { dslist, dsListLoading, dispatch } = props;

  const columns = [
    {
      title: '数据源',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: '驱动名称',
      dataIndex: 'driverClassName',
      key: 'driverClassName',
      width: 150,
    },
    {
      title: '连接地址',
      dataIndex: 'jdbcUrl',
      key: 'jdbcUrl',
      width: 400,
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          {record.name !== 'master' ? (
            <Popconfirm
              title="确定要删除该数据源?"
              onConfirm={() => {
                deleteHandler(record);
              }}
              okText="Yes"
              cancelText="No"
            >
              <a style={{}}>删除</a>
            </Popconfirm>
          ) : (
            ''
          )}
        </Space>
      ),
      width: 100,
    },
  ];

  const addHandler = () => {
    dispatch({
      type: 'dslist/fetchAdd',
      payload: {},
    });
  };

  const refreshHandler = () => {
    dispatch({
      type: 'dslist/fetchList',
      payload: {},
    });
  };

  // 删除数据源
  const deleteHandler = (record: any) => {
    console.log('rr', record);
    const name = record.name;
    dispatch({
      type: 'dslist/fetchDelete',
      payload: { name },
    });
  };

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card>
          <Space>
            <Button type="primary" onClick={refreshHandler}>
              刷新
            </Button>
            <Button onClick={addHandler}>添加体检中心数据源</Button>
          </Space>
        </Card>
        <Card>
          <Table
            columns={columns}
            dataSource={dslist.list}
            rowKey="poolName"
            loading={dsListLoading}
            pagination={false}
            size="middle"
          />
        </Card>
      </Space>
    </div>
  );
};

const mapStateToProps = ({
  dslist,
  loading,
}: {
  dslist: dsListState;
  loading: Loading;
}) => {
  return {
    dslist,
    dsListLoading: loading.models.dslist,
  };
};

export default connect(mapStateToProps)(DataSource);
