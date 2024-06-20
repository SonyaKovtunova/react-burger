import { useAppDispatch, useAppSelector } from "../../../services";
import Modal from "../../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { FC, useCallback, useEffect } from "react";
import { clearSelectedIngredient, setSelectedIngredient } from "../../../services/burger-ingredients";
import { useNavigate, useParams } from "react-router-dom";

const IngredientDetailsModal: FC = () => {
    const selectedIngredient = useAppSelector(store => store.burgerIngredients.selectedIngredient);
    const ingredients = useAppSelector(store => store.burgerIngredients.ingredients);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const id = params['id'];

        if (!selectedIngredient && ingredients && ingredients.length && id) {
            const ingredient = ingredients.find(x => x._id === id);

            if (ingredient) {
                dispatch(setSelectedIngredient(ingredient));
            }
            else {
                navigate('/', { state: { } });
            }
        }
    }, [selectedIngredient, ingredients, params]);

    const closeModal = useCallback(() => {
        if (selectedIngredient) {
            dispatch(clearSelectedIngredient());
            navigate(-1);
        }
    }, [selectedIngredient]);
    
    return (<>
        {
            selectedIngredient &&
                <Modal title='Детали ингредиента' onClose={closeModal}>
                    <IngredientDetails ingredient={selectedIngredient} />
                </Modal>
        }
    </>);

}

export default IngredientDetailsModal;