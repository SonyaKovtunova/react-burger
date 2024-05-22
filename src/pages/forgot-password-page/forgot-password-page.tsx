import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from './forgot-password-page.module.css';
import { AuthContext } from "../../services/auth";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState<string>('');
    const navigate = useNavigate();

    const { sendPasswordResetCode, ...auth } = useContext(AuthContext);

    if (auth.user) {
        return (<Navigate to={'/'} replace />);
    }

    const onSendPasswordResetCode = async () => {
        await sendPasswordResetCode(email);
        navigate('/reset-password', { replace: true });
    }

    return (
        <div className={styles.forgotPasswordFormWrapper}>
            <p className="text text_type_main-medium">
                Восстановление пароля
            </p>
            <EmailInput
                placeholder={'Укажите e-mail'}
                onChange={e => setEmail(e.target.value)}
                value={email}
                size={'default'}              
                />
            <Button 
                htmlType="button" 
                type="primary" 
                size="medium" 
                extraClass='mb-15' 
                disabled={!email} 
                onClick={onSendPasswordResetCode}>
                Восстановить
            </Button>
            <div>
                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль? <Link to={'/login'} className={styles.link}>Войти</Link>
                </p>
            </div>
        </div>
    );
}
 
export default ForgotPasswordPage;