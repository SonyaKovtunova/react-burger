import { Navigate } from 'react-router-dom';
import { ReactElement, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../services/auth';

export const AuthProtectedRoute = (props : { children: ReactElement }) => {
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

    return auth.user ? props.children : <Navigate to="/login" replace/>;
}