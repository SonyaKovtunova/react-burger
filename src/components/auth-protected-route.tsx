import { Navigate, useLocation } from 'react-router-dom';
import { FC, ReactElement, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../services';
import { getUserThunk } from '../services/user';

type TAuthProtectedRouteProps = {
    children: ReactElement;
    anonymous?: boolean;
};

export const AuthProtectedRoute: FC<TAuthProtectedRouteProps> = ({ children, anonymous = false }) => {
    let user = useAppSelector(store => store.user.user);
    const dispatch = useAppDispatch();
    const [isUserLoaded, setUserLoaded] = useState(false);
    const location = useLocation();
    const from = location.state?.from || '/';

    const init = async () => {
        dispatch(getUserThunk());
        setUserLoaded(true);
    };

    useEffect(() => {
        init();
    }, []);

    if (!isUserLoaded) {
        return null;
    }

    if (anonymous && !!user) {
        return <Navigate to={ from } />;
    }

    if (!anonymous && !user) {
        return <Navigate to="/login" state={{ from: location }}/>;
    }

    return children;
}