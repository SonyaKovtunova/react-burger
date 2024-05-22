import { ReactElement, createContext, useEffect, useState } from 'react';
import { deleteCookie, getCookie, setCookie } from '../utils/cookies';
import { getUser, login, logout, refreshToken, register, resetPassword, sendPasswordResetCode, updateUser } from '../utils/burger-api';
import { IUser } from '../interfaces/user';
import { IErrorResponse } from '../interfaces/error-response';

export interface IAuthContext {
    user: IUser | null,
    error: string | null,
    getUser: () => Promise<void>,
    updateUser: (email: string, name: string, password: string) => Promise<void>,
    refreshToken : () => Promise<void>,
    login: (email: string, password: string) => Promise<void>,
    register: (email: string, name: string, password: string) => Promise<void>,
    sendPasswordResetCode: (email: string) => Promise<void>,
    resetPassword: (password: string, token: string) => Promise<void>,
    logout: () => Promise<void>,
    canResetPassword: boolean,
}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    error: null,
    getUser: async () => {},
    updateUser: async () => {},
    refreshToken: async () => {},
    login: async () => {},
    register: async () => {},
    sendPasswordResetCode: async () => {},
    resetPassword: async () => {},
    logout: async () => {},
    canResetPassword: false,
});

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
  const [error, setError] = useState<string | null>(null);

  const authContextValue: IAuthContext = {
    user,
    error,
    getUser: async () => {
      setUser(null);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
    
      try {
        const data = await getUser(token);
        setUser(data.user);
        setError(!data.success ? data.message : null);
      } catch(error) {
        const errorResponse = error as IErrorResponse;
        setError(errorResponse.message);
      }
    },
    updateUser: async (email, name, password) => {
      const token = localStorage.getItem('token'); 

      if (!token) {
        return;
      }

      try {
        const data = await updateUser(email, name, password, token);
        setUser(data.user);
        setError(!data.success ? data.message : null);
      } catch(error) {
        const errorResponse = error as IErrorResponse;
        setError(errorResponse.message);
      }
    },
    refreshToken: async () => {
      setUser(null);
      setError(null);

      const token = getCookie('token');
      if (!token) {
        return;
      }
      
      try {
        const data = await refreshToken(token);
          
        updateRefreshToken(data.refreshToken);
        updateAccessToken(data.accessToken);
        setError(!data.success ? data.message : null);  
      } catch(error) {
        const errorResponse = error as IErrorResponse;
        setError(errorResponse.message);
      }
      
    },
    login: async (email, password) => {
      setUser(null);
      setError(null);

      try {
        const data = await login(email, password);
          
        updateRefreshToken(data.refreshToken);
        updateAccessToken(data.accessToken);
        setUser(data.user);
        setError(!data.success ? data.message : null);
      } catch (error) {
        const errorResponse = error as IErrorResponse;
        setError(errorResponse.message);
      }
    },
    register: async (email, name, password) => {
      setUser(null);
      setError(null);

      try {
        const data = await register(email, name, password);

        updateRefreshToken(data.refreshToken);
        updateAccessToken(data.accessToken);
        setUser(data.user);
        setError(!data.success ? data.message : null);  
      } catch(error) {
        const errorResponse = error as IErrorResponse;
        setError(errorResponse.message);
      }
      
    },
    sendPasswordResetCode: async (email) => {
      var data = await sendPasswordResetCode(email);

      try {
        if (data.success) {
          localStorage.setItem('waitForResetPassword', '1');
        }
      } catch(error) {
        const errorResponse = error as IErrorResponse;
        setError(errorResponse.message);
      }
      
    },
    resetPassword: async (password, token) => {
      try {
        await resetPassword(password, token);
        localStorage.removeItem('waitForResetPassword');  
      } catch(error) {
        const errorResponse = error as IErrorResponse;
        setError(errorResponse.message);
      }
    },
    logout: async () => {
      setUser(null);
      setError(null);

      const token = getCookie('token');
  
      if (!token) {
        localStorage.removeItem('token');
        return;
      }
      
      try {
        await logout(token);
      } catch(error) {
        const errorResponse = error as IErrorResponse;
        setError(errorResponse.message);
      }
      
      deleteCookie('token');
      localStorage.removeItem('token');
    },
    canResetPassword: !!localStorage.getItem('waitForResetPassword'),
  }

  const init = async () => {
    await authContextValue.getUser();

    if (authContextValue.error) {
      await authContextValue.refreshToken();
      await authContextValue.getUser();
    }
  };

  useEffect(() => {
    init();
  }, [])

  return <AuthContext.Provider value={authContextValue}>{props.children}</AuthContext.Provider>;
}

export default AuthProvider;