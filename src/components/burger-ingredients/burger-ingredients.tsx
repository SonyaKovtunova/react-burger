import { useCallback, useEffect } from "react";
import IngredientCategory from "./ingredient-category/ingredient-category";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { IIngredientData } from "../../interfaces/ingredient-data-interface";
import { ICategoryData } from "../../interfaces/category-data-interface";
import IngredientDetails from "./ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { useSelector } from "react-redux";
import { IBurgerIngredientsState, burgerIngredientsSlice, getIngredientsThunk } from "../../services/burger-ingredients";
import { useAppDispatch } from "../../services";
import { CATEGORIES } from "../../utils/constants";

const BurgerIngredients = () => {

    const { categories, currentTab, selectedIngredient } = useSelector<{ burgerIngredients: IBurgerIngredientsState }, { categories: ICategoryData[], currentTab: string, selectedIngredient?: IIngredientData | null, }>(store => ({
        categories: store.burgerIngredients.ingredients.reduce(
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
        ),
        currentTab: store.burgerIngredients.currentTab,
        selectedIngredient: store.burgerIngredients.selectedIngredientId 
            ? store.burgerIngredients.ingredients.find(item => item._id === store.burgerIngredients.selectedIngredientId)
            : null
    }));

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getIngredientsThunk());

        if (listEl) {
            listEl.addEventListener('scroll', onScroll);
        }

        return () => {
            listEl?.removeEventListener('scroll', onScroll);
        }
    }, [dispatch]);

    useEffect(() => {
    }, [ selectedIngredient ]);
    
    const getTabs = useCallback(() => {
        return (<div className={burgerIngredientsStyles.tabs}>
            {
                CATEGORIES.map((category, index) => {
                    return <Tab 
                        key={index}
                        value={category.type} 
                        active={currentTab === category.type} 
                        onClick={ () => dispatch(burgerIngredientsSlice.actions.setTab(category.type)) }>
                        {category.name}
                    </Tab>
                })
            }
        </div>);
    }, [currentTab]);

    const closeModal = useCallback(() => {
        if (selectedIngredient) {
            dispatch(burgerIngredientsSlice.actions.clearSelectedIngredientId());
        }
    }, [selectedIngredient]);

    let listEl: HTMLDivElement | null = null;

    const onScroll = (e: Event) => {
        
    }

    return (
        <>
            <p className="text text_type_main-large mb-5">Соберите бургер</p>
            { getTabs() }
            <div className={burgerIngredientsStyles.list} ref={(ref) => listEl = ref }>
                {
                    categories.map((category, index) => {
                        return <div key={index}><IngredientCategory category={category} key={index} /></div>;
                    })
                }
            </div>
            { selectedIngredient &&
                <Modal title='Детали ингредиента' onClose={closeModal}>
                    <IngredientDetails ingredient={selectedIngredient} />
                </Modal>
            }
        </>
    );
}
  
export default BurgerIngredients; 