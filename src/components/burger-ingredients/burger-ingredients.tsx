import { useCallback, useEffect, useState } from "react";
import IngredientCategory from "./ingredient-category/ingredient-category";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { IIngredientData } from "../../interfaces/selected-ingredient-interface";
import { ICategoryData } from "../../interfaces/category-interface";
import IngredientDetails from "./ingredient-details/ingredient-details";
import PropTypes from 'prop-types';

interface IBurgerIngredientsProps {
    ingredients: IIngredientData[],
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

const BurgerIngredients = (props: IBurgerIngredientsProps) => {

    const [ activeCategoryType, setActiveCategoryType ] = useState('bun');
    const [ categories, setCategories ] = useState<ICategoryData[]>([]);
    const [ modalIsVisible, setModalIsVisible ] = useState(false);
    const [ ingredientToShow, setIngredientToShow ] = useState<IIngredientData>();

    useEffect(() => {
        const groupBy = (items: IIngredientData[]): ICategoryData[] => items.reduce(
            (result: ICategoryData[], item) => {
            if (result.length === 0 || !result.find(x => x.type === item.type)) {
                result.push({
                    type: item.type,
                    ingredients: []
                });
            }
            
            const category = result.find(x => x.type === item.type);
    
            if (category) {
                category.ingredients.push(item);
            }
    
            return result;
            }, 
            [],
        );    
     
        setCategories(groupBy(props.ingredients));
    }, [props.ingredients]);

    const getTabs = useCallback(() => {
        return (<div className={burgerIngredientsStyles.tabs}>
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

    const openModal = useCallback(() => {
        setModalIsVisible(true);
    }, []);

    const closeModal = useCallback(() => {
        setModalIsVisible(false);
        setIngredientToShow(undefined);
    }, [ingredientToShow]);

    return (
        <>
            <p className="text text_type_main-large mb-5">Соберите бургер</p>
            { getTabs() }
            <div className={burgerIngredientsStyles.list}>
                {
                    categories.map((category, index) => {
                        return <IngredientCategory category={category} key={index} openModal={openModal} selectIngredientToShow={setIngredientToShow} />;
                    })
                }
            </div>
            { modalIsVisible && ingredientToShow &&
                <IngredientDetails ingredient={ingredientToShow} onClose={closeModal} />
            }
        </>
    );
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.object),
};
  
export default BurgerIngredients; 