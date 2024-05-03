import { useMemo } from 'react';
import emptyItemStyles from './empty-item.module.css';

interface IEmptyItemProps {
    isBun?: boolean,
    isTop?: boolean,
}

const EmptyItem = ( { isBun = false, isTop = true }: IEmptyItemProps) => {
    const classNames = useMemo(() => `${emptyItemStyles.item} ${isBun ? (isTop ? emptyItemStyles.top : emptyItemStyles.bottom) : ''}`, []);
    const text = useMemo (() => isBun ? (isTop ? 'Верхняя булка' : 'Нижняя булка') : 'Ингредиенты', []);

    return (
        <div className={classNames}>
            <div></div>
            <div className={`${emptyItemStyles.item} ${isBun ? (isTop ? emptyItemStyles.top : emptyItemStyles.bottom) : ''}`} >
                <p className="text text_type_main-default text_color_inactive">
                    {text}
                </p>
            </div>    
        </div>
    );
}
  
export default EmptyItem; 