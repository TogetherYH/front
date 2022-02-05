import { FC, useState, useEffect } from 'react';
import { Modal, Tree } from 'antd';
import { connect, Dispatch, deptTreeState } from 'umi';
import { Key } from 'rc-tree/lib/interface';

interface DeptSelectProps {
  isModalVisible: boolean;
  defaultChecked: string[];
  deptTree: deptTreeState;
  dispatch: Dispatch;
  handleOk: (checkedNodes: any[]) => void;
  handleCancel: () => void;
}

const DeptSelect: FC<DeptSelectProps> = (props) => {
  const {
    isModalVisible,
    deptTree,
    defaultChecked,
    dispatch,
    handleOk,
    handleCancel,
  } = props;

  const [checkedKeys, setCheckedKeys] = useState<Key[]>([]);
  const [checkedNodes, setCheckedNodes] = useState<Key[]>([]);

  useEffect(() => {
    // 打开对话框
    if (isModalVisible) {
      setCheckedKeys(defaultChecked);
      if (dispatch) {
        dispatch({
          type: 'deptTree/fetchTree',
          payload: {},
        });
      }
    }
  }, [isModalVisible]);

  const onCheck = (checkedKeys: React.Key[], info: any) => {
    setCheckedKeys(checkedKeys);
    setCheckedNodes(info.checkedNodes);
    // console.log('onCheck', checkedKeys, info);
  };

  const onOk = () => {
    handleOk(checkedNodes);
  };

  return (
    <div>
      <Modal
        title="选择部门"
        centered
        visible={isModalVisible}
        onOk={onOk}
        onCancel={handleCancel}
      >
        <Tree
          checkable
          checkStrictly
          onCheck={onCheck}
          // showLine
          // onSelect={handleSelect}
          treeData={deptTree?.tree}
          fieldNames={{ title: 'name', key: 'id', children: 'children' }}
          // switcherIcon
          // defaultExpandedKeys={['asdf']}
          checkedKeys={checkedKeys}
          style={{ height: 400 }}
          // onExpand={onExpand}
        />
      </Modal>
    </div>
  );
};

function mapStateToProps({ deptTree }: { deptTree: deptTreeState }) {
  return { deptTree };
}

export default connect(mapStateToProps)(DeptSelect);
