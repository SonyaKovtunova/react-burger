import { Provider } from "react-redux";
import Main from "../../components/main/main";
import { store } from "../../services";

const MainPage = () => {
    return (
       <Provider store={store}>
          <Main />
       </Provider>
    );
 }
 
 export default MainPage;