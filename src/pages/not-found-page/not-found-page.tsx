import { FC } from 'react';
import styles from './not-found-page.module.css';

const NotFoundPage: FC = () => {
    return (
        <div className={styles.pageWrapper}>
            <p className="text text_type_main-large">
                Страница не найдена
            </p>
        </div>
    );
}

export default NotFoundPage;