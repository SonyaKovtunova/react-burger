import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useContext, useEffect, useState } from "react";
import styles from './profile.module.css';
import { AuthContext } from "../../services/auth";

const Profile = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('password');

    const { user, updateUser } = useContext(AuthContext);
    
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const onCancel = () => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPassword('password');
        }
    }

    const onSave = () => {
        updateUser(email, name, password);
    }

    return (
        <div className={styles.profile}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={e => setName(e.target.value)}
                value={name}
                size={'default'}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                icon='EditIcon'
                />
            <EmailInput
                placeholder={'Логин'}
                onChange={e => setEmail(e.target.value)}
                value={email}
                size={'default'}
                isIcon={true}
                />
            <PasswordInput
                placeholder={'Пароль'}
                onChange={e => setPassword(e.target.value)}
                value={password}
                size={'default'}
                icon="EditIcon"
                />
            <div className={styles.buttonsWrapper}>
                <Button htmlType="button" type="secondary" size="medium" onClick={onCancel}>
                    Отмена
                </Button>
                <Button htmlType="button" type="primary" size="medium" disabled={!email || !name || !password} onClick={onSave}>
                    Сохранить
                </Button>
            </div>
        </div>
    );
}

export default Profile; 