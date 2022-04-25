import { FC, useState, useEffect } from 'react';
import {
  Space,
  Card,
  Table,
  Button,
  Row,
  Input,
  Col,
  Form,
  Pagination,
  Select,
} from 'antd';
const { Option } = Select;
import { recordListState, Loading, connect, Dispatch } from 'umi';
import { RecordType } from './data';

interface RecordProps {
  records: recordListState;
  recordListLoading: boolean;
  dispatch: Dispatch;
}

const Record: FC<RecordProps> = ({ records, dispatch, recordListLoading }) => {
  const [searchForm] = Form.useForm();
  const [recordId, setRecordId] = useState<string>();
  const [downloading, setDownloading] = useState(false);

  const columns = [
    {
      title: '计算错误量表',
      dataIndex: 'scaleName',
      key: 'scaleName',
      width: 220,
    },
    {
      title: '账号',
      dataIndex: 'username',
      key: 'username',
      width: 150,
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      width: 200,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      width: 200,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: RecordType) => (
        <Space size="middle">
          <a
            onClick={() => {
              calculator(record); // 计算
            }}
          >
            计算
          </a>
        </Space>
      ),
    },
  ];

  // 分页
  const paginationHandler = (pageNum: number, pageSize: number | undefined) => {
    dispatch({
      type: 'records/fetchList',
      payload: {
        scaleName: searchForm.getFieldValue('scaleName'),
        pageNum,
        pageSize,
      },
    });
  };

  // 搜索
  const searchHandler = () => {
    dispatch({
      type: 'records/fetchList',
      payload: {
        scaleName: searchForm.getFieldValue('scaleName'),
        pageNum: 1,
        pageSize: records?.pageSize,
      },
    });
  };

  // 刷新
  const refreshHandler = () => {
    dispatch({
      type: 'records/fetchList',
      payload: {
        scaleName: searchForm.getFieldValue('scaleName'),
        pageNum: records?.pageNum,
        pageSize: records?.pageSize,
      },
    });
  };

  //  计算
  const calculator = (record: RecordType) => {
    setRecordId(record.id);
    dispatch({
      type: 'records/fetchCalculator',
      payload: {
        id: record.id,
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
                  label="量表名称"
                  name="scaleName"
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
                <Button onClick={refreshHandler}>刷新</Button>
              </Space>
            </Col>
          </Row>
        </Card>
        <Card>
          <Table
            columns={columns}
            dataSource={records?.list}
            rowKey="id"
            loading={recordListLoading}
            pagination={false}
            size="middle"
            // request={requestHandler}
          />
          <Pagination
            style={{ marginTop: '10px', textAlign: 'right' }}
            total={records?.total}
            size="small"
            onChange={paginationHandler}
            current={records?.pageNum}
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
  records,
  loading,
}: {
  records: recordListState;
  loading: Loading;
}) => {
  return {
    records,
    recordListLoading: loading.models.records,
  };
};

export default connect(mapStateToProps)(Record);
