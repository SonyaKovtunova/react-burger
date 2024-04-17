import { useEffect, useState } from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import { IIngredientsResponse } from './interfaces/ingredients-response';
import { IIngredientData } from './interfaces/selected-ingredient-interface';

const URL: string = 'https://norma.nomoreparties.space/api/ingredients';

const useIngredientsFetch = () => {
   const [ ingredients, setIngredients ] = useState<IIngredientData[]>([]);

   useEffect(() => {
      const getIngredients = async () => {
         const response = await fetch(URL);
         
         if (response.ok) {
            const data = (await response.json()) as IIngredientsResponse;

            if (data.success) {
               setIngredients(data.data.map(item => item as IIngredientData));
            }
         }
      }

      getIngredients();
   }, []);

   return [ ingredients ];
}

function App() {
   const [ ingredients ] = useIngredientsFetch();

   return (
      <div className="App">
         <AppHeader />
         <main className='main'>
            <div className='burgerIngredients-wrapper'>
               <BurgerIngredients ingredients={ingredients} />
            </div>
            <div className='burgerConstructor-wrapper'>
               <BurgerConstructor ingredients={ingredients} />
            </div>
         </main>
      </div>
   );
}

export default App;
