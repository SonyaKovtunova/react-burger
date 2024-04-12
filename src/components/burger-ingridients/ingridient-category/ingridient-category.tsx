import React from "react";
import { ICategory } from "../../../interfaces/category-interface";

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
                <p>{this.props.category.type}</p>
                {
                    this.props.category.ingridients.map((ingridient, index) => {
                        return <p key={index}>{ingridient.name}</p>;
                    })
                }
            </>
        );
    }
}
  
export default IngridientCategory; 