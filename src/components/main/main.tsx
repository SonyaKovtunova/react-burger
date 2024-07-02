import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import mainStyles from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { FC } from 'react';

const Main: FC = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={mainStyles.grid}>
                <div className={mainStyles.burgerIngredientsWrapper}>
                    <BurgerIngredients />
                </div>
                <div className={mainStyles.burgerConstructorWrapper}>
                    <BurgerConstructor />
                </div>     
            </div>
        </DndProvider>
    );
}

export default Main;
