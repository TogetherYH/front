import { FC, useState, useEffect } from 'react';
import { Modal, Tree } from 'antd';
import { connect, Dispatch, scaleTreeState } from 'umi';

interface ScaleSelectProps {
  isModalVisible: boolean;
  defaultChecked: string[];
  scaleTree: scaleTreeState;
  dispatch: Dispatch;
  handleOk: (checkedKeys: string[]) => void;
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
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

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

  const onCheck = ({ checked }: { checked: React.Key[] }) => {
    setCheckedKeys(checked);
  };

  const onOk = () => {
    handleOk(checkedKeys);
  };

  return (
    <div>
      <Modal
        title="选择量表"
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
