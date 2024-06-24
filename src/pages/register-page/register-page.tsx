import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { FC, FormEvent } from 'react';
import styles from './register-page.module.css';
import { useForm } from '../../components/user-form';
import { useAppDispatch } from '../../services';
import { registerThunk } from '../../services/user';

const RegisterPage: FC = () => {
    const [ form, _, onChange ] = useForm({ name: '', email: '', password: '' });
    const dispatch = useAppDispatch();
    
    const onRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!form['email'] || !form['name'] || !form['password']) {
            return;
        }

        dispatch(registerThunk({ email: form['email'], name: form['name'], password: form['password'] }));
    }

    return (
        <div className={styles.page}>
            <p className="text text_type_main-medium">
                Регистрация
            </p>
            <form className={styles.formWrapper} onSubmit={onRegister}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={(e) => onChange('name', e.target.value)}
                    value={form['name']}
                    size={'default'}
                    onPointerEnterCapture={undefined} 
                    onPointerLeaveCapture={undefined}  
                    autoComplete='name'              
                    />
                <EmailInput
                    placeholder={'E-mail'}
                    onChange={(e) => onChange('email', e.target.value)}
                    value={form['email']}
                    size={'default'}
                    autoComplete='email' 
                    />
                <PasswordInput
                    placeholder={'Пароль'}
                    onChange={(e) => onChange('password', e.target.value)}
                    value={form['password']}
                    size={'default'}      
                    autoComplete='new-password'                   
                    />
                <Button 
                    htmlType="submit"
                    type="primary" 
                    size="medium" 
                    extraClass='mb-15' 
                    disabled={!form['email'] || !form['name'] || !form['password']}>
                    Зарегистрироваться
                </Button>    
            </form>
            <div>
                <p className="text text_type_main-default text_color_inactive">
                    Уже зарегистрированы? <Link to={'/login'} className={styles.link}>Войти</Link>
                </p>
            </div>
        </div>
    );
}
 
export default RegisterPage;