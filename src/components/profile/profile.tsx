import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useContext, useEffect } from "react";
import styles from './profile.module.css';
import { AuthContext } from "../../services/auth";
import { useForm } from "../user-form";

const Profile: FC = () => {
    const [ form, onSet, onChange ] = useForm({ name: '', email: '', password: '' });
    const { user, updateUser } = useContext(AuthContext);
    
    useEffect(() => {
        if (user) {
            onSet({ name: user.name, email: user.email});
        }
    }, [user]);

    const onCancel = () => {
        if (user) {
            onSet({ name: user.name, email: user.email, password: '' });
        }
    }

    const onSave = () => {
        updateUser(form['email'], form['name'], form['password']);
    }

    const isUserChanged = !user || user.name !== form['name'] || user.email !== form['email'] || !form['password'];

    return (
        <div className={styles.profile}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={(e) => onChange('name', e.target.value)}
                value={form['name']}
                size={'default'}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                icon='EditIcon'
                />
            <EmailInput
                placeholder={'Логин'}
                onChange={e => onChange('email', e.target.value)}
                value={form['email']}
                size={'default'}
                isIcon={true}
                />
            <PasswordInput
                placeholder={'Пароль'}
                onChange={e => onChange('password', e.target.value)}
                value={form['password']}
                size={'default'}
                icon="EditIcon"
                />
            { isUserChanged && <div className={styles.buttonsWrapper}>
                <Button htmlType="button" type="secondary" size="medium" onClick={onCancel}>
                    Отмена
                </Button>
                <Button htmlType="button" type="primary" size="medium" disabled={!form['email'] || !form['name'] || !form['password']} onClick={onSave}>
                    Сохранить
                </Button>
            </div>}
        </div>
    );
}

export default Profile; 