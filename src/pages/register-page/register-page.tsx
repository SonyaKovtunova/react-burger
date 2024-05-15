import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './register-page.module.css';

const RegisterPage = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isPasswordShowing, setIsPasswordShowing] = useState<boolean>(false);
    
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
            <Input
                type={'email'}
                placeholder={'E-mail'}
                onChange={e => setEmail(e.target.value)}
                value={email}
                size={'default'}
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}               
                 />
            <Input
                type={'password'}
                placeholder={'Пароль'}
                onChange={e => setPassword(e.target.value)}
                value={password}
                size={'default'}
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
                icon={isPasswordShowing ? 'HideIcon' : 'ShowIcon'} 
                onIconClick={() => setIsPasswordShowing(!isPasswordShowing)}            
                />
            <Button htmlType="button" type="primary" size="medium" extraClass='mb-15'>
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