import { FC, useState, useEffect } from 'react';
import {
  Table,
  Space,
  Button,
  Popconfirm,
  Card,
  Pagination,
  Input,
  Form,
  Row,
  Col,
} from 'antd';
import { connect, Dispatch, Loading, logListState } from 'umi';
import moment from 'moment';
import { LogType } from './data';

interface LogProps {
  logs: logListState;
  dispatch: Dispatch;
  logListLoading: boolean;
}

const Log: FC<LogProps> = ({ logs, dispatch, logListLoading }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [record, setRecord] = useState<UserType | undefined>(undefined);
  const [searchForm] = Form.useForm();

  // const fetchData = async () => {
  //   const result = await all({});
  //   setAllRole(
  //     result?.data.map((menu: any) => {
  //       return {
  //         value: menu.id,
  //         label: menu.name,
  //       };
  //     }),
  //   );
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [setAllRole]);

  const columns = [
    {
      title: '功能',
      dataIndex: 'title',
      key: 'title',
      width: 120,
    },
    {
      title: '请求方法',
      dataIndex: 'operUrl',
      key: 'operUrl',
      width: 120,
    },
    {
      title: '用户',
      dataIndex: 'operUser',
      key: 'operUser',
      width: 120,
    },
    {
      title: '请求参数',
      dataIndex: 'operParam',
      key: 'operParam',
      width: 700,
    },
    {
      title: '请求时间',
      dataIndex: 'operTime',
      key: 'operTime',
      width: 140,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
    },
    // {
    //   title: '操作',
    //   key: 'action',
    //   render: (text: string, record: LogType) => (
    //     <Space size="middle">
    //       <a
    //         onClick={() => {
    //           // editHandler(record);
    //         }}
    //       >
    //         修改
    //       </a>
    //     </Space>
    //   ),
    // },
  ];

  // 分页
  const paginationHandler = (pageNum: number, pageSize: number | undefined) => {
    dispatch({
      type: 'logs/fetchList',
      payload: {
        title: searchForm.getFieldValue('title'),
        operUser: searchForm.getFieldValue('operUser'),
        pageNum,
        pageSize,
      },
    });
  };

  // 搜索
  const searchHandler = () => {
    dispatch({
      type: 'logs/fetchList',
      payload: {
        title: searchForm.getFieldValue('title'),
        operUser: searchForm.getFieldValue('operUser'),
        pageNum: 1,
        pageSize: logs?.pageSize,
      },
    });
  };

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card>
          <Row gutter={24}>
            <Col span={18}>
              <Form form={searchForm} layout="inline">
                <Form.Item
                  label="功能"
                  name="title"
                  style={{ marginBottom: '0' }}
                >
                  <Input allowClear />
                </Form.Item>
                <Form.Item
                  label="用户"
                  name="operUser"
                  style={{ marginBottom: '0' }}
                >
                  <Input allowClear />
                </Form.Item>
              </Form>
            </Col>
            <Col span={6}>
              <Space>
                <Button type="primary" onClick={searchHandler}>
                  搜索
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
        <Card>
          <Table
            columns={columns}
            dataSource={logs?.list}
            rowKey="id"
            loading={logListLoading}
            pagination={false}
            size="middle"
            scroll={{ y: 600 }}
          />
          <Pagination
            style={{ marginTop: '10px', textAlign: 'right' }}
            total={logs?.total}
            size="small"
            onChange={paginationHandler}
            current={logs?.pageNum}
            defaultPageSize={20}
            pageSizeOptions={['10', '20', '50', '100']}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `共 ${total} 条记录`}
          />
        </Card>
      </Space>
    </div>
  );
};

const mapStateToProps = ({
  logs,
  loading,
}: {
  logs: logListState;
  loading: Loading;
}) => {
  return {
    logs,
    logListLoading: loading.models.logs,
  };
};

export default connect(mapStateToProps)(Log);
