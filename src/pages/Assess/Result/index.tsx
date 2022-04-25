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
  Checkbox,
  Select,
} from 'antd';
const { Option } = Select;
import { resultListState, Loading, connect, Dispatch } from 'umi';
import { ResultType } from './data';
import { report, zip } from './service';
import ResultView from './components/ResultView';
import './index.css';

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
      title: '是否医护人员',
      dataIndex: 'medicalStaff',
      key: 'medicalStaff',
      width: 100,
      render: (text: string) => {
        return text === '1' ? '是' : text === '0' ? '否' : '';
      },
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
      title: '预警级别',
      dataIndex: 'warningLevel',
      key: 'warningLevel',
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
        scaleName: searchForm.getFieldValue('scaleName'),
        warningLevel: searchForm.getFieldValue('warningLevel'),
        medicalStaff: searchForm.getFieldValue('medicalStaff'),
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
        scaleName: searchForm.getFieldValue('scaleName'),
        warningLevel: searchForm.getFieldValue('warningLevel'),
        medicalStaff: searchForm.getFieldValue('medicalStaff'),
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
        scaleName: searchForm.getFieldValue('scaleName'),
        warningLevel: searchForm.getFieldValue('warningLevel'),
        medicalStaff: searchForm.getFieldValue('medicalStaff'),
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
    zip({
      fileName: '测评结果.zip',
      scaleName: searchForm.getFieldValue('scaleName'),
      warningLevel: searchForm.getFieldValue('warningLevel'),
      medicalStaff: searchForm.getFieldValue('medicalStaff'),
      callBack: setDownloading,
    });
  };

  const rowClassName = (record: ResultType, index: number, indent: number) => {
    if (record.warningLevel === '严重') {
      return 'red-row';
    } else if (record.warningLevel === '偏重') {
      return 'orange-row';
    } else if (record.warningLevel === '中度') {
      return 'yellow-row';
    } else if (record.warningLevel === '轻度') {
      return 'green-row';
    }
  };

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card>
          <Row gutter={24}>
            <Col span={18}>
              <Form form={searchForm} layout="inline">
                <Form.Item
                  label="量表"
                  name="scaleName"
                  style={{ marginBottom: '0' }}
                >
                  <Input allowClear />
                </Form.Item>
                <Form.Item label="是否医护人员" name="medicalStaff">
                  <Select style={{ width: 120 }} allowClear>
                    <Option key="1" value="1">
                      医护人员
                    </Option>
                    <Option key="0" value="0">
                      非医护人员
                    </Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="预警"
                  name="warningLevel"
                  style={{ marginBottom: '0' }}
                >
                  <Checkbox.Group style={{ width: '100%' }}>
                    {/* <Row>
                      <Col span={5}> */}
                    <Checkbox value="严重">
                      <span style={{ color: 'red' }}>严重</span>
                    </Checkbox>
                    {/* </Col>
                      <Col span={5}> */}
                    <Checkbox value="偏重">
                      <span style={{ color: 'orange' }}>偏重</span>
                    </Checkbox>
                    {/* </Col>
                      <Col span={5}> */}
                    <Checkbox value="中度">
                      <span
                        style={{
                          color: 'yellow',
                          textShadow: '0px 0px 2px #000',
                        }}
                      >
                        中度
                      </span>
                    </Checkbox>
                    {/* </Col>
                      <Col span={5}> */}
                    <Checkbox value="轻度">
                      <span
                        style={{
                          color: 'lime',
                          textShadow: '0px 0px 2px #000',
                        }}
                      >
                        轻度
                      </span>
                    </Checkbox>
                    {/* </Col>
                      <Col span={5}> */}
                    <Checkbox value="正常">
                      <span style={{ color: 'black' }}>正常</span>
                    </Checkbox>
                    {/* </Col>
                    </Row> */}
                  </Checkbox.Group>
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
              rowClassName={rowClassName}
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
