import { BrowserRouter as Router} from 'react-router-dom';
import AppRouter from './components/appRoute';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './style/App.css';
import './style/constStyle.css';
import { useEffect } from 'react';
import { fetchDevices, fetchType } from './http/deviceApi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBasket } from './http/basketApi';

function App() {
  const page = useSelector(state=> state.device.page);
  const basketId = useSelector(state => state.user.user.userId);
  const dispatch = useDispatch();

  useEffect(()=>{
      fetchType().then(res => {dispatch({type: "ADD_TYPES", payload: res})})
       fetchDevices().then(res => {dispatch({type:"ADD_DEVICES", payload: res})
                                       dispatch({type:"ADD_FILTER__DEVICES", payload: res})})
       fetchBasket(basketId).then( res => {let arr = (res.map(item => item.deviceId));
                                           dispatch({type: "ADD_TO_BASKET", payload: arr})
                                         })
  }, [])

  return (
    <Router>
      <NavBar />
      <AppRouter />
      <Footer />
    </Router>
  );
}

export default App;
