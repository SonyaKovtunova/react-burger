import { useEffect, useState } from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngridients from './components/burger-ingridients/burger-ingridients';
import { IIngridientsResponse } from './interfaces/ingridients-response';
import { IIngridientData } from './interfaces/selected-ingridient-interface';

const URL: string = 'https://norma.nomoreparties.space/api/ingredients';

const useIngridientsFetch = () => {
   const [ ingridients, setIngridients ] = useState<IIngridientData[]>([]);

   useEffect(() => {
      const getIngridients = async () => {
         const response = await fetch(URL);
         
         if (response.ok) {
            const data = (await response.json()) as IIngridientsResponse;

            if (data.success) {
               setIngridients(data.data.map(item => item as IIngridientData));
            }
         }
      }

      getIngridients();
   }, []);

   return [ ingridients ];
}

function App() {
   const [ ingridients ] = useIngridientsFetch();

   return (
      <div className="App">
         <AppHeader />
         <main className='main'>
            <div className='burgerIngridients-wrapper'>
               <BurgerIngridients ingridients={ingridients} />
            </div>
            <div className='burgerConstructor-wrapper'>
               <BurgerConstructor selectedIngridient={ingridients} />
            </div>
         </main>
      </div>
   );
}

export default App;
