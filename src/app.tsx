import type {
  MenuDataItem,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';
import { history, Link } from 'umi';
import type { RunTimeLayoutConfig } from 'umi';
import {
  currentUser as queryCurrentUser,
  menuData as fetchMenuData,
  dictData as queryDictData,
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
  dictData?: any;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
  fetchDictData?: () => Promise<any>;
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
  const fetchDictData = async () => {
    if (!getToken()) {
      return undefined;
    }
    try {
      const msg = await queryDictData();
      // console.log('dictData msg', msg);
      return msg.data;
    } catch (error) {
      // console.log('fetchDictData error', error);
      // console.log('fetchDictData error，重定向到 login');
      // history.push(loginPath);
    }
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    const dictData = await fetchDictData();
    return {
      fetchUserInfo,
      fetchDictData,
      currentUser,
      dictData,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    fetchDictData,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    menu: {
      // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
      params: {
        userId: initialState?.currentUser?.userId,
      },
      request: initialState?.currentUser?.userId
        ? async (params, defaultMenuData) => {
            // initialState.currentUser 中包含了所有用户信息
            // if (history.location.pathname !== loginPath) {
            const menuData = await fetchMenuData();
            return menuData.data;
            // } else {
            //   return [];
            // }
          }
        : async (
            params: Record<string, any>,
            defaultMenuData: MenuDataItem[],
          ) => {
            return [];
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
