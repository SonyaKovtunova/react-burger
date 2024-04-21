import { useEffect, useState } from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import { IIngredientData } from './interfaces/selected-ingredient-interface';
import { getIngredients } from './utils/burger-api';

const URL: string = 'https://norma.nomoreparties.space/api/ingredients';

function useApiData<T>(initialValue: T, func: (...args: any[])  => Promise<[T, boolean]>): [ T, boolean ] {
   const [ data, setData ] = useState<T>(initialValue);
   const [ hasError, setHasError ] = useState(false);

   useEffect(() => {
      setHasError(false);

      const getData = async () => {
         const [ data, hasError ] = await func();

         if (hasError) {
            setHasError(true);
         }

         if (data) {
            setData(data);
         }
      }

      getData();
   }, []);

   return [ data, hasError ];
}

function App() {
   const [ ingredients, hasError ] = useApiData<IIngredientData[]>([], () => getIngredients());
   
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
