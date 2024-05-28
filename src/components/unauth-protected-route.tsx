import { Navigate } from 'react-router-dom';
import { FC, ReactElement, useContext } from 'react';
import { AuthContext } from '../services/auth';

type TUnauthProtectedRouteProps = {
    children: ReactElement
};

export const UnauthProtectedRoute: FC<TUnauthProtectedRouteProps> = ({ children }) => {
    let auth = useContext(AuthContext);
    return auth.user ? <Navigate to={'/'} replace /> : children;
}