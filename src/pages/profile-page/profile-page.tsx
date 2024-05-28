import { Link, NavLink, Navigate, Outlet } from "react-router-dom";
import styles from './profile-page.module.css';
import { FC, useContext } from "react";
import { AuthContext } from "../../services/auth";

const ProfilePage: FC = () => {
    const { logout, ...auth } = useContext(AuthContext);

    if (!auth.user) {
        return (<Navigate to={'/login'} replace />);
    }

    const onLogout = () => {
        logout();
    }

    return (
        <div className={styles.profilePageWrapper}>
            <div className={styles.navigation}>
                <NavLink to={'/profile'} className={`${styles.link}`}>
                    {({isActive}) => (
                        <p className={`text text_type_main-medium ${isActive ? '' : 'text_color_inactive'}`}>Профиль</p>
                    )}
                </NavLink> 
                <NavLink to={'/profile/orders'} className={`${styles.link} mt-6`}>
                    {({isActive}) => (
                        <p className={`text text_type_main-medium ${isActive ? '': 'text_color_inactive'}`}>История заказов</p>
                    )}
                </NavLink> 
                <Link to={'/'} className={`${styles.link} mt-6`} onClick={onLogout}>
                    <p className='text text_type_main-medium text_color_inactive'>Выход</p>
                </Link>
                <p className='text text_type_main-default text_color_inactive mt-20'>
                    В этом разделе вы можете
                </p>
                <p className='text text_type_main-default text_color_inactive'>
                    изменить свои персональные данные
                </p>
            </div>
            <div className={styles.page}>
                <Outlet />
            </div>
        </div>
    );
}

export default ProfilePage; 