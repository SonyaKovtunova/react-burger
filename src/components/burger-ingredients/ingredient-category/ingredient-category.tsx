import { Dispatch, SetStateAction } from 'react';
import { ICategoryData } from '../../../interfaces/category-interface';
import ingredientCategoryStyles from './ingredient-category.module.css';
import Ingredient from "./ingredient/ingredient";
import { IIngredientData } from '../../../interfaces/selected-ingredient-interface';

interface IIngredientCategoryProps {
    category: ICategoryData,
    openModal: () => void,
    selectIngredientToShow: Dispatch<SetStateAction<IIngredientData | undefined>>,
}

const IngredientCategory = (props: IIngredientCategoryProps) => {
    return (
        <>
            <p className="text text_type_main-medium mt-10">
                {props.category.type === 'bun'
                    ? 'Булки'
                    : props.category.type === 'sauce'
                        ? 'Соусы'
                        : 'Начинки'
                }
            </p>
            <div className={ingredientCategoryStyles.ingredients}>
                {
                    props.category.ingredients.map((ingredient, index) => {
                        return <div key={index} className={ingredientCategoryStyles.ingredient}>
                                <Ingredient ingredient={ingredient} openModal={props.openModal} selectIngredientToShow={props.selectIngredientToShow} />
                            </div>;
                    })
                }    
            </div>
        </>
    );
}
  
export default IngredientCategory; 