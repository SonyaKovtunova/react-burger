import burgerConstructorStyles from './burger-constructor.module.css';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredientData } from '../../interfaces/ingredient-data-interface';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import OrderDetails from './order-details/order-details';
import Modal from '../modal/modal';
import { addIngredient, clearOrderNumber, createOrderThunk, sortIngredients,updateBun } from '../../services/burger-constructor';
import { useAppDispatch, useAppSelector } from '../../services';
import { IOrderRequest } from '../../interfaces/order-request';
import EmptyItem from './empty-item/empty-item';
import { useDrop } from 'react-dnd';
import { CATEGORIES, INGREDIENT_DND_NAME } from '../../utils/constants';
import BunItem from './bun-item/bun-item';
import { useNavigate } from 'react-router-dom';
import { getInredientsSum } from '../../utils/utils';

const BurgerConstructor: FC = () => {
    const [ modalIsVisible, setModalIsVisible ] = useState(false);

    const user = useAppSelector(store => store.user.user);
    const ingredients = useAppSelector(store => store.burgerConstructor.ingredients);
    const orderNumberIsCreated = useAppSelector(store => !!store.burgerConstructor.orderNumber 
        && !store.burgerConstructor.orderNumberRequest 
        && !store.burgerConstructor.orderNumberFailed);
    const bun = useAppSelector(store => store.burgerConstructor.bun);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (orderNumberIsCreated) {
            setModalIsVisible(true);
        }
    }, [ orderNumberIsCreated ]);

    const [ , dropTarget ] = useDrop({
        accept: INGREDIENT_DND_NAME,
        drop(item: { data: IIngredientData }) {
            if (item.data.type === CATEGORIES[0].type) {
                dispatch(updateBun(item.data));
            } else {
                dispatch(addIngredient(item.data));
            }
        },
    });

    const createOrder = useCallback(() => {
        if (!user) {
            navigate('login');
            return;
        }

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
        dispatch(clearOrderNumber());
    }, []);

    const sum = useMemo(() => getInredientsSum(bun ? ingredients.concat([bun, bun]) : ingredients), [bun, ingredients]);

    const moveIngredient = useCallback((dragIndex: number, hoverIndex: number) => {
        dispatch(sortIngredients({ dragIndex, hoverIndex }));
    }, []);

    return (
        <> 
            <div className={burgerConstructorStyles.burgerConstructor} ref={dropTarget} data-constructor>
                <div className={`${burgerConstructorStyles.list} custom-scroll`}>
                    {
                        bun 
                            ? <BunItem ingredient={bun} />
                            : <EmptyItem isBun />
                    }
                    {
                        ingredients.length 
                            ? ingredients.map((ingredient, index) => {
                                return <BurgerConstructorItem key={ingredient.dndUniqueId} ingredient={ingredient} index={index} moveIngredient={moveIngredient} />
                            })
                            : <EmptyItem />
                    }
                    {
                        bun 
                            ? <BunItem ingredient={bun} type='bottom' />
                            : <EmptyItem isBun isTop={false} />
                    }
                </div>
                <div className={burgerConstructorStyles.orderWrapper}>
                    <div></div>
                    <div className={burgerConstructorStyles.sumWrapper}>
                        <p className="text text_type_main-large">{sum} <CurrencyIcon type="primary" /></p>
                    </div>
                    <div className={burgerConstructorStyles.buttonWrapper} data-button="createOrder">
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