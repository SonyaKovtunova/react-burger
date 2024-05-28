import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorItemStyles from './burger-constructor-item.module.css';
import { IIngredientData } from "../../../interfaces/ingredient-data-interface";
import { useAppDispatch } from "../../../services";
import { deleteIngredient } from "../../../services/burger-constructor";
import { XYCoord, useDrag, useDrop } from "react-dnd";
import { CATEGORIES } from "../../../utils/constants";
import { FC, RefObject, useMemo, useRef } from "react";

type TBurgerConstructorItemProps = {
    ingredient: IIngredientData;
    index?: number;
    moveIngredient: (dragIndex: number, hoverIndex: number) => void;
}

const BurgerConstructorItem: FC<TBurgerConstructorItemProps> = ({ index = 0, ingredient, moveIngredient }) => {

    const ref = useRef<HTMLDivElement>(null)

    const dispatch = useAppDispatch();

    const [, dropRef] = useDrop({
        accept: 'ingredientIndex',
        hover(item: { index: number }, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =  (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveIngredient(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    })

    const [, dragRef ] = useDrag({
        type: 'ingredientIndex',
        item: () => {
            return { id: ingredient._id, index }
        },
    })

    const removeIngredient = () => {
        dispatch(deleteIngredient(index));
    }

    dragRef(dropRef(ref))

    const isNotBun = useMemo(() => ingredient.type !== CATEGORIES[0].type, [ingredient.type]);
    const itemProps = useMemo<{ ref?: RefObject<HTMLDivElement> | undefined }>(() => isNotBun ? { ref } : {}, [isNotBun]);

    return (
        <div className={burgerConstructorItemStyles.item} {...itemProps}>
            { isNotBun ? <DragIcon type="primary" /> : <div></div> }
            <ConstructorElement 
                text={ingredient.name} 
                price={ingredient.price} 
                thumbnail={ingredient.image} 
                handleClose={removeIngredient}
                isLocked={!isNotBun}
            />   
        </div>
    );
}
  
export default BurgerConstructorItem; 