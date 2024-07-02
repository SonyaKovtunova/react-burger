import { FC, useMemo } from "react";
import { createOrderNumbersSelector, useAppSelector } from "../../../services";
import styles from './orders-by-status.module.css';

type TOrdersByStatusProps = {
    status: 'done' | 'pending';
}

function groupBy10<T>(arr: Array<T>) {
    const perChunk = 10; 
    return arr.reduce((resultArray, item, index) => { 
        const chunkIndex = Math.floor(index / perChunk);
    
        if(!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] as Array<T>;
        }
        
        resultArray[chunkIndex].push(item)
        
        return resultArray
    }, [] as Array<Array<T>>);
}

const OrdersByStatus: FC<TOrdersByStatusProps> = ({ status }) => {
    const orderNumbersByStatus = useAppSelector(createOrderNumbersSelector(status));
    const doneOrderNumberGroups = useMemo(() => orderNumbersByStatus ? groupBy10(orderNumbersByStatus) : [],[orderNumbersByStatus]);

    return (
        <div>
            <p className="text text_type_main-medium mb-6">{status === 'done' ? 'Готовы' : 'В работе'}:</p>
            <div className={styles.columns}>
                {
                    doneOrderNumberGroups.map((group, index) => (
                        <div key={index} className={`${styles.column} ${index === doneOrderNumberGroups.length - 1 ? '' : 'mr-5'}`} style={{ width: `${100 / doneOrderNumberGroups.length}%`}}>
                            {
                                group.map((number, index) => (
                                    <p key={index} className={`text text_type_digits-default ${status === 'done' ? styles.doneOrder : ''} ${index === group.length - 1 ? '' : 'mb-2'}`}>{number}</p>
                                ))
                            }
                        </div>
                    ))
                }    
            </div>
        </div>
    );
}

export default OrdersByStatus;