import { ICategoryData } from '../../../interfaces/category-data-interface';
import { CATEGORIES } from '../../../utils/constants';
import ingredientCategoryStyles from './ingredient-category.module.css';
import Ingredient from "./ingredient/ingredient";

interface IIngredientCategoryProps {
    category: ICategoryData,
}

const IngredientCategory = (props: IIngredientCategoryProps) => {
    return (
        <>
            <p className="text text_type_main-medium mt-10">
                { CATEGORIES.find(item => item.type === props.category.type)?.name }
            </p>
            <div className={ingredientCategoryStyles.ingredients}>
                {
                    props.category.ingredients.map(ingredient => {
                        return <div key={ingredient._id} className={ingredientCategoryStyles.ingredient}>
                                <Ingredient ingredient={ingredient} />
                            </div>;
                    })
                }    
            </div>
        </>
    );
}

export default IngredientCategory; 