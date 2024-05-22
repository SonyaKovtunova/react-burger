import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from './reset-password-page.module.css';
import { resetPassword } from "../../utils/burger-api";
import { AuthContext } from "../../services/auth";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const navigate = useNavigate();

    const { register, canResetPassword, ...auth } = useContext(AuthContext);

    if (auth.user) {
        return (<Navigate to={'/'} replace />);
    }

    if (!canResetPassword) {
        return (<Navigate to={'/forgot-password'} replace />);
    }

    const onResetPassword = async () => {
        await resetPassword(password, token);  
        navigate('login', { replace: true });
    }

    return (
        <div className={styles.resetPasswordFormWrapper}>
            <p className="text text_type_main-medium">
                Восстановление пароля
            </p>
            <PasswordInput
                placeholder={'Введите новый пароль'}
                onChange={e => setPassword(e.target.value)}
                value={password}
                size={'default'}          
                />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={e => setToken(e.target.value)}
                value={token}
                size={'default'}
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}               
                />
            <Button 
                htmlType="button" 
                type="primary" 
                size="medium" 
                extraClass='mb-15' 
                disabled={!password || !token} 
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