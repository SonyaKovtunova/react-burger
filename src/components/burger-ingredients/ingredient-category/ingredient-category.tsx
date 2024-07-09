import { FC } from 'react';
import { ICategoryData } from '../../../interfaces/category-data-interface';
import { CATEGORIES } from '../../../utils/constants';
import ingredientCategoryStyles from './ingredient-category.module.css';
import Ingredient from "./ingredient/ingredient";

type TIngredientCategoryProps = {
    category: ICategoryData;
}

const IngredientCategory: FC<TIngredientCategoryProps> = ({ category }) => {
    return (
        <>
            <p className="text text_type_main-medium mt-10" data-category={category.type}>
                { CATEGORIES.find(item => item.type === category.type)?.name }
            </p>
            <div className={ingredientCategoryStyles.ingredients}>
                {
                    category.ingredients.map(ingredient => {
                        return <div key={ingredient._id} className={ingredientCategoryStyles.ingredient} data-ingredient-id={ingredient._id}>
                                <Ingredient ingredient={ingredient} />
                            </div>;
                    })
                }    
            </div>
        </>
    );
}

export default IngredientCategory; 