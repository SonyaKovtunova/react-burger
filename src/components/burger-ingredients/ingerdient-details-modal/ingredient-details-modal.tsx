import { useSelector } from "react-redux";
import { IStoreState, useAppDispatch } from "../../../services";
import { IIngredientData } from "../../../interfaces/ingredient-data-interface";
import Modal from "../../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useCallback, useEffect } from "react";
import { clearSelectedIngredient, setSelectedIngredient } from "../../../services/burger-ingredients";
import { useNavigate, useParams } from "react-router-dom";

const IngredientDetailsModal = () => {
    const selectedIngredient = useSelector<IStoreState, IIngredientData | null>(store => store.burgerIngredients.selectedIngredient);
    const ingredients = useSelector<IStoreState, IIngredientData[]>(store => store.burgerIngredients.ingredients);

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