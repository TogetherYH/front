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
  Spin,
} from 'antd';
import { resultListState, Loading, connect, Dispatch } from 'umi';
import { ResultType } from './data';
import { report, zip } from './service';
import ResultView from './components/ResultView';

interface ResultProps {
  results: resultListState;
  resultListLoading: boolean;
  dispatch: Dispatch;
}

const Result: FC<ResultProps> = ({ results, dispatch, resultListLoading }) => {
  const [searchForm] = Form.useForm();
  const [resultId, setResultId] = useState<string>();
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const columns = [
    {
      title: '量表',
      dataIndex: 'scaleName',
      key: 'scaleName',
      width: 220,
    },
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
      title: '原始分',
      dataIndex: 'rawScore',
      key: 'rawScore',
      width: 70,
    },
    {
      title: '标准分',
      dataIndex: 'standardScore',
      key: 'standardScore',
      width: 70,
    },
    {
      title: '测评时间',
      dataIndex: 'startTime',
      key: 'startTime',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: ResultType) => (
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
              downloadHandler(record);
            }}
          >
            下载
          </a>
          {/* <Dropdown
            overlay={() => {
              return (
                <Menu>
                  <Menu.Item
                    key="1"
                    icon={<UnorderedListOutlined />}
                    style={{ width: 100 }}
                    onClick={() => {
                      roleMenuHandler(record);
                    }}
                  >
                    菜单权限
                  </Menu.Item>
                  <Menu.Item key="2" icon={<UserOutlined />}>
                    角色用户
                  </Menu.Item>
                </Menu>
              );
            }}
            trigger={['click']}
          >
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              更多 <DownOutlined />
            </a>
          </Dropdown> */}
        </Space>
      ),
    },
  ];

  // 分页
  const paginationHandler = (pageNum: number, pageSize: number | undefined) => {
    dispatch({
      type: 'results/fetchList',
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
      type: 'results/fetchList',
      payload: {
        name: searchForm.getFieldValue('name'),
        pageNum: 1,
        pageSize: results?.pageSize,
      },
    });
  };

  // 刷新
  const refreshHandler = () => {
    dispatch({
      type: 'results/fetchList',
      payload: {
        name: searchForm.getFieldValue('name'),
        pageNum: results?.pageNum,
        pageSize: results?.pageSize,
      },
    });
  };

  // 查看报告
  const viewHandler = (record: ResultType) => {
    setResultId(record.id);
    setViewModalVisible(true);
  };

  // 关闭ViewModal
  const closeHandler = () => {
    setViewModalVisible(false);
  };

  // 下载报告
  const downloadHandler = (record: ResultType) => {
    setDownloading(true);
    report({
      id: record.id,
      fileName: `${record.id}.docx`,
      callBack: setDownloading,
    });
  };

  const zipHandler = () => {
    setDownloading(true);
    zip({ fileName: '测评结果.zip', callBack: setDownloading });
  };

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card>
          <Row gutter={24}>
            <Col span={18}>
              <Form form={searchForm} layout="inline">
                <Form.Item label="" name="name" style={{ marginBottom: '0' }}>
                  <Input allowClear />
                </Form.Item>
              </Form>
            </Col>
            <Col span={6}>
              <Space>
                <Button type="primary" onClick={searchHandler}>
                  搜索
                </Button>
                <Button type="primary" onClick={zipHandler}>
                  批量下载
                </Button>
                <Button onClick={refreshHandler}>刷新</Button>
              </Space>
            </Col>
          </Row>
        </Card>
        <Card>
          <Spin spinning={downloading}>
            <Table
              columns={columns}
              dataSource={results?.list}
              rowKey="id"
              loading={resultListLoading}
              pagination={false}
              size="middle"
              // request={requestHandler}
            />
            <Pagination
              style={{ marginTop: '10px', textAlign: 'right' }}
              total={results?.total}
              size="small"
              onChange={paginationHandler}
              current={results?.pageNum}
              defaultPageSize={20}
              pageSizeOptions={['10', '20', '50', '100']}
              showSizeChanger
              showQuickJumper
              showTotal={(total) => `共 ${total} 条记录`}
            />
          </Spin>
        </Card>
      </Space>
      <ResultView
        visible={viewModalVisible}
        resultId={resultId}
        closeHandler={closeHandler}
      ></ResultView>
    </div>
  );
};

const mapStateToProps = ({
  results,
  loading,
}: {
  results: resultListState;
  loading: Loading;
}) => {
  return {
    results,
    resultListLoading: loading.models.results,
  };
};

export default connect(mapStateToProps)(Result);
