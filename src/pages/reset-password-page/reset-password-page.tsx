import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from './reset-password-page.module.css';
import { sendResetPasswordRequest } from "../../utils/burger-api";
import { AuthContext } from "../../services/auth";
import { useForm } from "../../components/user-form";

const ResetPasswordPage: FC = () => {
    const [ form, _, onChange ] = useForm({ token: '', password: '' });
    const navigate = useNavigate();
    const { canResetPassword } = useContext(AuthContext);

    if (!canResetPassword) {
        return (<Navigate to={'/forgot-password'} replace />);
    }

    const onResetPassword = async () => {
        await sendResetPasswordRequest(form['password'], form['token']);  
        navigate('login', { replace: true });
    }

    return (
        <div className={styles.resetPasswordFormWrapper}>
            <p className="text text_type_main-medium">
                Восстановление пароля
            </p>
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
                htmlType="button" 
                type="primary" 
                size="medium" 
                extraClass='mb-15' 
                disabled={!form['password'] || !form['token']} 
                onClick={onResetPassword}>
                Сохранить
            </Button>
            <div>
                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль? <Link to={'/login'} className={styles.link}>Войти</Link>
                </p>
            </div>
        </div>
    );
}
 
export default ResetPasswordPage;