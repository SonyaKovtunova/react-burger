import React from "react";
import { IIngridient } from "../../../../interfaces/ingridient-interface";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingridientStyles from './ingridient.module.css';

interface IIngridientProps {
    ingridient: IIngridient
}

class Ingridient extends React.Component<IIngridientProps, any> {
    constructor(props: IIngridientProps) {
        super(props);
    }

    render() {
        return (
            <div className={ingridientStyles.ingridient}>
                <img className={ingridientStyles.imageWrapper} src={this.props.ingridient.image}/>
                <p className="text text_type_main-default mt-1">{this.props.ingridient.price} <CurrencyIcon type="primary" /></p>
                <p className="text text_type_main-default mt-1">{this.props.ingridient.name}</p>
            </div>
        );
    }
}
  
export default Ingridient; 