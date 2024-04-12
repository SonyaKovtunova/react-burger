import React from "react";
import { ICategory } from "../../../interfaces/category-interface";
import ingridientCategoryStyles from './ingridient-category.module.css';
import Ingridient from "./ingridient/ingridient";

interface IIngridientCategoryProps {
    category: ICategory
}

class IngridientCategory extends React.Component<IIngridientCategoryProps, any> {
    constructor(props: IIngridientCategoryProps) {
        super(props);
    }

    render() {
        return (
            <>
                <p className="text text_type_main-medium mt-10">
                    {this.props.category.type === 'bun'
                        ? 'Булки'
                        : this.props.category.type === 'sauce'
                            ? 'Соусы'
                            : 'Начинки'
                    }
                </p>
                <div className={ingridientCategoryStyles.ingridients}>
                    {
                        this.props.category.ingridients.map((ingridient, index) => {
                            return <div key={index} className={ingridientCategoryStyles.ingridient}>
                                    <Ingridient ingridient={ingridient} />
                                </div>;
                        })
                    }    
                </div>
                
            </>
        );
    }
}
  
export default IngridientCategory; 