import { useSelector } from "react-redux";
import { IIngredientData } from "../../interfaces/ingredient-data-interface";
import { IStoreState, useAppDispatch } from "../../services";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IngredientDetails from "../../components/burger-ingredients/ingredient-details/ingredient-details";
import { getIngredientsThunk } from "../../services/burger-ingredients";
import { RevolvingDot } from "react-loader-spinner";
import styles from './ingredient-details-page.module.css';

const IngredientDetailsPage = () => {
    const [selectedIngredient, setSelectedIngredient] = useState<IIngredientData | null>(null);
    const ingredients = useSelector<IStoreState, IIngredientData[]>(store => store.burgerIngredients.ingredients);
    const ingredientsRequest = useSelector<IStoreState>(store => store.burgerIngredients.ingredientsRequest);

    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getIngredientsThunk());
    }, [dispatch]);
    
    useEffect(() => {
        const id = params['id'];

        if (!selectedIngredient && ingredients && ingredients.length && id) {
            const ingredient = ingredients.find(x => x._id === id);

            if (ingredient) {
                setSelectedIngredient(ingredient);
            }
            else {
                navigate('/');
            }
        }
    }, [ingredients, params]);
    
    return (
    <>
        <div className="mt-15">
            { selectedIngredient && <IngredientDetails ingredient={selectedIngredient} /> }
        </div>
        { ingredientsRequest 
            &&  <div className={styles.loaderWrapper}>
                    <RevolvingDot 
                        visible
                        radius={24}
                        color="#4c4cff"
                    />   
                </div>
        }
    </>);
 }
 
 export default IngredientDetailsPage;