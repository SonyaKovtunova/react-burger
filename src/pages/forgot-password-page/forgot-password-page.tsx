import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, FormEvent, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './forgot-password-page.module.css';
import { AuthContext } from "../../services/auth";
import { useForm } from "../../components/user-form";

const ForgotPasswordPage: FC = () => {
    const [ form, _, onChange ] = useForm({ email: '' });
    const navigate = useNavigate();
    const { sendPasswordResetCode } = useContext(AuthContext);

    const onSendPasswordResetCode = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form['email']) {
            return;
        }

        await sendPasswordResetCode(form['email']);
        navigate('/reset-password', { replace: true });
    }

    return (
        <div className={styles.page}>
            <p className="text text_type_main-medium">
                Восстановление пароля
            </p>
            <form className={styles.formWrapper} onSubmit={onSendPasswordResetCode}>
                <EmailInput
                    placeholder={'Укажите e-mail'}
                    onChange={e => onChange('email', e.target.value)}
                    value={form['email']}
                    size={'default'}   
                    autoComplete='email'            
                    />
                <Button 
                    htmlType="submit"
                    type="primary" 
                    size="medium" 
                    extraClass='mb-15' 
                    disabled={!form['email']}>
                    Восстановить
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
 
export default ForgotPasswordPage;