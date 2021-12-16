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
  Tree,
} from 'antd';
import { connect, Dispatch, Loading, deptState } from 'umi';
import { SingleDeptType, FormValues } from './data';
import DeptModal from './components/DeptModal';

interface DeptProps {
  depts: deptState;
  dispatch: Dispatch;
  deptListLoading: boolean;
}

const Dept: FC<DeptProps> = ({ depts, dispatch, deptListLoading }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [record, setRecord] = useState<SingleDeptType | undefined>(undefined);
  const [searchForm] = Form.useForm();

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 400,
    },
    {
      title: '编号',
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
      render: (text: string, record: SingleDeptType) => (
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
              confirm(record);
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

  const confirm = (record: SingleDeptType) => {
    setRecord(record);
    const id = record.id;
    dispatch({
      type: 'depts/del',
      payload: { id },
    });
  };

  const editHandler = (record: SingleDeptType) => {
    setRecord(record);
    // console.log('rrr', record);
    setModalVisible(true);
  };

  const closeHandler = () => {
    setModalVisible(false);
  };

  const onFinish = (values: FormValues) => {
    // console.log('form on finish');
    setConfirmLoading(true);
    let id = '';
    if (record) {
      id = record.id;
    }
    if (id) {
      dispatch({
        type: 'depts/edit',
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
        type: 'depts/add',
        payload: {
          values: {
            ...values,
            status: values.status ? '1' : '0',
          },
        },
      });
    }

    setModalVisible(false);
    setConfirmLoading(false);
  };

  const addHandler = () => {
    setRecord(undefined);
    setModalVisible(true);
  };

  const refreshHandler = () => {
    dispatch({
      type: 'depts/getRemote',
      payload: {
        name: searchForm.getFieldValue('name'),
        pageNum: depts.pageNum,
        pageSize: depts.pageSize,
      },
    });
  };

  const paginationHandler = (pageNum: number, pageSize: number | undefined) => {
    dispatch({
      type: 'depts/getRemote',
      payload: {
        name: searchForm.getFieldValue('name'),
        pageNum,
        pageSize,
      },
    });
  };

  const searchHandler = () => {
    dispatch({
      type: 'depts/getRemote',
      payload: {
        name: searchForm.getFieldValue('name'),
        pageNum: depts.pageNum,
        pageSize: depts.pageSize,
      },
    });
  };

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card>
          <Space>
            <Form form={searchForm} layout="inline">
              <Form.Item
                label="部门名称"
                name="name"
                style={{ marginBottom: '0' }}
              >
                <Input allowClear />
              </Form.Item>
            </Form>
            <Button type="primary" onClick={searchHandler}>
              搜索
            </Button>
            <Button onClick={addHandler}>添加</Button>
            <Button onClick={refreshHandler}>刷新</Button>
          </Space>
        </Card>
        <Card>
          <Table
            columns={columns}
            dataSource={depts.list}
            rowKey="id"
            loading={deptListLoading}
            pagination={false}
            size="middle"
            // request={requestHandler}
          />
          <Pagination
            style={{ marginTop: '10px', textAlign: 'right' }}
            total={depts.total}
            size="small"
            onChange={paginationHandler}
            current={depts.pageNum}
            defaultPageSize={20}
            pageSizeOptions={['10', '20', '50', '100']}
            // onShowSizeChange={pageSizeHandler}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `共 ${total} 条记录`}
          />
        </Card>

        <DeptModal
          visible={modalVisible}
          closeHandler={closeHandler}
          onFinish={onFinish}
          record={record}
          confirmLoading={confirmLoading}
        />
      </Space>
    </div>
  );
};

const mapStateToProps = ({
  depts,
  loading,
}: {
  depts: deptState;
  loading: Loading;
}) => {
  // console.log('uuuuuuuuu', depts, loading);
  return {
    depts,
    deptListLoading: loading.models.depts,
  };
};

export default connect(mapStateToProps)(Dept);
