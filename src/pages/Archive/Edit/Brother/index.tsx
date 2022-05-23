import { FC, useEffect, useState } from 'react';
import { Space, Row, Button, Form, Input } from 'antd';
import { connect, brotherSisterState, Loading, Dispatch } from 'umi';
import DictSelect from '@/components/DictSelect';
import { SizeType } from 'antd/es/config-provider/SizeContext';
const { TextArea } = Input;

interface BrotherSisterProps {
  visible: boolean;
  userId?: string;
  brotherSister: brotherSisterState;
  dispatch: Dispatch;
}

const BrotherSister: FC<BrotherSisterProps> = (props) => {
  const { visible, userId, brotherSister, dispatch } = props;
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (visible && dispatch) {
      dispatch({
        type: 'brotherSister/fetchOne',
        payload: {
          userId,
        },
      });
    }
  }, [visible]);

  return <></>;
};

const mapStateToProps = ({
  brotherSister,
  loading,
}: {
  brotherSister: brotherSisterState;
  loading: Loading;
}) => {
  return {
    brotherSister,
    brotherSisterLoading: loading.models.brotherSister,
  };
};

export default connect(mapStateToProps)(BrotherSister);
