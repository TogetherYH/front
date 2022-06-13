import { FC, useState, useRef } from 'react';
import {
  TreeSelect,
  Space,
  Form,
  Button,
  Card,
  Select,
  Progress,
  Row,
  Col,
  DatePicker,
} from 'antd';
const { RangePicker } = DatePicker;
import {
  connect,
  Dispatch,
  Loading,
  scaleTreeState,
  publishListState,
  deptTreeState,
  groupProgressState,
} from 'umi';
import moment from 'moment';
import { exp } from './service';
const { Option } = Select;

interface GroupReportProps {
  // scaleTree: scaleTreeState;
  publishs: publishListState;
  publishSelect: any[];
  deptTree: deptTreeState;
  groupProgress: groupProgressState;
  listLoading: boolean;
  dispatch: Dispatch;
}

const GroupReportProps: FC<GroupReportProps> = (prop) => {
  const {
    // scaleTree,
    publishs,
    deptTree,
    publishSelect,
    groupProgress,
    dispatch,
    listLoading,
  } = prop;

  const [searchForm] = Form.useForm();
  const [exporting, setExporting] = useState(false);
  const timerId = useRef<any>(null);

  const onFinish = (values: any) => {};

  const expFinish = (f: boolean) => {
    if (timerId) {
      window.clearInterval(timerId.current);
    }

    setExporting(f);
  };

  const expHandler = () => {
    setExporting(true);
    const formValues = searchForm.getFieldsValue();
    // console.log('a', a);
    dispatch({
      type: 'groupProgress/resetProgress',
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
        type: 'groupProgress/fetchProgress',
        payload: {},
      });
    }, 1000);
    exp({
      param: {
        ...formValues,
        startDate: formValues.startDate
          ? moment(formValues.startDate[0])?.utcOffset(8).format('YYYY-MM-DD')
          : '',
        endDate: formValues.startDate
          ? moment(formValues.startDate[1])?.utcOffset(8).format('YYYY-MM-DD')
          : '',
      },
      fileName: `团体报告.docx`,
      callBack: expFinish,
    });
  };

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card>
          <Row gutter={24} align="middle">
            <Col span={18}>
              <Form
                form={searchForm}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                onFinish={onFinish}
              >
                <Row gutter={12}>
                  <Col span={9}>
                    <Form.Item label="量表" name="scaleId">
                      {/* <TreeSelect
                        // multiple={true}
                        treeData={scaleTree?.tree}
                        // treeDefaultExpandedKeys={[record?.id]}
                        fieldNames={{ label: 'name', value: 'id' }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        allowClear
                      /> */}
                      <Select>
                        <Option value="46ec25de-758d-4d7b-b2d1-d07f1b7e69c0">
                          90项症状清单
                        </Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={12}>
                  <Col span={9}>
                    <Form.Item label="日期范围" name="startDate">
                      <RangePicker style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={12}>
                  <Col span={9}>
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
                </Row>
                <Row gutter={12}>
                  <Col span={9}>
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
                  <Col span={9}>
                    <Form.Item label=" " colon={false}>
                      <Space>
                        <Button
                          type="primary"
                          onClick={expHandler}
                          disabled={exporting ? true : false}
                        >
                          导出
                        </Button>
                      </Space>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={12}>
                  <Col></Col>
                </Row>
                <Row
                  gutter={12}
                  style={{
                    display: exporting ? 'block' : 'none',
                    width: '50%',
                  }}
                >
                  <Progress
                    percent={
                      (groupProgress?.current * 100) / groupProgress?.total
                    }
                    format={() => {
                      let a =
                        (groupProgress?.current / groupProgress?.total) * 100;
                      return `${a.toFixed()}%`;
                    }}
                  ></Progress>
                  {groupProgress.step}
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>
      </Space>
    </div>
  );
};

const mapStateToProps = ({
  // scaleTree,
  publishs,
  deptTree,
  loading,
  groupProgress,
}: {
  // scaleTree: scaleTreeState;
  publishs: publishListState;
  deptTree: deptTreeState;
  loading: Loading;
  groupProgress: groupProgressState;
}) => {
  var publishSelect: any[] = [];

  publishs?.list?.map((p) => {
    const ps = { id: p.id, subject: p.subject };
    publishSelect.push(ps);
  });

  return {
    // scaleTree,
    publishSelect,
    deptTree,
    listLoading: loading.models.groupProgress,
    groupProgress,
  };
};

export default connect(mapStateToProps)(GroupReportProps);
