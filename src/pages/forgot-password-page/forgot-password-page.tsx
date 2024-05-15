import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './forgot-password-page.module.css';
import { sendPasswordResetCode } from "../../utils/burger-api";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState<string>('');
    const navigate = useNavigate();

    const onSendPasswordResetCode = async () => {
        try {
            const data = await sendPasswordResetCode(email);

            if (data.success) {
                navigate('/reset-password', {replace: true});
            }
        } catch (error) { }
    }

    return (
        <div className={styles.forgotPasswordFormWrapper}>
            <p className="text text_type_main-medium">
                Восстановление пароля
            </p>
            <Input
                type={'email'}
                placeholder={'Укажите e-mail'}
                onChange={e => setEmail(e.target.value)}
                value={email}
                size={'default'}
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}               
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