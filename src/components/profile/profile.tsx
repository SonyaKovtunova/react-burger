import { EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from './profile.module.css';

const Profile = () => {
    const [name, setName] = useState<string>('Тест');
    const [isNameDisabled, setIsNameDisabled] = useState(true);
    const [email, setEmail] = useState<string>('test@mail.com');
    const [password, setPassword] = useState<string>('12345');

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
                disabled={isNameDisabled}
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
        </div>
    );
}

export default Profile; 