import { FC, useState } from 'react';
import {
  Table,
  Space,
  Form,
  Input,
  Button,
  Card,
  Pagination,
  Popconfirm,
  Row,
  Col,
} from 'antd';
import { connect, Dispatch, Loading, jobState } from 'umi';
import { JobType } from './data';
import JobModal from './components/JobModal';

interface JobProps {
  jobs: jobState;
  dispatch: Dispatch;
  jobListLoading: boolean;
}

const Job: FC<JobProps> = ({ jobs, dispatch, jobListLoading }) => {
  const [jobModalVisible, setJobModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [record, setRecord] = useState<JobType | undefined>(undefined);
  const [searchForm] = Form.useForm();
  const [jobId, setJobId] = useState<string>('');
  const [roleMenuModalVisible, setroleMenuModalVisible] = useState(false);

  const columns = [
    {
      title: '任务名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: '分组',
      dataIndex: 'group',
      key: 'group',
      width: 150,
    },
    {
      title: '调度字符串',
      dataIndex: 'taskStr',
      key: 'taskStr',
      width: 150,
    },
    {
      title: 'cron表达式',
      dataIndex: 'cronExpression',
      key: 'cronExpression',
      width: 150,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 70,
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: JobType) => (
        <Space size="middle">
          <a
            onClick={() => {
              editHandler(record);
            }}
          >
            修改
          </a>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => {
              deleteHandler(record);
            }}
            okText="Yes"
            cancelText="No"
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 分页
  const paginationHandler = (pageNum: number, pageSize: number | undefined) => {
    dispatch({
      type: 'jobs/fetchList',
      payload: {
        name: searchForm.getFieldValue('name'),
        pageNum,
        pageSize,
      },
    });
  };

  // 搜索
  const searchHandler = () => {
    dispatch({
      type: 'jobs/fetchList',
      payload: {
        name: searchForm.getFieldValue('name'),
        pageNum: 1,
        pageSize: jobs?.pageSize,
      },
    });
  };

  // 打开添加modal
  const addHandler = () => {
    setRecord(undefined);
    setJobModalVisible(true);
  };

  // 打开编辑modal
  const editHandler = (record: JobType) => {
    setRecord(record);
    // console.log('rrr', record);
    setJobModalVisible(true);
  };

  // 添加、更新处理方法
  const onFinish = (values: any) => {
    // console.log('form on finish');
    setConfirmLoading(true);
    let id = '';
    if (record) {
      id = record.id;
    }
    if (id) {
      dispatch({
        type: 'jobs/fetchUpdate',
        payload: {
          id,
          values: {
            ...values,
            status: values.status ? '1' : '0',
          },
        },
      });
    } else {
      dispatch({
        type: 'jobs/fetchAdd',
        payload: {
          values: {
            ...values,
            status: values.status ? '1' : '0',
          },
        },
      });
    }

    // 关闭jobmodal
    setJobModalVisible(false);
    setConfirmLoading(false);
  };

  // 关闭jobModal
  const closeHandler = () => {
    setJobModalVisible(false);
  };

  // 删除
  const deleteHandler = (record: JobType) => {
    setRecord(record);
    const id = record.id;
    dispatch({
      type: 'jobs/fetchDelete',
      payload: { id },
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
                  label="角色名称"
                  name="name"
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
                <Button onClick={addHandler}>添加</Button>
              </Space>
            </Col>
          </Row>
        </Card>
        <Card>
          <Table
            columns={columns}
            dataSource={jobs?.list}
            rowKey="id"
            loading={jobListLoading}
            pagination={false}
            size="middle"
            // request={requestHandler}
          />
          <Pagination
            style={{ marginTop: '10px', textAlign: 'right' }}
            total={jobs?.total}
            size="small"
            onChange={paginationHandler}
            current={jobs?.pageNum}
            defaultPageSize={20}
            pageSizeOptions={['10', '20', '50', '100']}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `共 ${total} 条记录`}
          />
        </Card>
      </Space>
      <JobModal
        visible={jobModalVisible}
        closeHandler={closeHandler}
        onFinish={onFinish}
        record={record}
        confirmLoading={confirmLoading}
      />
    </div>
  );
};

const mapStateToProps = ({
  jobs,
  loading,
}: {
  jobs: jobState;
  loading: Loading;
}) => {
  return {
    jobs,
    roleListLoading: loading.models.jobs,
  };
};

export default connect(mapStateToProps)(Job);
