import { FC, useEffect, useState } from 'react';
import {
  Modal,
  Table,
  Button,
  Typography,
  Form,
  InputNumber,
  Input,
} from 'antd';
import { dictItemListState, Loading, connect, Dispatch } from 'umi';
import { DictType, DictItemType } from '../data';

interface DictItemModalProps {
  visible: boolean;
  dict?: DictType;
  dictitems: dictItemListState;
  dictItemListLoading: boolean;
  dispatch: Dispatch;
  closeHandler: () => void;
}

const DictItemModal: FC<DictItemModalProps> = (props) => {
  const {
    visible,
    dict,
    dictitems,
    dispatch,
    dictItemListLoading,
    closeHandler,
  } = props;
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record: DictItemType) => record.id === editingKey;

  useEffect(() => {
    if (visible) {
      dispatch({
        type: 'dictitems/fetchList',
        payload: {
          dictCode: dict?.code,
        },
      });
      setEditingKey('');
    }
  }, [visible]);

  interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'text';
    record: DictItemType;
    index: number;
    children: React.ReactNode;
  }

  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const columns = [
    {
      title: '标签',
      dataIndex: 'label',
      key: 'label',
      width: 150,
      editable: true,
    },
    {
      title: '值',
      dataIndex: 'value',
      key: 'value',
      width: 150,
      editable: true,
    },
    {
      title: '顺序',
      dataIndex: 'order',
      key: 'order',
      width: 100,
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_: any, record: DictItemType) => {
        // console.log('rrr', record);
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record)}
              style={{ marginRight: 8 }}
            >
              保存
            </Typography.Link>
            <a onClick={() => cancel(record)}>取消</a>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
          >
            编辑
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DictItemType) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  // 保存
  const save = async (record: DictItemType) => {
    try {
      const row = (await form.validateFields()) as DictItemType;

      // console.log('rr', row);
      if (editingKey === 'new') {
        dispatch({
          type: 'dictitems/fetchAdd',
          payload: {
            values: {
              ...row,
              code: dict?.code,
            },
          },
        });
      } else {
        dispatch({
          type: 'dictitems/fetchUpdate',
          payload: {
            values: {
              ...row,
              id: editingKey,
              code: dict?.code,
            },
          },
        });
      }
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const cancel = async (record: DictItemType) => {
    if (editingKey === 'new') {
      dispatch({
        type: 'dictitems/removeBlank',
        payload: {},
      });
    }
    setEditingKey('');
  };

  const edit = (record: DictItemType) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const handleAdd = () => {
    dispatch({
      type: 'dictitems/addBlank',
      payload: {},
    });
    // console.log('ll', dictitems.list);
    form.resetFields();
    setEditingKey('new');
  };

  return (
    <div>
      <Modal
        title={'字典项-' + dict?.name}
        maskClosable={false}
        centered
        forceRender
        visible={visible}
        onOk={closeHandler}
        onCancel={closeHandler}
        bodyStyle={{
          height: 400,
          overflow: 'auto',
        }}
      >
        <Button
          disabled={editingKey !== ''}
          onClick={handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          添加
        </Button>
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            loading={dictItemListLoading}
            dataSource={dictitems.list}
            rowKey="id"
            pagination={false}
            columns={mergedColumns}
          />
        </Form>
      </Modal>
    </div>
  );
};

const mapStateToProps = ({
  dictitems,
  loading,
}: {
  dictitems: dictItemListState;
  loading: Loading;
}) => {
  return {
    dictitems,
    dictItemListLoading: loading.models.dictitems,
  };
};

export default connect(mapStateToProps)(DictItemModal);
