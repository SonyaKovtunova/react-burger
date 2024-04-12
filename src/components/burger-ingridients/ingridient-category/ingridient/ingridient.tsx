import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingridientStyles from './ingridient.module.css';
import { ISelectedIngridient } from "../../../../interfaces/selected-ingridient-interface";

interface IIngridientProps {
    ingridient: ISelectedIngridient,
}

const Ingridient = (props: IIngridientProps) => {
    return (
        <div className={ingridientStyles.ingridient}>
            <img className={ingridientStyles.imageWrapper} src={props.ingridient.ingridient.image}/>
            <p className="text text_type_main-default mt-1">{props.ingridient.ingridient.price} <CurrencyIcon type="primary" /></p>
            <p className={`text text_type_main-default mt-1 ${ingridientStyles.textCenter}`}>{props.ingridient.ingridient.name}</p>
            { props.ingridient.isSelected && <Counter count={props.ingridient.count} size="default" />}
        </div>
    );
}
  
export default Ingridient; 