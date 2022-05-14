import { useModel } from 'umi';

export const valueToLabel = (dictCode: string, value: string): string => {
  let v = '-';
  // console.log(dictCode, value);

  const { initialState } = useModel('@@initialState');
  const dict = initialState?.dictData[dictCode];
  // initialState?.dictData['user_sex'].items.at(0)['label'];

  if (dict && dict.items) {
    const { items } = dict;
    items.forEach((element: any) => {
      if (element.value === value) {
        v = element.label;
        return;
      }
    });
    return v;
  } else {
    return v;
  }
};
