import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import { Provider } from 'react-redux';
import { store } from './services';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
   return (
      <div className="App">
         <Provider store={store}>
            <AppHeader />
            <main className='main'>
               <DndProvider backend={HTML5Backend}>
                  <div className='burgerIngredients-wrapper'>
                     <BurgerIngredients />
                  </div>
                  <div className='burgerConstructor-wrapper'>
                     <BurgerConstructor />
                  </div>   
               </DndProvider>
            </main>   
         </Provider>
      </div>
   );
}

export default App;
