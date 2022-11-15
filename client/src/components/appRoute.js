import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Routes, Route} from 'react-router-dom';
import { adminRoutes, authRoutes, publickRoutes } from "../routes";

function AppRouter(){
    const Auth = useSelector(state => state.user.isAuth);
    const Admin = useSelector(state => state.user.user.role);

    return(
        
        <Routes>
          {Auth &&
           <Route path={authRoutes.path} element={<authRoutes.Component />} />
          }
          {Admin === 'ADMIN' &&
           <Route path={adminRoutes.path} element={<adminRoutes.Component />} />
          }
          {publickRoutes.map(item => 
           <Route key={item.path} path={item.path} element={<item.Component />} />
           )}
        </Routes>
        
    )
}

export default AppRouter