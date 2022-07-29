import { FC, useState, useEffect } from 'react';
import { Select } from 'antd';
import { useModel } from 'umi';
const { Option } = Select;

interface DictSelectProps {
  disabled: boolean;
  dictCode: string;
  value?: string;
  onChange?: (value: string) => void;
}

const DictSelect: FC<DictSelectProps> = (props) => {
  const { initialState } = useModel('@@initialState');
  const [visible, setVisible] = useState(false);
  const { disabled, dictCode, value, onChange } = props;

  const items =
    initialState?.dictData[dictCode] && initialState?.dictData[dictCode].items
      ? initialState?.dictData[dictCode].items
      : [];
  const triggerValue = (changedValue: string) => {
    onChange?.(changedValue ? changedValue?.toString() : '');
  };

  return (
    <>
      <Select
        disabled={disabled}
        value={value}
        onChange={triggerValue}
        allowClear
      >
        {/* <Option value="agricultural">农业户口</Option>
        <Option value="non-agriculturalucy">非农业户口</Option> */}
        {items.map((element: any) => {
          return (
            <Option key={element.id} value={element.value}>
              {element.label}
            </Option>
          );
        })}
      </Select>
    </>
  );
};

export default DictSelect;
