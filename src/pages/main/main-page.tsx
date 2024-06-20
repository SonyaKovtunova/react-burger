import { FC } from "react";
import { Outlet } from "react-router-dom";

const MainPage: FC = () => {
   return (
      <>
         <Outlet />
      </>
   );
 }
 
 export default MainPage;