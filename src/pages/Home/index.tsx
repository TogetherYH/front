import { useModel } from 'umi';

export default function IndexPage() {
  const { initialState } = useModel('@@initialState');
  return (
    <div>
      <h1>Hello, {initialState?.currentUser?.username} ~</h1>
    </div>
  );
}
