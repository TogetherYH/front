import React, { FC, useEffect, useState } from 'react';
import { Modal, Tree } from 'antd';
import { connect, Dispatch, roleMenuState, menuTreeState, Loading } from 'umi';

interface RoleMenuModalProps {
  visible: boolean;
  roleId: string;
  roleMenu: roleMenuState;
  menuTree: menuTreeState;
  dispatch?: Dispatch;
  closeRoleMenuModal: () => void;
}

const RoleMenuModal: FC<RoleMenuModalProps> = (props) => {
  const { visible, roleId, dispatch, roleMenu, menuTree, closeRoleMenuModal } =
    props;

  useEffect(() => {
    if (roleId !== '' && dispatch) {
      dispatch({
        type: 'roleMenu/fetchList',
        payload: { roleId },
      });
    }
  }, [visible]);

  const onOk = () => {
    if (dispatch) {
      dispatch({
        type: 'roleMenu/fetchUpdate',
        payload: {
          ...roleMenu,
        },
      });
    }
    closeRoleMenuModal();
  };

  // 选择节点
  const checkMenuHandler = (
    {
      checked,
      halfChecked,
    }: { checked: React.Key[]; halfChecked: React.Key[] },
    info: any,
  ) => {
    if (dispatch) {
      dispatch({
        type: 'roleMenu/update',
        payload: {
          roleId,
          menuIds: checked,
        },
      });
    }
  };

  return (
    <div>
      <Modal
        title="菜单权限"
        maskClosable={false}
        centered
        forceRender
        visible={visible}
        onOk={onOk}
        onCancel={closeRoleMenuModal}
      >
        <Tree
          // showLine
          checkable
          selectable={false}
          treeData={menuTree?.tree}
          checkedKeys={roleMenu.menuIds}
          checkStrictly
          onCheck={checkMenuHandler}
          fieldNames={{ title: 'name', key: 'id', children: 'children' }}
          style={{ height: 300 }}
          // switcherIcon
          // defaultExpandedKeys={['asdf']}
          // selectedKeys={selectedKeys}
          // onExpand={onExpand}
        />
      </Modal>
    </div>
  );
};

const mapStateToProps = ({
  roleMenu,
  loading,
}: {
  roleMenu: roleMenuState;
  loading: Loading;
}) => {
  return {
    roleMenu,
    roleListLoading: loading.models.roleMenu,
  };
};

export default connect(mapStateToProps)(RoleMenuModal);
