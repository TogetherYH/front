import type {
  MenuDataItem,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';
import { history, Link } from 'umi';
import type { RunTimeLayoutConfig } from 'umi';
import {
  currentUser as queryCurrentUser,
  menuData as fetchMenuData,
} from '@/services/login';
import RightContent from '@/components/RightContent';
// import Footer from './components/Footer';
import { getToken } from '@/utils/token';

const loginPath = '/login';
const isDev = process.env.NODE_ENV === 'development';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    if (!getToken()) {
      return undefined;
    }
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
    menu: {
      // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
      params: {
        // userId: initialState?.currentUser?.userid,
      },
      request: async (params, defaultMenuData) => {
        // initialState.currentUser 中包含了所有用户信息
        const menuData = await fetchMenuData();

        // menuData.data.map((mydata: any) => {
        //   mydata.key = mydata.id;
        //   return mydata;
        // });

        return menuData.data;
      },
    },
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.username,
    },
    // footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!getToken() && location.pathname !== loginPath) {
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
