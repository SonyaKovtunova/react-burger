import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, FormEvent, useEffect } from "react";
import styles from './profile.module.css';
import { useForm } from "../user-form";
import { useAppDispatch, useAppSelector } from "../../services";
import { updateUserThunk } from "../../services/user";

const Profile: FC = () => {
    const [ form, onSet, onChange ] = useForm({ name: '', email: '', password: '' });
    const user = useAppSelector(store => store.user.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user) {
            onSet({ name: user.name, email: user.email, password: '' });
        }
    }, [user]);

    const onCancel = () => {
        if (user) {
            onSet({ name: user.name, email: user.email, password: '' });
        }
    }

    const onSave = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form['email'] || !form['name'] || !form['password']) {
            return;
        }

        dispatch(updateUserThunk({email: form['email'], name: form['name'], password: form['password']}));
    }

    const isUserChanged = !user || user.name !== form['name'] || user.email !== form['email'] || !!form['password'];

    return (
        <form className={styles.profile} onSubmit={onSave} onReset={onCancel}>
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
                <Button htmlType="reset" type="secondary" size="medium">
                    Отмена
                </Button>
                <Button htmlType="submit" type="primary" size="medium" disabled={!form['email'] || !form['name'] || !form['password']}>
                    Сохранить
                </Button>
            </div>}
        </form>
    );
}

export default Profile; 