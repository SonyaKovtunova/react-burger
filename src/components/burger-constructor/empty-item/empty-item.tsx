import { FC, useMemo } from 'react';
import emptyItemStyles from './empty-item.module.css';

type TEmptyItemProps = {
    isBun?: boolean;
    isTop?: boolean;
}

const EmptyItem: FC<TEmptyItemProps> = ( { isBun = false, isTop = true }) => {
    const text = useMemo<string>(() => isBun ? (isTop ? 'Верхняя булка' : 'Нижняя булка') : 'Ингредиенты', []);

    return (
        <div className={emptyItemStyles.itemWrapper}>
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