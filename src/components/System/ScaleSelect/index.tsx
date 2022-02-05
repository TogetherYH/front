import { FC, useState, useEffect } from 'react';
import { Modal, Tree } from 'antd';
import { connect, Dispatch, scaleTreeState } from 'umi';
import type { TreeProps, TreeNodeProps } from 'rc-tree';
import { Key } from 'rc-tree/lib/interface';
// import { BasicDataNode } from 'rc-tree-select/node_modules/rc-tree/lib/interface';
// import BasicDataNode from 'antd';

interface ScaleSelectProps {
  isModalVisible: boolean;
  defaultChecked: string[];
  scaleTree: scaleTreeState;
  dispatch: Dispatch;
  handleOk: (checkedNodes: any[]) => void;
  handleCancel: () => void;
}

const ScaleSelect: FC<ScaleSelectProps> = (props) => {
  const {
    isModalVisible,
    scaleTree,
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
          type: 'scaleTree/fetchTree',
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
        title="选择量表"
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
          treeData={scaleTree?.tree}
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

function mapStateToProps({ scaleTree }: { scaleTree: scaleTreeState }) {
  return { scaleTree };
}

export default connect(mapStateToProps)(ScaleSelect);
