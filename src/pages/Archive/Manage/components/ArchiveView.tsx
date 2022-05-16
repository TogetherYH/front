import { FC, useEffect } from 'react';
import { Modal, Collapse, Skeleton, Descriptions, Table, Space } from 'antd';
const { Panel } = Collapse;
import { Bullet, Column, Line } from '@ant-design/plots/es';
// import Line from '@ant-design/charts/es/plots/line';
import { Dispatch, archiveState, connect, Loading } from 'umi';
import { valueToLabel } from '@/utils/dict';
import UserInfo from '../../Edit/UserInfo';

interface ArchiveViewProps {
  visible: boolean;
  archiveId?: string;
  archive: archiveState;
  loading: boolean;
  closeHandler: () => void;
  dispatch?: Dispatch;
}

const ArchiveView: FC<ArchiveViewProps> = (props) => {
  const { visible, archiveId, archive, loading, closeHandler, dispatch } =
    props;

  useEffect(() => {
    // if (visible && archiveId) {
    //   if (dispatch) {
    //     dispatch({
    //       type: 'archive/fetchView',
    //       payload: {
    //         archiveId,
    //       },
    //     });
    //   }
    // }
    // if (!visible) {
    //   if (dispatch) {
    //     dispatch({
    //       type: 'archive/clear',
    //       payload: {
    //         archiveId,
    //       },
    //     });
    //   }
    // }
  }, [visible]);

  return (
    <>
      <Modal
        title="查看档案"
        maskClosable={false}
        centered
        forceRender
        width={1000}
        bodyStyle={{ height: 600, overflowY: 'auto' }}
        // style={{ overflowY: 'auto', height: 700 }}
        visible={visible}
        // onOk={onOk}
        onCancel={closeHandler}
        // confirmLoading={confirmLoading}
      >
        <Collapse
          bordered={false}
          defaultActiveKey={[
            'userInfo',
            'raiseInfo',
            // 'assessTime',
            // 'assessResult',
            // 'assessConclusion',
          ]}
        >
          <Panel
            header="用户基本信息"
            key="userInfo"
            className="site-collapse-custom-panel"
          >
            <Skeleton loading={loading}>
              <UserInfo visible={visible} userId={archiveId} />
            </Skeleton>
          </Panel>
          <Panel
            header="成长经历"
            key="raiseInfo"
            className="site-collapse-custom-panel"
          >
            <Skeleton loading={loading}></Skeleton>
          </Panel>
        </Collapse>
      </Modal>
    </>
  );
};

const mapStateToProps = ({
  archive,
  loading,
}: {
  archive: archiveState;
  loading: Loading;
}) => {
  return {
    archive,
    loading: loading.models.archive,
  };
};

export default connect(mapStateToProps)(ArchiveView);
