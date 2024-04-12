import { useState } from "react";
import { ICategory } from "../../interfaces/category-interface";
import IngridientCategory from "./ingridient-category/ingridient-category";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngridientsStyles from './burger-ingridients.module.css';

interface IBurgerIngridientsProps {
    categories: ICategory[],
}

const BurgerIngridients = (props: IBurgerIngridientsProps) => {

    const [activeCategoryType, setActiveCategoryType] = useState('bun');

    const categories = [
        {
            type: 'bun',
            name: 'Булки',
        }, 
        {
            type: 'sauce',
            name: 'Соусы',
        },
        {
            type: 'main',
            name: 'Начинки',
        }
    ];

    return (
        <>
            <p className="text text_type_main-large mb-5">Соберите бургер</p>
            <div className={burgerIngridientsStyles.tabs}>
                {
                    categories.map((category, index) => {
                        return <Tab 
                            key={index}
                            value={category.type} 
                            active={activeCategoryType === category.type} 
                            onClick={ () => setActiveCategoryType(category.type) }>
                            {category.name}
                        </Tab>
                    })
                }
            </div>
            <>
                {
                    props.categories.map((category, index) => {
                        return <IngridientCategory category={category} key={index} />;
                    })
                }
            </>
        </>
    );
}
  
export default BurgerIngridients; 