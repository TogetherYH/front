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
import { connect, Dispatch, Loading, publishListState } from 'umi';
import moment from 'moment';
import PublishModal from './components/PublishModal';
import { PublishType, FormValues } from './data';

interface PublishProps {
  publishs: publishListState;
  // scaleTree: scaleTreeState;
  dispatch: Dispatch;
  publishListLoading: boolean;
}

const Publish: FC<PublishProps> = ({
  publishs,
  dispatch,
  publishListLoading,
}) => {
  const [publishModalVisible, setPublishModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [searchForm] = Form.useForm();
  const [publishId, setPublishId] = useState<string | undefined>('');

  const columns = [
    {
      title: '发布主题',
      dataIndex: 'subject',
      key: 'subject',
      width: 400,
    },
    {
      title: '开始日期',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 150,
    },
    {
      title: '结束日期',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 150,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 170,
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
      render: (text: string, record: PublishType) => (
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
            <a style={{}}>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 分页
  const paginationHandler = (pageNum: number, pageSize: number | undefined) => {
    dispatch({
      type: 'publishs/fetchList',
      payload: {
        subject: searchForm.getFieldValue('subject'),
        pageNum,
        pageSize,
      },
    });
  };

  // 搜索
  const searchHandler = () => {
    dispatch({
      type: 'publishs/fetchList',
      payload: {
        subject: searchForm.getFieldValue('subject'),
        pageNum: 1,
        pageSize: publishs?.pageSize,
      },
    });
  };

  // 刷新
  const refreshHandler = () => {
    dispatch({
      type: 'publishs/fetchList',
      payload: {
        subject: searchForm.getFieldValue('subject'),
        pageNum: publishs?.pageNum,
        pageSize: publishs?.pageSize,
      },
    });
  };

  // 打开添加modal
  const addHandler = () => {
    setPublishId(undefined);
    setPublishModalVisible(true);
  };

  // 打开编辑modal
  const editHandler = (record: PublishType) => {
    setPublishId(record.id);
    // console.log('rrr', record);
    setPublishModalVisible(true);
  };

  // 添加、更新处理方法
  const onFinish = (values: FormValues) => {
    // console.log('form on finish');
    setConfirmLoading(true);
    console.log('ppppp', values.startDate);
    values = {
      ...values,
      status: values.status ? '1' : '0',
      startDate: moment(values.startDate[0]).utcOffset(8).format('YYYY-MM-DD'),
      endDate: moment(values.startDate[1]).utcOffset(8).format('YYYY-MM-DD'),
    };
    let id = '';
    if (publishId) {
      id = publishId;
    }
    if (id) {
      dispatch({
        type: 'publishs/fetchUpdate',
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
        type: 'publishs/fetchAdd',
        payload: {
          values: {
            ...values,
            status: values.status ? '1' : '0',
          },
        },
      });
    }

    // 关闭publishmodal
    setPublishModalVisible(false);
    setConfirmLoading(false);
  };

  // 关闭publishModal
  const closeHandler = () => {
    setPublishModalVisible(false);
  };

  // 删除
  const deleteHandler = (record: PublishType) => {
    setPublishId(record.id);
    const id = record.id;
    dispatch({
      type: 'publishs/fetchDelete',
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
                  label="发布主题"
                  name="subject"
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
                <Button onClick={refreshHandler}>刷新</Button>
              </Space>
            </Col>
          </Row>
        </Card>
        <Card>
          <Table
            columns={columns}
            dataSource={publishs?.list}
            rowKey="id"
            loading={publishListLoading}
            pagination={false}
            size="middle"
            // request={requestHandler}
          />
          <Pagination
            style={{ marginTop: '10px', textAlign: 'right' }}
            total={publishs?.total}
            size="small"
            onChange={paginationHandler}
            current={publishs?.pageNum}
            defaultPageSize={20}
            pageSizeOptions={['10', '20', '50', '100']}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `共 ${total} 条记录`}
          />
        </Card>
      </Space>
      <PublishModal
        visible={publishModalVisible}
        closeHandler={closeHandler}
        onFinish={onFinish}
        publishId={publishId}
        confirmLoading={confirmLoading}
      />
    </div>
  );
};

const mapStateToProps = ({
  publishs,
  loading,
}: {
  publishs: publishListState;
  loading: Loading;
}) => {
  return {
    publishs,
    publishListLoading: loading.models.publishs,
  };
};

export default connect(mapStateToProps)(Publish);
