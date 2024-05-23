import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './login-page.module.css';
import { AuthContext } from '../../services/auth';

const LoginPage = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { login } = useContext(AuthContext);

    const onLogin = () => {
        login(email, password);
    }

    return (
        <div className={styles.loginFormWrapper}>
            <p className="text text_type_main-medium">
                Вход
            </p>
            <EmailInput
                placeholder={'E-mail'}
                onChange={e => setEmail(e.target.value)}
                value={email}
                size={'default'}             
                />
            <PasswordInput
                placeholder={'Пароль'}
                onChange={e => setPassword(e.target.value)}
                value={password}
                size={'default'}          
                />
            <Button 
                htmlType="button" 
                type="primary" 
                size="medium" 
                extraClass='mb-15'
                disabled={!email || !password}
                onClick={onLogin}>
                Войти
            </Button>
            <div>
                <p className="text text_type_main-default text_color_inactive">
                    Вы - новый пользователь? <Link to={'/register'} className={styles.link}>Зарегистрироваться</Link>
                </p>
            </div>
            <div>
                <p className="text text_type_main-default text_color_inactive">
                    Забыли пароль? <Link to={'/forgot-password'} className={styles.link}>Восстановить пароль</Link>
                </p>
            </div>
        </div>
    );
}
 
export default LoginPage;