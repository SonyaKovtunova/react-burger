import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import mainStyles from './main.module.css';
import { RevolvingDot } from 'react-loader-spinner';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useAppSelector } from '../../services';
import { FC } from 'react';

const Main: FC = () => {
    const ingredientsRequest = useAppSelector(store => store.burgerIngredients.ingredientsRequest);
    const orderNumberRequest = useAppSelector(store => store.burgerConstructor.orderNumberRequest);
  
    return (
        <>
            <main className={mainStyles.main}>
                <DndProvider backend={HTML5Backend}>
                <div className={mainStyles.burgerIngredientsWrapper}>
                    <BurgerIngredients />
                </div>
                <div className={mainStyles.burgerConstructorWrapper}>
                    <BurgerConstructor />
                </div>   
                </DndProvider>
            </main>
            { (ingredientsRequest || orderNumberRequest) && <div className={mainStyles.loaderWrapper}>
                <RevolvingDot 
                    visible
                    radius={24}
                    color="#4c4cff"
                />   
            </div>}
        </>
    );
}

export default Main;
