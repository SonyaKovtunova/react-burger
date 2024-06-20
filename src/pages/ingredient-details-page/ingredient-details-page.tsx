import { IIngredientData } from "../../interfaces/ingredient-data-interface";
import { useAppSelector } from "../../services";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IngredientDetails from "../../components/burger-ingredients/ingredient-details/ingredient-details";
import { RevolvingDot } from "react-loader-spinner";
import styles from './ingredient-details-page.module.css';

const IngredientDetailsPage: FC = () => {
    const [selectedIngredient, setSelectedIngredient] = useState<IIngredientData | null>(null);
    const ingredients = useAppSelector(store => store.burgerIngredients.ingredients);
    const ingredientsRequest = useAppSelector(store => store.burgerIngredients.ingredientsRequest);

    const navigate = useNavigate();
    const params = useParams();
    
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