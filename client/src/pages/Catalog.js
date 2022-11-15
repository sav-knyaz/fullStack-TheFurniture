import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDevices, fetchType } from '../http/deviceApi';
import { fetchBasket } from '../http/basketApi';
import Filter from '../components/modals/filter';
import '../style/Catalog.css';
import DeviceListCatalog from '../components/deviceListCatalog';
import Pageations from '../components/pageations';

function Catalog(){
    const dispatch = useDispatch();
    const page = useSelector(state=> state.device.page)
    const amountPages = useSelector(state => state.device.amountPages)
    const basketId = useSelector(state => state.user.user.userId);
    const devices = useSelector(state => state.device.filterDevice) || [];
    const [isOpen = false, setIsOpen] = useState();
    const [search, setSerch] = useState();
    const numberOfDevice = 8;

  // function handlSearch(e){
  //     const value = e.target.value;
  //     setSerch(value)
  // }
  // function searchDevice(){
  //   let deviceFilter = devices.filter(item => item.name === search);
  
  //  if(deviceFilter.length > 0){
  //   dispatch({type:"ADD_DEVICES", payload: deviceFilter})
  //  } else {
  //    setIsOpen(true)
  //    setTimeout(()=> setIsOpen(false), 1200)
  //  }
   
  // }
   
    useEffect(()=>{
       fetchType().then(res => {dispatch({type: "ADD_TYPES", payload: res})})
       fetchDevices(page).then(res => {dispatch({type:"ADD_DEVICES", payload: res})
                                       dispatch({type:"ADD_FILTER__DEVICES", payload: res})})
       fetchBasket(basketId).then( res => {let arr = (res.map(item => item.deviceId));
                                           dispatch({type: "ADD_TO_BASKET", payload: arr})
                                         })
  
    }, [page])
   
    return(
        <section className='catalog__wrapper'>
            <div className='catalog__filter'
                 onPointerUp={()=> document.querySelector('.filter__wrapper__close').classList.toggle('filter__wrapper')}>
              фильтр
            </div>
            <Filter />
            <DeviceListCatalog prop={page === 1 ? 
                                     devices.filter((item, ind) => ind >= 0 && ind < numberOfDevice)
                                     :
                                     devices.filter((item, ind) => ind >= (page - 1)* numberOfDevice && ind < page * numberOfDevice)}/>
            <Pageations amountPages={Math.ceil(devices.length / numberOfDevice)} page={page}/>
        </section>
    )
}

export default Catalog