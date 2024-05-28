import { Navigate, useLocation } from 'react-router-dom';
import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../services/auth';

type TAuthProtectedRouteProps = {
    children: ReactElement;
    anonymous?: boolean;
};

export const AuthProtectedRoute: FC<TAuthProtectedRouteProps> = ({ children, anonymous = false }) => {
    let { getUser, ...auth } = useContext(AuthContext);
    const [isUserLoaded, setUserLoaded] = useState(false);
    const location = useLocation();
    const from = location.state?.from || '/';

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

    if (anonymous && !!auth.user) {
        return <Navigate to={ from } />;
    }

    if (!anonymous && !auth.user) {
        return <Navigate to="/login" state={{ from: location }}/>;
    }

    return children;
}