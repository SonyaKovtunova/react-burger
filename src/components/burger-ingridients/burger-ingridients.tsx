import { useCallback, useEffect, useState } from "react";
import IngridientCategory from "./ingridient-category/ingridient-category";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngridientsStyles from './burger-ingridients.module.css';
import { IIngridientData } from "../../interfaces/selected-ingridient-interface";
import { ICategoryData } from "../../interfaces/category-interface";

interface IBurgerIngridientsProps {
    ingridients: IIngridientData[],
}

const CATEGORIES = [
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

const BurgerIngridients = (props: IBurgerIngridientsProps) => {

    const [ activeCategoryType, setActiveCategoryType ] = useState('bun');
    const [ categories, setCategories ] = useState<ICategoryData[]>([]);

    useEffect(() => {
        const groupBy = (items: IIngridientData[]): ICategoryData[] => items.reduce(
            (result: ICategoryData[], item) => {
            if (result.length === 0 || !result.find(x => x.type === item.type)) {
                result.push({
                    type: item.type,
                    ingridients: []
                });
            }
            
            const category = result.find(x => x.type === item.type);
    
            if (category) {
                category.ingridients.push(item);
            }
    
            return result;
            }, 
            [],
        );    
     
        setCategories(groupBy(props.ingridients));
    }, [props.ingridients]);


    const getTabs = useCallback(() => {
        return (<div className={burgerIngridientsStyles.tabs}>
            {
                CATEGORIES.map((category, index) => {
                    return <Tab 
                        key={index}
                        value={category.type} 
                        active={activeCategoryType === category.type} 
                        onClick={ () => setActiveCategoryType(category.type) }>
                        {category.name}
                    </Tab>
                })
            }
        </div>);
    }, [activeCategoryType]);

    return (
        <>
            <p className="text text_type_main-large mb-5">Соберите бургер</p>
            { getTabs() }
            <div className={burgerIngridientsStyles.list}>
                {
                    categories.map((category, index) => {
                        return <IngridientCategory category={category} key={index} />;
                    })
                }
            </div>
        </>
    );
}
  
export default BurgerIngridients; 