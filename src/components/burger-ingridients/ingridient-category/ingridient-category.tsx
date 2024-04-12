import { ICategory } from "../../../interfaces/category-interface";
import ingridientCategoryStyles from './ingridient-category.module.css';
import Ingridient from "./ingridient/ingridient";

interface IIngridientCategoryProps {
    category: ICategory
}

const IngridientCategory = (props: IIngridientCategoryProps) => {
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
            <div className={ingridientCategoryStyles.ingridients}>
                {
                    props.category.ingridients.map((ingridient, index) => {
                        return <div key={index} className={ingridientCategoryStyles.ingridient}>
                                <Ingridient ingridient={ingridient} />
                            </div>;
                    })
                }    
            </div>
        </>
    );
}
  
export default IngridientCategory; 