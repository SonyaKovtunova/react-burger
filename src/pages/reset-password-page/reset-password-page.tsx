import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from './reset-password-page.module.css';
import { sendResetPassword } from "../../utils/burger-api";
import { useForm } from "../../hooks/user-form";
import { useAppSelector } from "../../services";

const ResetPasswordPage: FC = () => {
    const [ form, _, onChange ] = useForm({ token: '', password: '' });
    const navigate = useNavigate();
    const canResetPassword = useAppSelector(store => store.user.canResetPassword);

    if (!canResetPassword) {
        return (<Navigate to={'/forgot-password'} replace />);
    }

    const onResetPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form['password'] || !form['token']) {
            return;
        }

        await sendResetPassword(form['password'], form['token']);  
        navigate('/login', { replace: true });
    }

    return (
        <div className={styles.page}>
            <p className="text text_type_main-medium">
                Восстановление пароля
            </p>
            <form className={styles.formWrapper} onSubmit={onResetPassword}>
                <PasswordInput
                    placeholder={'Введите новый пароль'}
                    onChange={(e) => onChange('password', e.target.value)}
                    value={form['password']}
                    size={'default'}       
                    autoComplete='new-password'    
                    />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={(e) => onChange('token', e.target.value)}
                    value={form['token']}
                    size={'default'}
                    onPointerEnterCapture={undefined} 
                    onPointerLeaveCapture={undefined}               
                    />
                <Button 
                    htmlType="submit" 
                    type="primary" 
                    size="medium" 
                    extraClass='mb-15' 
                    disabled={!form['password'] || !form['token']}>
                    Сохранить
                </Button>    
            </form>
            <div>
                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль? <Link to={'/login'} className={styles.link}>Войти</Link>
                </p>
            </div>
        </div>
    );
}
 
export default ResetPasswordPage;