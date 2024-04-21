import burgerConstructorStyles from './burger-constructor.module.css';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredientData } from '../../interfaces/ingredient-data-interface';
import { useCallback, useEffect, useMemo, useState } from 'react';
import OrderDetails from './order-details/order-details';
import Modal from '../modal/modal';
import { useSelector } from 'react-redux';
import { IBurgerConstructorState, createOrderThunk } from '../../services/burger-constructor';
import { IBurgerIngredientsState } from '../../services/burger-ingredients';
import { useAppDispatch } from '../../services';
import { IOrderRequest } from '../../interfaces/order-request';

const BurgerConstructor = () => {
    const [ modalIsVisible, setModalIsVisible ] = useState(false);

    const { ingredients, orderNumberIsCreated } = useSelector<{ burgerIngredients: IBurgerIngredientsState, burgerConstructor: IBurgerConstructorState }, { ingredients: IIngredientData[], orderNumberIsCreated: boolean }>(store => ({
        ingredients: store.burgerIngredients.ingredients.filter(item => store.burgerConstructor.ingredients.find(i => i._id === item._id))
            .map(item => ({...item, count: store.burgerConstructor.ingredients.find(i => i._id === item._id)?.count ?? 0 })),
        orderNumberIsCreated: !!store.burgerConstructor.orderNumber && !store.burgerConstructor.orderNumberRequest && !store.burgerConstructor.orderNumberFailed,
    }));

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (orderNumberIsCreated) {
            setModalIsVisible(true);
        }
    }, [ orderNumberIsCreated ]);

    const createOrder = useCallback(() => {
        const request: IOrderRequest = {
            ingredients: ingredients.reduce((result, item) => {
                for (let i = 0; i < item.count; i++) {
                    result.push(item._id);
                }

                return result;
            }, [] as string[])
        };

        dispatch(createOrderThunk(request));
    }, [ingredients]);

    const closeModal = useCallback(() => {
        setModalIsVisible(false);
    }, []);

    const sum = useMemo(() => 
        ingredients.reduce((result, item) => result + (item.count ?? 0) * item.price, 0) ?? 0,
    [ingredients]);

    return (
        <> 
            <div className={burgerConstructorStyles.burgerConstructor}>
                <div className={burgerConstructorStyles.list}>
                    {
                        ingredients.map((ingredient, index) => {
                            return <BurgerConstructorItem key={index} ingredient={ingredient} />
                        })
                    }    
                </div>
                <div className={burgerConstructorStyles.orderWrapper}>
                    <div></div>
                    <div className={burgerConstructorStyles.sumWrapper}>
                        <p className="text text_type_main-large">{sum} <CurrencyIcon type="primary" /></p>
                    </div>
                    <div className={burgerConstructorStyles.buttonWrapper}>
                        <Button htmlType="button" type="primary" size="large" onClick={createOrder}>
                            Оформить заказ
                        </Button>    
                    </div>
                    
                </div>
            </div>
            { modalIsVisible &&
                <Modal onClose={closeModal}>
                    <OrderDetails />
                </Modal>
            }
        </>
       
    );
}
  
export default BurgerConstructor; 