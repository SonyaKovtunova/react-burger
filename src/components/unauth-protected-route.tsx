import { Navigate } from 'react-router-dom';
import { ReactElement, useContext } from 'react';
import { AuthContext } from '../services/auth';

export const UnauthProtectedRoute = (props : { children: ReactElement }) => {
    let auth = useContext(AuthContext);
    return auth.user ? <Navigate to={'/'} replace /> : props.children;
}