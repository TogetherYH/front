import { FC, useState } from 'react';
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Space,
  Button,
  Table,
  Pagination,
} from 'antd';
import { dictListState, Loading, connect, Dispatch } from 'umi';
import DictModal from './components/DictModal';
import DictItemModal from './components/DictItemModal';
import { FormValues, DictType } from './data';

interface DictProps {
  dicts: dictListState;
  dispatch: Dispatch;
  dictListLoading: boolean;
}

const Dict: FC<DictProps> = (props) => {
  const { dicts, dispatch, dictListLoading } = props;
  const [record, setRecord] = useState<DictType>();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [dictModalVisible, setDictModalVisible] = useState(false);
  const [searchForm] = Form.useForm();

  const [dictItemModalVisible, setDictItemModalVisible] = useState(false);

  const columns = [
    {
      title: '字典名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '字典编码',
      dataIndex: 'code',
      key: 'code',
      width: 200,
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
      render: (text: string, record: any) => (
        <Space size="middle">
          <a
            onClick={() => {
              editHandler(record);
            }}
          >
            修改
          </a>
          <a
            onClick={() => {
              itemHandler(record);
            }}
          >
            字典项
          </a>
        </Space>
      ),
    },
  ];

  // 分页
  const paginationHandler = (pageNum: number, pageSize: number | undefined) => {
    dispatch({
      type: 'users/fetchList',
      payload: {
        name: searchForm.getFieldValue('name'),
        code: searchForm.getFieldValue('code'),
        pageNum,
        pageSize,
      },
    });
  };

  // 搜索
  const searchHandler = () => {
    dispatch({
      type: 'dicts/fetchList',
      payload: {
        name: searchForm.getFieldValue('name'),
        code: searchForm.getFieldValue('code'),
        pageNum: 1,
        pageSize: dicts?.pageSize,
      },
    });
  };

  // 打开添加Modal
  const addHandler = () => {
    setRecord(undefined);
    setDictModalVisible(true);
  };

  // 关闭添加Modal
  const closeDictModalHandler = () => {
    setDictModalVisible(false);
  };

  // 打开编辑modal
  const editHandler = (record: DictType) => {
    setRecord(record);
    setDictModalVisible(true);
  };

  // 打开字典项编辑Modal
  const itemHandler = (record: DictType) => {
    setRecord(record);
    setDictItemModalVisible(true);
  };

  const closeDictItemModalHandler = () => {
    setDictItemModalVisible(false);
  };

  // 添加、更新处理方法
  const onFinish = (values: FormValues) => {
    // console.log('finish');
    // console.log('form on finish');
    setConfirmLoading(true);
    values = {
      ...values,
      status: values.status ? '1' : '0',
    };
    let id = '';
    if (record) {
      id = record.id;
    }
    if (id) {
      dispatch({
        type: 'dicts/fetchUpdate',
        payload: {
          id,
          values,
        },
      });
    } else {
      dispatch({
        type: 'dicts/fetchAdd',
        payload: {
          values,
        },
      });
    }
    // 关闭modal
    setDictModalVisible(false);
    setConfirmLoading(false);
  };

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card>
          <Row gutter={24}>
            <Col span={18}>
              <Form form={searchForm} layout="inline">
                <Form.Item
                  label="字典名称"
                  name="name"
                  style={{ marginBottom: '0' }}
                >
                  <Input allowClear />
                </Form.Item>
                <Form.Item
                  label="字典编码"
                  name="code"
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
                {/* <Button onClick={uploadHandler}>导入</Button>
                <Button onClick={refreshHandler}>刷新</Button> */}
              </Space>
            </Col>
          </Row>
        </Card>
        <Card>
          <Table
            columns={columns}
            dataSource={dicts?.list}
            rowKey="id"
            loading={dictListLoading}
            pagination={false}
            size="middle"
            scroll={{ y: 600 }}
          />
          <Pagination
            style={{ marginTop: '10px', textAlign: 'right' }}
            total={dicts?.total}
            size="small"
            onChange={paginationHandler}
            current={dicts?.pageNum}
            defaultPageSize={20}
            pageSizeOptions={['10', '20', '50', '100']}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `共 ${total} 条记录`}
          />
        </Card>
        <DictModal
          visible={dictModalVisible}
          record={record}
          closeHandler={closeDictModalHandler}
          onFinish={onFinish}
        />
        <DictItemModal
          visible={dictItemModalVisible}
          dict={record}
          closeHandler={closeDictItemModalHandler}
        />
      </Space>
    </div>
  );
};

const mapStateToProps = ({
  dicts,
  loading,
}: {
  dicts: dictListState;
  loading: Loading;
}) => {
  return {
    dicts,
    dictListLoading: loading.models.dicts,
  };
};

export default connect(mapStateToProps)(Dict);
