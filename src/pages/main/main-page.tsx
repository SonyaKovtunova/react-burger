import { FC } from "react";
import { Outlet } from "react-router-dom";

import styles from './main-page.module.css';
import { createIsLoadingSelector, useAppSelector } from "../../services";
import { RevolvingDot } from "react-loader-spinner";

const MainPage: FC = () => {
   const isLoading = useAppSelector(createIsLoadingSelector);
   
   return (
      <>
         <main className={styles.main}>
            <Outlet />
         </main>
         { isLoading && <div className={styles.loaderWrapper}>
                <RevolvingDot 
                    visible
                    radius={24}
                    color="#4c4cff"
                />   
            </div>}
      </>
      
   );
 }
 
 export default MainPage;