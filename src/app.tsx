import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/main/main-page';
import LoginPage from './pages/login-page/login-page';
import RegisterPage from './pages/register-page/register-page';
import ForgotPasswordPage from './pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from './pages/reset-password-page/reset-password-page';
import AppHeader from './components/app-header/app-header';
import ProfilePage from './pages/profile-page/profile-page';
import Profile from './components/auth/profile/profile';
import Orders from './components/auth/orders/orders';
import Order from './components/auth/order/order';

const App = () => {
   return (
      <>
         <BrowserRouter>
            <AppHeader />
            <Routes>
               <Route path="/" element={<MainPage />} />
               <Route path="/login" element={<LoginPage/>} />
               <Route path="/register" element={<RegisterPage/>} />
               <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
               <Route path="/reset-password" element={<ResetPasswordPage/>} />
               <Route path="/profile" element={<ProfilePage/>}>
                  <Route path="" element={<Profile />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="orders/:orderNumber" element={<Order />} />
               </Route>
            </Routes>
         </BrowserRouter>
      </>
   );
}

export default App;
