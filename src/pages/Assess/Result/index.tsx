import { FC, useState, useEffect, useRef } from 'react';
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
  Modal,
  Progress,
  TreeSelect,
  DatePicker,
} from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;
import {
  resultListState,
  zipProgressState,
  Loading,
  connect,
  Dispatch,
  deptTreeState,
  publishListState,
} from 'umi';
import moment from 'moment';
import { ResultType } from './data';
import { report, zip } from './service';
import ResultView from './components/ResultView';
import './index.css';

interface ResultProps {
  results: resultListState;
  deptTree: deptTreeState;
  publishSelect: any[];
  zipProgress: zipProgressState;
  resultListLoading: boolean;
  dispatch: Dispatch;
}

const Result: FC<ResultProps> = ({
  results,
  deptTree,
  publishSelect,
  zipProgress,
  dispatch,
  resultListLoading,
}) => {
  const [searchForm] = Form.useForm();
  const [resultId, setResultId] = useState<string>();
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [zipping, setZipping] = useState(false);
  // const [timerId, setTimerId] = useState<number | null>(123);
  const timerId = useRef<any>(null);

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
        </Space>
      ),
    },
  ];

  // 分页
  const paginationHandler = (pageNum: number, pageSize: number | undefined) => {
    const formValues = searchForm.getFieldsValue();
    dispatch({
      type: 'results/fetchList',
      payload: {
        ...formValues,
        startDate: formValues.startDate
          ? moment(formValues.startDate[0])?.utcOffset(8).format('YYYY-MM-DD')
          : '',
        endDate: formValues.startDate
          ? moment(formValues.startDate[1])?.utcOffset(8).format('YYYY-MM-DD')
          : '',
        pageNum,
        pageSize,
      },
    });
  };

  // 搜索
  const searchHandler = () => {
    const formValues = searchForm.getFieldsValue();
    dispatch({
      type: 'results/fetchList',
      payload: {
        ...formValues,
        startDate: formValues.startDate
          ? moment(formValues.startDate[0])?.utcOffset(8).format('YYYY-MM-DD')
          : '',
        endDate: formValues.startDate
          ? moment(formValues.startDate[1])?.utcOffset(8).format('YYYY-MM-DD')
          : '',
        pageNum: 1,
        pageSize: results?.pageSize ? results.pageSize : 20,
      },
    });
  };

  // 刷新
  const refreshHandler = () => {
    const formValues = searchForm.getFieldsValue();
    dispatch({
      type: 'results/fetchList',
      payload: {
        ...formValues,
        startDate: formValues.startDate
          ? moment(formValues.startDate[0])?.utcOffset(8).format('YYYY-MM-DD')
          : '',
        endDate: formValues.startDate
          ? moment(formValues.startDate[1])?.utcOffset(8).format('YYYY-MM-DD')
          : '',
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
      fileName: `${record.username}_${record.realName}_${record.scaleName}_${record.startTime}.docx`,
      callBack: setDownloading,
    });
  };

  const zipFinish = (f: boolean) => {
    if (timerId) {
      window.clearInterval(timerId.current);
    }

    setZipping(f);
  };

  const zipHandler = () => {
    setZipping(true);
    dispatch({
      type: 'zipProgress/resetProgress',
      payload: {
        zipProgress: {
          current: 0,
          total: 100,
          stet: '',
        },
      },
    });
    timerId.current = window.setInterval(() => {
      dispatch({
        type: 'zipProgress/fetchProgress',
        payload: {},
      });
    }, 1000);
    const formValues = searchForm.getFieldsValue();
    zip({
      fileName: '测评结果.zip',
      ...formValues,
      startDate: formValues.startDate
        ? moment(formValues.startDate[0])?.utcOffset(8).format('YYYY-MM-DD')
        : '',
      endDate: formValues.startDate
        ? moment(formValues.startDate[1])?.utcOffset(8).format('YYYY-MM-DD')
        : '',
      callBack: zipFinish,
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
          <Row gutter={24} align="middle">
            <Col span={18}>
              <Form
                form={searchForm}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
              >
                <Row gutter={12}>
                  <Col span={10}>
                    <Form.Item
                      label="量表"
                      name="scaleName"
                      style={{ marginBottom: '0' }}
                    >
                      <Input allowClear />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item label="账号/姓名" name="username">
                      <Input allowClear />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={12}>
                  <Col span={10}>
                    <Form.Item label="单位" name="deptId">
                      <TreeSelect
                        multiple={true}
                        treeData={deptTree?.tree}
                        fieldNames={{ label: 'name', value: 'id' }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        allowClear
                      />
                    </Form.Item>
                  </Col>

                  <Col span={11}>
                    <Form.Item label="发布主题" name="publishId">
                      <Select
                        allowClear
                        // style={{ width: '100%' }}
                        // placeholder="Please select"
                        fieldNames={{ label: 'subject', value: 'id' }}
                        options={publishSelect}
                        optionLabelProp={'subject'}
                        onSelect={() => {}}
                        // value={user?.roleIds}
                      ></Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={12}>
                  <Col span={10}>
                    <Form.Item label="日期范围" name="startDate">
                      <RangePicker style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item label="预警" name="warningLevel">
                      <Checkbox.Group style={{ width: '100%' }}>
                        <Checkbox value="严重">
                          <span style={{ color: 'red' }}>严重</span>
                        </Checkbox>
                        <Checkbox value="偏重">
                          <span style={{ color: 'orange' }}>偏重</span>
                        </Checkbox>
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
                        <Checkbox value="正常">
                          <span style={{ color: 'black' }}>正常</span>
                        </Checkbox>
                      </Checkbox.Group>
                    </Form.Item>
                  </Col>
                </Row>
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
      <Modal visible={zipping} footer={null} closable={false} centered>
        <Progress
          percent={(zipProgress?.current * 100) / zipProgress?.total}
          format={() => {
            let a = (zipProgress?.current / zipProgress?.total) * 100;
            return `${a.toFixed()}%`;
          }}
        ></Progress>
        {zipProgress.step}
      </Modal>
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
  deptTree,
  publishs,
  loading,
  zipProgress,
}: {
  results: resultListState;
  deptTree: deptTreeState;
  publishs: publishListState;
  loading: Loading;
  zipProgress: zipProgressState;
}) => {
  var publishSelect: any[] = [];

  publishs?.list?.map((p) => {
    const ps = { id: p.id, subject: p.subject };
    publishSelect.push(ps);
  });

  return {
    results,
    deptTree,
    publishSelect,
    resultListLoading: loading.models.results,
    zipProgress,
  };
};

export default connect(mapStateToProps)(Result);
