import { FC, useState } from 'react';
import {
  TreeSelect,
  Space,
  Form,
  Input,
  Button,
  Card,
  Select,
  Table,
  Row,
  Col,
  DatePicker,
  // Icon,
  Spin,
} from 'antd';
const { RangePicker } = DatePicker;
import {
  connect,
  Dispatch,
  Loading,
  scaleTreeState,
  publishListState,
  deptTreeState,
  originalState,
} from 'umi';
import moment from 'moment';
import { exp } from './service';
const { Option } = Select;

interface GroupReportProps {
  // scaleTree: scaleTreeState;
  publishs: publishListState;
  publishSelect: any[];
  deptTree: deptTreeState;
  original: originalState;
  listLoading: boolean;
  dispatch: Dispatch;
}

const GroupReportProps: FC<GroupReportProps> = (prop) => {
  const {
    // scaleTree,
    publishs,
    deptTree,
    publishSelect,
    original,
    dispatch,
    listLoading,
  } = prop;

  const [searchForm] = Form.useForm();
  const [exporting, setExporting] = useState(false);

  const searchHandler = () => {
    searchForm.submit();
  };

  const onFinish = (values: any) => {
    // console.log('form on finish');
    // console.log(values);
    // dispatch({
    //   type: 'original/fetchSearch',
    //   payload: {
    //     ...values,
    //     startDate: values.startDate
    //       ? moment(values.startDate[0])?.utcOffset(8).format('YYYY-MM-DD')
    //       : '',
    //     endDate: values.startDate
    //       ? moment(values.startDate[1])?.utcOffset(8).format('YYYY-MM-DD')
    //       : '',
    //   },
    // });
  };

  // const setExporting = () => {

  // };

  const expHandler = () => {
    setExporting(true);
    const formValues = searchForm.getFieldsValue();
    // console.log('a', a);
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
      callBack: setExporting,
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
              </Form>
            </Col>
            <Col span={6}>
              <Space>
                <Button type="primary" onClick={searchHandler}>
                  搜索
                </Button>
                <Button onClick={expHandler}>导出</Button>
              </Space>
            </Col>
          </Row>
        </Card>
        {/* <Card>
          <Spin spinning={exporting}>
            <Table
              dataSource={original.list}
              columns={original.columns}
              size="small"
              loading={listLoading}
              scroll={{
                x: original?.columns?.length
                  ? original?.columns?.length * 80
                  : 2000,
                y: 800,
              }}
              rowKey="resultId"
              pagination={false}
            ></Table>
          </Spin>
        </Card> */}
      </Space>
    </div>
  );
};

const mapStateToProps = ({
  // scaleTree,
  publishs,
  deptTree,
  original,
  loading,
}: {
  // scaleTree: scaleTreeState;
  publishs: publishListState;
  deptTree: deptTreeState;
  original: originalState;
  loading: Loading;
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
    original,
    listLoading: loading.models.original,
  };
};

export default connect(mapStateToProps)(GroupReportProps);
