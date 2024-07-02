import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from './app-header.module.css';
import { NavLink } from "react-router-dom";
import { FC } from "react";

const AppHeader: FC = () => {
    return (
        <header className={appHeaderStyles.header}>
            <nav className={appHeaderStyles.nav}>
                <NavLink to={'/'} className={`${appHeaderStyles.link}`}>
                    {({isActive}) => (
                        <>
                            <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                            <p className={`text text_type_main-default ml-2 ${isActive ? '' : 'text_color_inactive'}`}>
                                Конструктор
                            </p>
                        </>
                    )}
                </NavLink>
                <NavLink to={'/feed'} className={`${appHeaderStyles.link}`}>
                    {({isActive}) => (
                        <>
                            <ListIcon type={isActive ? 'primary' : 'secondary'} />
                            <p className={`text text_type_main-default ml-2 ${isActive ? '' : 'text_color_inactive'}`}>
                                Лента заказов
                            </p>
                        </>
                    )}
                </NavLink>
            </nav>
            <div className={appHeaderStyles.logoWrapper}>
                <Logo />
            </div>
            <div className={appHeaderStyles.profileButton}>   
                <NavLink to={'/profile'} className={`${appHeaderStyles.link}`}>
                    {({isActive}) => (
                        <>
                            <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                            <p className={`text text_type_main-default ml-2 ${isActive ? '' : 'text_color_inactive'}`}>
                                Личный кабинет
                            </p>
                        </>
                    )}
                </NavLink>
            </div>
        </header>
    );
}
  
export default AppHeader; 