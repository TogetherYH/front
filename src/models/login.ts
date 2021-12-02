import { useCallback, useState } from 'react';
import { history } from 'umi';

export default function () {
  const [user, setUser] = useState<API.CurrentUser>();
  const login = useCallback((username: string, password: string) => {
    setUser({
      userId: BigInt(1),
      username: username,
      token: '',
    });
  }, []);
  const logout = useCallback(() => {
    localStorage.setItem('token', '');
    history.push('/login');
    setUser({} as API.CurrentUser);
  }, []);
  return {
    user,
    login,
    logout,
  };
}
