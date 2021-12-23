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
  Row,
  Col,
} from 'antd';
import { connect, Dispatch, Loading, menuState, menuTreeState } from 'umi';
import { MenuType, FormValues } from './data';
import MenuModal from './components/MenuModal';

interface MenuProps {
  menus: menuState;
  menuTree: menuTreeState;
  dispatch: Dispatch;
  menuListLoading: boolean;
}

const Menu: FC<MenuProps> = ({
  menus,
  menuTree,
  dispatch,
  menuListLoading,
}) => {
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [record, setRecord] = useState<MenuType | undefined>(undefined);
  const [searchForm] = Form.useForm();

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: '编号',
      dataIndex: 'code',
      key: 'code',
      width: 100,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 150,
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
      render: (text: string, record: MenuType) => (
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
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 分页
  const paginationHandler = (pageNum: number, pageSize: number | undefined) => {
    dispatch({
      type: 'menus/fetchList',
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
      type: 'menus/fetchList',
      payload: {
        name: searchForm.getFieldValue('name'),
        pageNum: 1,
        pageSize: menus.pageSize,
      },
    });
  };

  // 刷新
  const refreshHandler = () => {
    dispatch({
      type: 'menus/fetchList',
      payload: {
        name: searchForm.getFieldValue('name'),
        pageNum: menus.pageNum,
        pageSize: menus.pageSize,
      },
    });
    dispatch({
      type: 'menuTree/fetchTree',
      payload: {},
    });
  };

  // 打开添加modal
  const addHandler = () => {
    setRecord(undefined);
    setMenuModalVisible(true);
  };

  // 打开编辑modal
  const editHandler = (record: MenuType) => {
    setRecord(record);
    // console.log('rrr', record);
    setMenuModalVisible(true);
  };

  // 关闭modal
  const closeHandler = () => {
    setMenuModalVisible(false);
  };

  // 添加、更新处理方法
  const onFinish = (values: FormValues) => {
    // console.log('form on finish');
    setConfirmLoading(true);
    let id = '';
    if (record) {
      id = record.id;
    }
    if (id) {
      dispatch({
        type: 'menus/fetchUpdate',
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
        type: 'menus/fetchAdd',
        payload: {
          values: {
            ...values,
            status: values.status ? '1' : '0',
          },
        },
      });
    }

    // 关闭modal
    setMenuModalVisible(false);
    setConfirmLoading(false);
  };

  // 删除
  const deleteHandler = (record: MenuType) => {
    setRecord(record);
    const id = record.id;
    dispatch({
      type: 'menus/fetchDelete',
      payload: { id },
    });
  };

  return (
    <div>
      <Row gutter={12}>
        <Col span={6}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Card>
              <Input.Search style={{ marginBottom: 8 }} placeholder="Search" />
              <Tree
                // showLine
                // onSelect={handleSelect}
                treeData={menuTree?.tree}
                fieldNames={{ title: 'name', key: 'id', children: 'children' }}
                // switcherIcon
                // defaultExpandedKeys={['asdf']}
                // selectedKeys={selectedKeys}
                // onExpand={onExpand}
              />
            </Card>
          </Space>
        </Col>
        <Col span={18}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Card>
              <Row gutter={24}>
                <Col span={18}>
                  <Form form={searchForm} layout="inline">
                    <Form.Item
                      label="菜单名称"
                      name="name"
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
                dataSource={menus?.list}
                rowKey="id"
                loading={menuListLoading}
                pagination={false}
                size="middle"
                // request={requestHandler}
              />
              <Pagination
                style={{ marginTop: '10px', textAlign: 'right' }}
                total={menus?.total}
                size="small"
                onChange={paginationHandler}
                current={menus?.pageNum}
                defaultPageSize={20}
                pageSizeOptions={['10', '20', '50', '100']}
                // onShowSizeChange={pageSizeHandler}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `共 ${total} 条记录`}
              />
            </Card>
          </Space>
        </Col>
      </Row>
      <MenuModal
        visible={menuModalVisible}
        closeHandler={closeHandler}
        onFinish={onFinish}
        record={record}
        menuTree={menuTree}
        confirmLoading={confirmLoading}
      />
    </div>
  );
};

const mapStateToProps = ({
  menus,
  menuTree,
  loading,
}: {
  menus: menuState;
  menuTree: menuTreeState;
  loading: Loading;
}) => {
  // console.log('uuuuuuuuu', menus);
  // console.log('uuuuuuuuu2', menuTree);
  return {
    menus,
    menuTree,
    menuListLoading: loading.models.menus,
  };
};

export default connect(mapStateToProps)(Menu);
