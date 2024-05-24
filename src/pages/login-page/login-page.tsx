import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './login-page.module.css';
import { AuthContext } from '../../services/auth';
import { useForm } from '../../components/user-form';

const LoginPage = () => {
    const [ form, _, onChange ] = useForm({ email: '', password: '' });
    const { login } = useContext(AuthContext);

    const onLogin = () => {
        login(form['email'], form['password']);
    }

    return (
        <div className={styles.loginFormWrapper}>
            <p className="text text_type_main-medium">
                Вход
            </p>
            <EmailInput
                placeholder={'E-mail'}
                onChange={e => onChange('email', e.target.value)}
                value={form['email']}
                size={'default'}
                autoComplete='email'
                />
            <PasswordInput
                placeholder={'Пароль'}
                onChange={e => onChange('password', e.target.value)}
                value={form['password']}
                size={'default'} 
                autoComplete='current-password'   
                />
            <Button 
                htmlType="button" 
                type="primary" 
                size="medium" 
                extraClass='mb-15'
                disabled={!form['email'] || !form['password']}
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