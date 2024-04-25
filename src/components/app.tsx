import AppHeader from './app-header/app-header';
import BurgerConstructor from './burger-constructor/burger-constructor';
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import { Provider } from 'react-redux';
import { store } from '../services';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import appStyles from './app.module.css';

const App = () => {
   return (
      <Provider store={store}>
         <AppHeader />
         <main className={appStyles.main}>
            <DndProvider backend={HTML5Backend}>
               <div className={appStyles.burgerIngredientsWrapper}>
                  <BurgerIngredients />
               </div>
               <div className={appStyles.burgerConstructorWrapper}>
                  <BurgerConstructor />
               </div>   
            </DndProvider>
         </main>   
      </Provider>
   );
}

export default App;
