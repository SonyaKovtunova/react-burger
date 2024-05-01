import burgerConstructorStyles from './burger-constructor.module.css';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredientData } from '../../interfaces/ingredient-data-interface';
import { useCallback, useEffect, useMemo, useState } from 'react';
import OrderDetails from './order-details/order-details';
import Modal from '../modal/modal';
import { useSelector } from 'react-redux';
import { addIngredient, createOrderThunk, sortIngredients, updateBun } from '../../services/burger-constructor';
import { IStoreState, useAppDispatch } from '../../services';
import { IOrderRequest } from '../../interfaces/order-request';
import { useDrop } from 'react-dnd';
import { CATEGORIES } from '../../utils/constants';

const BurgerConstructor = () => {
    const [ modalIsVisible, setModalIsVisible ] = useState(false);

    const ingredients = useSelector<IStoreState, IIngredientData[]>(store => store.burgerConstructor.ingredients);
    const orderNumberIsCreated = useSelector<IStoreState, boolean>(store => !!store.burgerConstructor.orderNumber 
        && !store.burgerConstructor.orderNumberRequest 
        && !store.burgerConstructor.orderNumberFailed);
    const bun = useSelector<IStoreState, IIngredientData | null>(store => store.burgerConstructor.bun);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (orderNumberIsCreated) {
            setModalIsVisible(true);
        }
    }, [ orderNumberIsCreated ]);

    const [ , dropTarget ] = useDrop({
        accept: 'ingredients',
        drop(item: { data: IIngredientData }) {
            if (item.data.type === CATEGORIES[0].type) {
                dispatch(updateBun(item.data));
            } else {
                dispatch(addIngredient(item.data));
            }
        },
    });

    const createOrder = useCallback(() => {
        const request: IOrderRequest = {
            ingredients: ingredients.map(item => item._id)
        };

        if (bun) {
            request.ingredients.unshift(bun._id);
            request.ingredients.push(bun._id);
        }
        

        dispatch(createOrderThunk(request));
    }, [bun, ingredients]);

    const closeModal = useCallback(() => {
        setModalIsVisible(false);
    }, []);

    const sum = useMemo(() => 
        (bun?.price ?? 0) * 2 + ingredients.reduce((result, item) => result + item.price, 0) ?? 0,
    [bun, ingredients]);

    const moveIngredient = useCallback((dragIndex: number, hoverIndex: number) => {
        dispatch(sortIngredients({ dragIndex, hoverIndex }));
    }, []);

    return (
        <> 
            <div className={burgerConstructorStyles.burgerConstructor} ref={dropTarget}>
                <div className={`${burgerConstructorStyles.list} custom-scroll`}>
                    {
                        bun || ingredients.length 
                            ? <>
                                {bun && <BurgerConstructorItem ingredient={bun} moveIngredient={moveIngredient} />}
                                {
                                    ingredients.map((ingredient, index) => {
                                        return <BurgerConstructorItem key={ingredient.dndUniqueId} ingredient={ingredient} index={index} moveIngredient={moveIngredient} />
                                    })
                                }
                                {bun && <BurgerConstructorItem ingredient={bun} moveIngredient={moveIngredient} />}
                            </>
                            : <div className={burgerConstructorStyles.examplePlace}>
                                <p className="text text_type_main-default text_color_inactive">
                                    Перенесите сюда ингредиенты
                                </p>
                            </div>
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