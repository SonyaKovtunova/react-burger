import { useState } from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngridients from './components/burger-ingridients/burger-ingridients';
import { ICategory } from './interfaces/category-interface';
import { IIngridient } from './interfaces/ingridient-interface';
import { data } from './data';
import { selectedData } from './selected-data';

function App() {
   const [selectedIngridient, setSelectedIngridient] = useState(selectedData);

   const groupBy = (items: IIngridient[]): ICategory[] => items.reduce(
      (result: ICategory[], item) => {
         if (result.length === 0 || !result.find(x => x.type === item.type)) {
            result.push({
               type: item.type,
               ingridients: []
            });
         }
         
         const category = result.find(x => x.type === item.type);

         if (category) {
            category.ingridients.push({ ingridient: item, isSelected: false, count: 0 });
         }

         return result;
      }, 
      [],
   );

   const categoryGroups = groupBy(data);

   return (
      <div className="App">
         <AppHeader />
         <main className='main'>
            <div className='burgerIngridients-wrapper'>
               <BurgerIngridients categories={categoryGroups} />
            </div>
            <div className='burgerConstructor-wrapper'>
               <BurgerConstructor selectedIngridient={selectedIngridient} />
            </div>
         </main>
      </div>
   );
}

export default App;
