import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { history, Link } from 'umi';
import type { RunTimeLayoutConfig } from 'umi';
import { currentUser as queryCurrentUser } from '@/services/login';

const loginPath = '/login';
const isDev = process.env.NODE_ENV === 'development';

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      console.log('fetchUserInfo msg', msg);
      return msg.data;
    } catch (error) {
      console.log('fetchUserInfo error', error);
      console.log('fetchUserInfo error，重定向到 login');
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    // rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.username,
    },
    // footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!localStorage.getItem('token') && location.pathname !== loginPath) {
        console.log('没有登录，重定向到 login');
        history.push(loginPath);
      }
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};
