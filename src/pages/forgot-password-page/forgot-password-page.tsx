import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './forgot-password-page.module.css';
import { AuthContext } from "../../services/auth";
import { useForm } from "../../components/user-form";

const ForgotPasswordPage = () => {
    const [ form, _, onChange ] = useForm({ email: '' });
    const navigate = useNavigate();
    const { sendPasswordResetCode } = useContext(AuthContext);

    const onSendPasswordResetCode = async () => {
        await sendPasswordResetCode(form['email']);
        navigate('/reset-password', { replace: true });
    }

    return (
        <div className={styles.forgotPasswordFormWrapper}>
            <p className="text text_type_main-medium">
                Восстановление пароля
            </p>
            <EmailInput
                placeholder={'Укажите e-mail'}
                onChange={e => onChange('email', e.target.value)}
                value={form['email']}
                size={'default'}   
                autoComplete='email'            
                />
            <Button 
                htmlType="button" 
                type="primary" 
                size="medium" 
                extraClass='mb-15' 
                disabled={!form['email']} 
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