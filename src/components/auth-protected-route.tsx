import { Navigate } from 'react-router-dom';
import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../services/auth';

type TAuthProtectedRouteProps = {
    children: ReactElement
};

export const AuthProtectedRoute: FC<TAuthProtectedRouteProps> = ({ children }) => {
    let { getUser, ...auth } = useContext(AuthContext);
    const [isUserLoaded, setUserLoaded] = useState(false);

    const init = async () => {
        await getUser();
        setUserLoaded(true);
    };

    useEffect(() => {
        init();
    }, []);

    if (!isUserLoaded) {
        return null;
    }

    return auth.user ? children : <Navigate to="/login" replace/>;
}