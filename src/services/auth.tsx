import { ReactElement, createContext, useEffect, useState } from 'react';
import { deleteCookie, getCookie, setCookie } from '../utils/cookies';
import { IUser } from '../interfaces/user';
import { sendGetUserRequest, sendLoginRequest, sendLogoutRequest, sendPasswordResetCodeRequest, sendRegisterRequest, sendResetPasswordRequest, sendUpdateUserRequest } from '../utils/burger-api';
import { IAuthResponse } from '../interfaces/auth-response';

export interface IAuthContext {
    user: IUser | null,
    getUser: () => Promise<void>,
    updateUser: (email: string, name: string, password: string) => Promise<void>,
    login: (email: string, password: string) => Promise<void>,
    register: (email: string, name: string, password: string) => Promise<void>,
    sendPasswordResetCode: (email: string) => Promise<void>,
    resetPassword: (password: string, token: string) => Promise<void>,
    logout: () => Promise<void>,
    canResetPassword: boolean,
}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    getUser: async () => {},
    updateUser: async () => {},
    login: async () => {},
    register: async () => {},
    sendPasswordResetCode: async () => {},
    resetPassword: async () => {},
    logout: async () => {},
    canResetPassword: false,
});

const setTokens = (data: IAuthResponse) => {
  updateRefreshToken(data.refreshToken);
  updateAccessToken(data.accessToken);
}

const updateRefreshToken = (refreshToken: string) => {
  if (refreshToken) {
    setCookie('token', refreshToken);
  } else {
    deleteCookie('token');
  }
}

const updateAccessToken = (accessToken: string) => {
  if (accessToken && accessToken.indexOf('Bearer') === 0) {
    const authToken = accessToken.split('Bearer ')[1];
    localStorage.setItem('token', authToken);
  } else {
    localStorage.removeItem('token');
  }
}

const AuthProvider = (props : { children: ReactElement }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const authContextValue: IAuthContext = {
    user,
    getUser: async () => {
      setUser(null);

      const refreshToken = getCookie('token');
      const accessToken = localStorage.getItem('token');
      if (!refreshToken || !accessToken) {
        return;
      }
    
      try {
        const data = await sendGetUserRequest(accessToken, refreshToken);

        setTokens(data);
        setUser(data.user);
      } catch(error) { }
    },
    updateUser: async (email, name, password) => {
      const refreshToken = getCookie('token');
      const accessToken = localStorage.getItem('token');
      if (!refreshToken || !accessToken) {
        return;
      }

      try {
        const data = await sendUpdateUserRequest(email, name, password, accessToken, refreshToken);

        setTokens(data);
        setUser(data.user);
      } catch(error) { }
    },
    login: async (email, password) => {
      setUser(null);

      try {
        const data = await sendLoginRequest(email, password);
          
        setTokens(data);
        setUser(data.user);
      } catch (error) { }
    },
    register: async (email, name, password) => {
      setUser(null);

      try {
        const data = await sendRegisterRequest(email, name, password);

        setTokens(data);
        setUser(data.user);
      } catch(e) { }
    },
    sendPasswordResetCode: async (email) => {
      var data = await sendPasswordResetCodeRequest(email);

      try {
        if (data.success) {
          localStorage.setItem('waitForResetPassword', '1');
        }
      } catch(e) { }
    },
    resetPassword: async (password, token) => {
      try {
        await sendResetPasswordRequest(password, token);
        localStorage.removeItem('waitForResetPassword');  
      } catch(e) { }
    },
    logout: async () => {
      setUser(null);
      localStorage.removeItem('token');

      const token = getCookie('token');
      if (!token) {
        return;
      }

      deleteCookie('token');
      
      try {
        await sendLogoutRequest(token);
      } catch(e) { }
    },
    canResetPassword: !!localStorage.getItem('waitForResetPassword'),
  }

  const init = async () => {
    await authContextValue.getUser();
  };

  useEffect(() => {
    init();
  }, [])

  return <AuthContext.Provider value={authContextValue}>{props.children}</AuthContext.Provider>;
}

export default AuthProvider;