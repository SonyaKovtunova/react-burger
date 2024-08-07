import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import styles from './login-page.module.css';
import { useForm } from "../../hooks/user-form";
import { useAppDispatch } from '../../services';
import { loginThunk } from '../../services/user';

const LoginPage: FC = () => {
    const [ form, _, onChange ] = useForm({ email: '', password: '' });
    const dispatch = useAppDispatch();

    const onLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form['email'] || !form['password']) {
            return;
        }
        
        dispatch(loginThunk({ email: form['email'], password: form['password'] }));
    }

    return (
        <div className={styles.page}>
            <p className="text text_type_main-medium">
                Вход
            </p>
            <form className={styles.formWrapper} onSubmit={onLogin}>
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
                    htmlType="submit" 
                    type="primary" 
                    size="medium" 
                    extraClass='mb-15'
                    disabled={!form['email'] || !form['password']}>
                    Войти
                </Button>    
            </form>
            
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