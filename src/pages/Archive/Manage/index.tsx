import { FC, useState } from 'react';
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
import { connect, Dispatch, Loading, archiveListState } from 'umi';
import { ArchiveType } from './data';
import { report } from './service';
import ArchiveView from './components/ArchiveView';

interface ArchiveProps {
  archives: archiveListState;
  dispatch: Dispatch;
  archiveListLoading: boolean;
}

const ArchiveManage: FC<ArchiveProps> = (props) => {
  const { archives, dispatch, archiveListLoading } = props;
  const [searchForm] = Form.useForm();
  const [archiveId, setArchiveId] = useState<string>();
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const columns = [
    {
      title: '账号',
      dataIndex: 'username',
      key: 'username',
      width: 200,
    },
    {
      title: '姓名',
      dataIndex: 'realName',
      key: 'realName',
      width: 100,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      width: 100,
    },
    {
      title: '出生日期',
      dataIndex: 'birthday',
      key: 'birthday',
      width: 150,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 200,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: ArchiveType) => (
        <Space size="middle">
          <a
            onClick={() => {
              viewHandler(record);
            }}
          >
            查看
          </a>
          <a
            onClick={() => {
              exportHandler(record);
            }}
          >
            导出
          </a>
        </Space>
      ),
    },
  ];
  const searchHandler = () => {
    dispatch({
      type: 'archives/fetchList',
      payload: {
        username: searchForm.getFieldValue('username'),
        realName: searchForm.getFieldValue('realName'),
        pageNum: 1,
        pageSize: archives?.pageSize,
      },
    });
  };

  const paginationHandler = (pageNum: number, pageSize: number | undefined) => {
    dispatch({
      type: 'archives/fetchList',
      payload: {
        username: searchForm.getFieldValue('username'),
        realName: searchForm.getFieldValue('realName'),
        pageNum,
        pageSize,
      },
    });
  };

  // 查看档案
  const viewHandler = (record: ArchiveType) => {
    setArchiveId(record.id);
    setViewModalVisible(true);
  };

  // 关闭ViewModal
  const closeHandler = () => {
    setViewModalVisible(false);
  };

  const exportHandler = (record: ArchiveType) => {
    setDownloading(true);
    report({
      id: record.id,
      fileName: `${record.username}-档案.docx`,
      callBack: setDownloading,
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
                  label="账号"
                  name="username"
                  style={{ marginBottom: '0' }}
                >
                  <Input allowClear />
                </Form.Item>
                <Form.Item
                  label="姓名"
                  name="realName"
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
                {/* <Button onClick={addHandler}>添加</Button> */}
              </Space>
            </Col>
          </Row>
        </Card>
        <Card>
          <Table
            columns={columns}
            dataSource={archives?.list}
            rowKey="id"
            loading={archiveListLoading}
            pagination={false}
            size="middle"
            scroll={{ y: 600 }}
          />
          <Pagination
            style={{ marginTop: '10px', textAlign: 'right' }}
            total={archives?.total}
            size="small"
            onChange={paginationHandler}
            current={archives?.pageNum}
            defaultPageSize={20}
            pageSizeOptions={['10', '20', '50', '100']}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `共 ${total} 条记录`}
          />
        </Card>
      </Space>
      <ArchiveView
        visible={viewModalVisible}
        archiveId={archiveId}
        closeHandler={closeHandler}
      />
    </div>
  );
};

const mapStateToProps = ({
  archives,
  loading,
}: {
  archives: archiveListState;
  loading: Loading;
}) => {
  return {
    archives,
    archiveListLoading: loading.models.archives,
  };
};

export default connect(mapStateToProps)(ArchiveManage);
