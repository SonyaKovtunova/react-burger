import { Route, Routes, useLocation } from 'react-router-dom';
import MainPage from './pages/main/main-page';
import LoginPage from './pages/login-page/login-page';
import RegisterPage from './pages/register-page/register-page';
import ForgotPasswordPage from './pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from './pages/reset-password-page/reset-password-page';
import AppHeader from './components/app-header/app-header';
import ProfilePage from './pages/profile-page/profile-page';
import Profile from './components/profile/profile';
import Orders from './components/orders/orders';
import Order from './components/order/order';
import { ProtectedRouteElement } from './components/protected-route';
import AuthProvider from './services/auth';
import IngredientDetailsModal from './components/burger-ingredients/ingerdient-details-modal/ingredient-details-modal';
import IngredientDetailsPage from './pages/ingredient-details-page/ingredient-details-page';
import Main from './components/main/main';
import NotFoundPage from './pages/not-found-page/not-found-page';

const App = () => {
   const location = useLocation();

   return (
      <>
         <AuthProvider>
            <> 
               <AppHeader />
               <Routes location={location.state?.background || location}>
                  <Route path="/" element={<MainPage />}>
                     <Route index element={<Main />} />
                     <Route path="/ingredients/:id" element={<IngredientDetailsPage />}/>
                  </Route>
                  <Route path="/login" element={<LoginPage/>} />
                  <Route path="/register" element={<RegisterPage/>} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
                  <Route path="/reset-password" element={<ResetPasswordPage/>} />
                  <Route path="/profile" element={<ProtectedRouteElement children={<ProfilePage/>}/>}>
                     <Route index element={<Profile />} />
                     <Route path="orders" element={<Orders />} />
                     <Route path="orders/:orderNumber" element={<Order />} />
                  </Route>
                  <Route path='*' element={<NotFoundPage />} />
               </Routes>
               { 
                  location.state?.background 
                     && <Routes>
                           <Route path="/ingredients/:id" element={<IngredientDetailsModal />}/>
                        </Routes> 
               }
            </>
         </AuthProvider>
      </>
   );
}

export default App;
