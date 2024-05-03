import { Provider } from 'react-redux';
import { store } from '../services';
import Main from './main/main';

const App = () => {
   return (
      <Provider store={store}>
         <Main />
      </Provider>
   );
}

export default App;
