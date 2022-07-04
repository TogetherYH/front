import { FC, useState, useRef, useEffect } from 'react';
import {
  TreeSelect,
  Space,
  Form,
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
import { VariableSizeGrid as Grid } from 'react-window';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import moment from 'moment';
import { exp } from './service';

interface OriginalExpProps {
  scaleTree: scaleTreeState;
  publishs: publishListState;
  publishSelect: any[];
  deptTree: deptTreeState;
  original: originalState;
  listLoading: boolean;
  dispatch: Dispatch;
}

const OriginalExp: FC<OriginalExpProps> = (prop) => {
  const {
    scaleTree,
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

  const VirtualTable = (props: Parameters<typeof Table>[0]) => {
    const { columns, scroll } = props;
    const [tableWidth, setTableWidth] = useState(0);

    console.log('tableWidth', tableWidth);

    const widthColumnCount = columns!.filter(({ width }) => !width).length;
    const mergedColumns = columns!.map((column) => {
      if (column.width) {
        return column;
      }

      return {
        ...column,
        width: Math.floor(tableWidth / widthColumnCount),
      };
    });

    const gridRef = useRef<any>();
    const [connectObject] = useState<any>(() => {
      const obj = {};
      Object.defineProperty(obj, 'scrollLeft', {
        get: () => null,
        set: (scrollLeft: number) => {
          if (gridRef.current) {
            gridRef.current.scrollTo({ scrollLeft });
          }
        },
      });

      return obj;
    });

    const resetVirtualGrid = () => {
      if (gridRef.current) {
        gridRef.current.resetAfterIndices({
          columnIndex: 0,
          shouldForceUpdate: true,
        });
      }
    };

    useEffect(() => resetVirtualGrid, [tableWidth]);

    const renderVirtualList = (
      rawData: object[],
      { scrollbarSize, ref, onScroll }: any,
    ) => {
      ref.current = connectObject;
      const totalHeight = rawData.length * 54;

      return (
        <Grid
          ref={gridRef}
          className="virtual-grid"
          columnCount={mergedColumns.length}
          columnWidth={(index: number) => {
            const { width } = mergedColumns[index];
            return totalHeight > scroll!.y! &&
              index === mergedColumns.length - 1
              ? (width as number) - scrollbarSize - 1
              : (width as number);
          }}
          height={scroll!.y as number}
          rowCount={rawData.length}
          rowHeight={() => 54}
          width={tableWidth}
          onScroll={({ scrollLeft }: { scrollLeft: number }) => {
            onScroll({ scrollLeft });
          }}
        >
          {({
            columnIndex,
            rowIndex,
            style,
          }: {
            columnIndex: number;
            rowIndex: number;
            style: React.CSSProperties;
          }) => (
            <div
              className={classNames('virtual-table-cell', {
                'virtual-table-cell-last':
                  columnIndex === mergedColumns.length - 1,
              })}
              style={{
                ...style,
                padding: '16px',
                borderBottom: '1px solid #e8e8e8',
              }}
            >
              {
                (rawData[rowIndex] as any)[
                  (mergedColumns as any)[columnIndex].dataIndex
                ]
              }
            </div>
          )}
        </Grid>
      );
    };

    return (
      <ResizeObserver
        onResize={({ width }) => {
          console.log('ww', width);
          setTableWidth(width);
        }}
      >
        <Table
          {...props}
          className="virtual-table"
          columns={mergedColumns}
          pagination={false}
          components={{
            body: renderVirtualList,
          }}
        />
      </ResizeObserver>
    );
  };

  const onFinish = (values: any) => {
    // console.log('form on finish');
    // console.log(values);

    dispatch({
      type: 'original/fetchSearch',
      payload: {
        ...values,
        startDate: values.startDate
          ? moment(values.startDate[0])?.utcOffset(8).format('YYYY-MM-DD')
          : '',
        endDate: values.startDate
          ? moment(values.startDate[1])?.utcOffset(8).format('YYYY-MM-DD')
          : '',
      },
    });
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
      fileName: `原始数据导出.xlsx`,
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
                      <TreeSelect
                        // multiple={true}
                        treeData={scaleTree?.tree}
                        // treeDefaultExpandedKeys={[record?.id]}
                        fieldNames={{ label: 'name', value: 'id' }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        allowClear
                      />
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
        <Card>
          <Spin spinning={exporting}>
            {/* <Table
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
            ></Table> */}
            <VirtualTable
              columns={original.columns ? original.columns : [{ width: 80 }]}
              size="small"
              loading={listLoading}
              dataSource={original.list ? original.list : []}
              rowKey="resultId"
              scroll={{
                x: original.columns?.length
                  ? original.columns?.length * 80
                  : 2000,
                y: 600,
              }}
            />
          </Spin>
        </Card>
      </Space>
    </div>
  );
};

const mapStateToProps = ({
  scaleTree,
  publishs,
  deptTree,
  original,
  loading,
}: {
  scaleTree: scaleTreeState;
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
    scaleTree,
    publishSelect,
    deptTree,
    original,
    listLoading: loading.models.original,
  };
};

export default connect(mapStateToProps)(OriginalExp);
