import { FC, useEffect, useState } from 'react';
import { Modal, Form, TreeSelect, Upload, Button, notification } from 'antd';
import { RcFile, UploadChangeParam, UploadProps } from 'antd/lib/upload';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { deptTreeState } from 'umi';
import { TOKEN_KEY, getToken } from '@/utils/token';
import { template } from '../service';

interface UserUploadModalProps {
  visible: boolean;
  deptTree: deptTreeState;
  closeUploadModal: () => void;
}

const UserUploadModal: FC<UserUploadModalProps> = (props) => {
  const { visible, closeUploadModal, deptTree } = props;
  const [fileList, setFileList] = useState<any[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.resetFields();
      setFileList([]);
    }
  }, [visible]);

  // 下载用户信息模板
  const downloadTemplate = () => {
    template();
  };

  const getExtraData: UploadProps['data'] = (file) => ({
    deptId: form.getFieldValue('deptId'),
  });

  // 上传组件参数
  const uploadProps = {
    name: 'file',
    action: '/api/system/user/import',
    headers: {
      [TOKEN_KEY]: getToken() || '',
    },
    data: getExtraData,
    fileList,
    accept: '.xls,.xlsx',
    beforeUpload: (file: RcFile) => {
      if (form.getFieldValue('deptId') === undefined) {
        notification.warn({
          message: `请选择要导入的部门`,
        });
        return false || Upload.LIST_IGNORE;
      }
      // console.log(file.type);
      const isXLS =
        file.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'application/vnd.ms-excel';
      if (!isXLS) {
        notification.warn({
          message: `只允许上传excel文件`,
        });
      }
      return isXLS || Upload.LIST_IGNORE;
    },
    onChange(info: UploadChangeParam) {
      let fileList = [...info.fileList];

      // 1. Limit the number of uploaded files
      // Only to show two recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-2);

      // 2. Read from response and show file link
      fileList = fileList.map((file) => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        return file;
      });

      setFileList(fileList);

      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        // console.log('ii', info);
        // if (info.file.response.status === '200') {
        notification.info({
          message: `${info.file.response.message}`,
        });
        // }
      } else if (info.file.status === 'error') {
        notification.error({
          message: `${info.file.name}上传失败`,
        });
      }
    },
  };

  return (
    <div>
      <Modal
        title="导入用户"
        maskClosable={false}
        centered
        forceRender
        visible={visible}
        onOk={closeUploadModal}
        onCancel={closeUploadModal}
        // confirmLoading={confirmLoading}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          autoComplete="off"
        >
          <Form.Item label="模板">
            <Button icon={<DownloadOutlined />} onClick={downloadTemplate}>
              下载
            </Button>
          </Form.Item>
          <Form.Item
            label="所属部门"
            name="deptId"
            rules={[{ required: true, message: '部门不能为空' }]}
          >
            <TreeSelect
              treeData={deptTree?.tree}
              // treeDefaultExpandedKeys={[user?.deptId]}
              fieldNames={{ label: 'name', value: 'id' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            />
          </Form.Item>
          <Form.Item label="选择文件">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>上传</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserUploadModal;
