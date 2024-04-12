import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from './app-header.module.css';

const AppHeader = (props: {}) => {
    return (
        <header className={appHeaderStyles.header}>
            <nav className={appHeaderStyles.nav}>
                <button className={appHeaderStyles.button}>
                    <BurgerIcon type="primary" />
                    <p className="text text_type_main-default  ml-2">
                        Конструктор
                    </p>
                </button>
                <button className={appHeaderStyles.button}>
                     <ListIcon type="secondary" />
                    <p className="text text_type_main-default text_color_inactive">
                        Лента заказов
                    </p>
                </button>
            </nav>
            <div className={appHeaderStyles.logoWrapper}>
                <Logo />
            </div>
            <div className={appHeaderStyles.profileButton}>
                <button className={appHeaderStyles.button}>
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-default text_color_inactive">
                        Личный кабинет
                    </p>
                </button>    
            </div>
        </header>
    );
}
  
export default AppHeader; 