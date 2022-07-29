import { useModel } from 'umi';

export default function IndexPage() {
  const { initialState } = useModel('@@initialState');
  return (
    <div>
      <h1>Hello, {initialState?.currentUser?.username} ~</h1>
      {/* <h3>字典： {initialState?.dictData['user_sex'].items.at(0)['label']}</h3> */}
    </div>
  );
}
