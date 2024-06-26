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
import { AuthProtectedRoute } from './components/auth-protected-route';
import IngredientDetailsModal from './components/burger-ingredients/ingerdient-details-modal/ingredient-details-modal';
import IngredientDetailsPage from './pages/ingredient-details-page/ingredient-details-page';
import Main from './components/main/main';
import NotFoundPage from './pages/not-found-page/not-found-page';
import { FC, useEffect } from 'react';
import { useAppDispatch } from './services';
import { getIngredientsThunk } from './services/burger-ingredients';
import Feed from './components/feed/feed';
import OrderDetailModal from './components/order-detail-modal/order-detail-modal';
import OrderPage from './pages/order-page/order-page';
import { getUserThunk } from './services/user';

const App: FC = () => {
   const location = useLocation();
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(getUserThunk());
      dispatch(getIngredientsThunk());
   }, [dispatch]);

   return (
      <>
         <AppHeader />
         <Routes location={location.state?.background || location}>
            <Route path="/" element={<MainPage />}>
               <Route index element={<Main />} />
               <Route path="/ingredients/:id" element={<IngredientDetailsPage />}/>
               <Route path="/login" element={<AuthProtectedRoute children={<LoginPage />} anonymous />} />
               <Route path="/register" element={<AuthProtectedRoute children={<RegisterPage />} anonymous />} />
               <Route path="/forgot-password" element={<AuthProtectedRoute children={<ForgotPasswordPage />} anonymous />} />
               <Route path="/reset-password" element={<AuthProtectedRoute children={<ResetPasswordPage />} anonymous />} />
               <Route path="/profile" element={<AuthProtectedRoute children={<ProfilePage/>}/>}>
                  <Route index element={<Profile />} />
                  <Route path="orders" element={<Orders />} />
               </Route>
               <Route path="/profile/orders/:id" element={<OrderPage />} />
               <Route path="/feed">
                  <Route index element={<Feed />} />
                  <Route path=":id" element={<OrderPage />} />
               </Route>
               <Route path='*' element={<NotFoundPage />} />
            </Route>
         </Routes>
         { 
            location.state?.background 
               && <Routes>
                  <Route path="/ingredients/:id" element={<IngredientDetailsModal />}/>
                  <Route path="/feed/:id" element={<OrderDetailModal />}/>
                  <Route path="/profile/orders/:id" element={<AuthProtectedRoute children={<OrderDetailModal />}/>}/>
               </Routes> 
         }
      </>
   );
}

export default App;
