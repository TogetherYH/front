import { FC, useState, useEffect } from 'react';
import {
  Table,
  Space,
  Button,
  Upload,
  Card,
  Typography,
  Input,
  Form,
  notification,
} from 'antd';
import { RcFile, UploadChangeParam, UploadProps } from 'antd/lib/upload';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { connect, Dispatch, Loading, customState } from 'umi';
import moment from 'moment';
import { TOKEN_KEY, getToken } from '@/utils/token';
import { template } from './service';

const { Title, Link } = Typography;

interface CustomProps {
  custom: customState;
  dispatch: Dispatch;
}

const Custom: FC<CustomProps> = ({ custom, dispatch }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [scale, setScale] = useState<any[]>();
  const [questionList, setQuestionList] = useState<any[]>();
  const [answerList, setAnswerList] = useState<any[]>();
  const [factorList, setFactorList] = useState<any[]>();
  const [factorQuestionList, setFactorQuestionList] = useState<any[]>();
  const [conclusionList, setConclusionList] = useState<any[]>();
  const [];

  const scaleColumns = [
    {
      title: '量表名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '量表编号',
      dataIndex: 'code',
      width: 200,
    },
  ];

  const questionColumns = [
    {
      title: '题目',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '题目编号',
      dataIndex: 'code',
      width: 200,
    },
    {
      title: '答案组编号',
      dataIndex: 'answerGroupCode',
      width: 200,
    },
    {
      title: '题目类型',
      dataIndex: 'type',
      width: 200,
    },
    {
      title: '序号',
      dataIndex: 'order',
      width: 200,
    },
  ];

  const answerColumns = [
    {
      title: '答案',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '答案组编号',
      dataIndex: 'groupCode',
      width: 200,
    },
    {
      title: '选项',
      dataIndex: 'option',
      width: 200,
    },
    {
      title: '序号',
      dataIndex: 'order',
      width: 200,
    },
  ];

  const factorColumns = [
    {
      title: '因子名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '均分',
      dataIndex: 'average',
      width: 200,
    },
    {
      title: '标准差',
      dataIndex: 'sd',
      width: 200,
    },
    {
      title: '序号',
      dataIndex: 'order',
      width: 200,
    },
    {
      title: '题目',
      dataIndex: 'questionList',
      width: 200,
    },
  ];

  const factorQuestionColumns = [
    {
      title: '因子序号',
      dataIndex: 'factorOrder',
      width: 200,
    },
    {
      title: '题目序号',
      dataIndex: 'questionOrder',
      width: 200,
    },
    {
      title: '答案组编号',
      dataIndex: 'answerGroupCode',
      width: 200,
    },
  ];

  const conclusionColumns = [
    {
      title: '表达式',
      dataIndex: 'expression',
      width: 500,
    },
    {
      title: '分析',
      dataIndex: 'analyse',
      width: 400,
    },
    {
      title: '建议',
      dataIndex: 'advise',
      width: 200,
    },
    {
      title: '序号',
      dataIndex: 'order',
      width: 200,
    },
  ];

  // 下载量表导入模板
  const downloadTemplate = () => {
    template();
  };

  // 上传组件参数
  const uploadProps = {
    name: 'file',
    action: '/api/base/custom/read',
    headers: {
      [TOKEN_KEY]: getToken() || '',
    },
    fileList,
    accept: '.xls,.xlsx',
    beforeUpload: (file: RcFile) => {
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
        console.log('info:', info.file.response);

        if (info.file.response.success === false) {
          notification.error({
            message: `${info.file.name}上传失败，请检查模板数据是否正确。错误信息：${info.file.response.message}`,
          });
        }

        if (info.file.response.code === 200) {
          // console.log('info1:', info.file.response);
          setScale(info.file.response.data.scale);
          setQuestionList(info.file.response.data.question);
          setAnswerList(info.file.response.data.answer);
          setFactorList(info.file.response.data.factor);
          setFactorQuestionList(info.file.response.data.factorQuestion);
          setConclusionList(info.file.response.data.conclusion);
        }
      } else if (info.file.status === 'error') {
        notification.error({
          message: `${info.file.name}上传失败`,
        });
      }
    },
  };

  const imp = () => {
    setFileList([]);
    dispatch({
      type: 'custom/fetchImport',
      payload: {
        values: {
          scale: scale,
          question: questionList,
          answer: answerList,
          factor: factorList,
          factorQuestion: factorQuestionList,
          conclusion: conclusionList,
        },
      },
    });
  };

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card>
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

            <Form.Item label="选择文件">
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>上传</Button>
              </Upload>
            </Form.Item>
            <Form.Item label=" " colon={false}>
              <Button
                type="primary"
                onClick={imp}
                disabled={fileList?.length > 0 ? false : true}
              >
                保存
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Card
          style={{
            display: scale ? 'block' : 'none',
            height: '600px',
            overflow: 'auto',
          }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Title level={5}>量表</Title>
            <Table
              columns={scaleColumns}
              dataSource={scale}
              rowKey="name"
              pagination={false}
              size="small"
            ></Table>
            <Title level={5}>题目</Title>
            <Table
              columns={questionColumns}
              dataSource={questionList}
              rowKey="name"
              pagination={false}
              size="small"
            ></Table>
            <Title level={5}>答案</Title>
            <Table
              columns={answerColumns}
              dataSource={answerList}
              rowKey="name"
              pagination={false}
              size="small"
            ></Table>
            <Title level={5}>因子</Title>
            <Table
              columns={factorColumns}
              dataSource={factorList}
              rowKey="name"
              pagination={false}
              size="small"
            ></Table>
            <Title level={5}>因子题目</Title>
            <Table
              columns={factorQuestionColumns}
              dataSource={factorQuestionList}
              rowKey="name"
              pagination={false}
              size="small"
            ></Table>
            <Title level={5}>结论</Title>
            <Table
              columns={conclusionColumns}
              dataSource={conclusionList}
              rowKey="expression"
              pagination={false}
              size="small"
            ></Table>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

const mapStateToProps = ({ custom }: { custom: customState }) => {
  return {
    custom,
  };
};

export default connect(mapStateToProps)(Custom);
