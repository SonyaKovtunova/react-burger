import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import styles from './register-page.module.css';
import { AuthContext } from '../../services/auth';

const RegisterPage = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { register } = useContext(AuthContext);
    
    const onRegister = () => {
        register(email, name, password);
    }

    return (
        <div className={styles.registerFormWrapper}>
            <p className="text text_type_main-medium">
                Регистрация
            </p>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={e => setName(e.target.value)}
                value={name}
                size={'default'}
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}               
                />
            <EmailInput
                placeholder={'E-mail'}
                onChange={e => setEmail(e.target.value)}
                value={email}
                size={'default'}            
                />
            <PasswordInput
                placeholder={'Пароль'}
                onChange={e => setPassword(e.target.value)}
                value={password}
                size={'default'}            
                />
            <Button 
                htmlType="button" 
                type="primary" 
                size="medium" 
                extraClass='mb-15' 
                disabled={!email || !name || !password}
                onClick={onRegister}
                >
                Зарегистрироваться
            </Button>
            <div>
                <p className="text text_type_main-default text_color_inactive">
                    Уже зарегистрированы? <Link to={'/login'} className={styles.link}>Войти</Link>
                </p>
            </div>
        </div>
    );
}
 
export default RegisterPage;