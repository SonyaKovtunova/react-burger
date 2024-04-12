import { IIngridient } from "../../../../interfaces/ingridient-interface";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingridientStyles from './ingridient.module.css';

interface IIngridientProps {
    ingridient: IIngridient
}

const Ingridient = (props: IIngridientProps) => {
    return (
        <div className={ingridientStyles.ingridient}>
            <img className={ingridientStyles.imageWrapper} src={props.ingridient.image}/>
            <p className="text text_type_main-default mt-1">{props.ingridient.price} <CurrencyIcon type="primary" /></p>
            <p className={`text text_type_main-default mt-1 ${ingridientStyles.textCenter}`}>{props.ingridient.name}</p>
        </div>
    );
}
  
export default Ingridient; 