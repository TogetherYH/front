import { useModel } from 'umi';

export default function IndexPage() {
  const { initialState } = useModel('@@initialState');
  return (
    <div>
      <h1>{initialState?.currentUser?.username}, Hello~</h1>
    </div>
  );
}
