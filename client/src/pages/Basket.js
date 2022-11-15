import React, {Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBasket } from '../http/basketApi';
import { fetchDevices } from '../http/deviceApi';
import { addToCart, deleteToCart, deleteToCartDevice } from '../components/handlBasket';
import btn__count from '../image/btn__count.png';
import '../style/Basket.css';


function Basket(){
    const basketId = useSelector(state => state.user.user.userId);
    let devices = useSelector(state => state.device.devices);
    const [basket, setBasket] = useState([]);

    
    useEffect(()=>{

        fetchBasket(basketId).then( res => {
            let devicesId = (res.map(item => item.deviceId));
            let arr = [];
            let set = new Set();

            for(let elem of devicesId){
                arr.push(devices.find(item => item.id == elem))
            }                        
   
    
            arr.forEach((elem, ind, arr)=>{
                const arrFilter = arr.filter(item => item.id === elem.id);
                    if(!elem.count){
                    elem.count = arrFilter.length;
                    elem.price = elem.count * elem.price;
                    } else {
                        arr.splice(ind, 1)
                    }    
                    set.add(elem)   
            })
     

          arr = [];

            for(let item of set){
                arr.push(item)
            }
          

          setBasket(arr)
       }    
     )
  }, [])

    
    function costCart(arr){
        const array = arr || [];   
        const cost = array
                    .map(item => item.price)
                    .reduce((prev, curr)=>{ return prev + curr}, 0);

  
        return cost
     }
  
  
      
 function minusDevice( id){

    deleteToCart(id, basketId);
  
    let deviceCount = basket.find(item => item.id === id);
        deviceCount.price -= (deviceCount.price/deviceCount.count)
        deviceCount.count -= 1;

        let arr = basket
        .map(item => item.id == deviceCount.id ? deviceCount : item );
   


       setBasket(arr)
 }

 function plusDevice(id){
    addToCart(id, basketId);

    let deviceCount = basket.find(item => item.id === id);
        deviceCount.price += (deviceCount.price/deviceCount.count)
        deviceCount.count += 1;

    
    let arr = basket
              .map(item => item.id == deviceCount.id ? deviceCount : item );
      //  arr = [deviceCount, ...arr];


       setBasket(arr)
  
   }

 function deleteDevice(deviceId){

    deleteToCartDevice(deviceId, basketId);
    
   const newBasket = basket.filter(({id}) => id !== deviceId);

   setBasket(newBasket)
 }
  

    return(
      <Fragment>
      {basket.length == 0 ?
          <div className='empty__basket'>
            У ВАС НЕТ ТОВАРОВ В КОРЗИНЕ
          </div>
         :
          <table className='basket__table'>
            <thead className='table__head'>
              <tr className='table__head__row'>
                  <th className='head__name-img'>НАИМЕНОВАНИЕ ТОВАРА</th>
                  <th className='head__delete'>УДАЛИТЬ</th>
                  <th className='head__count'>КОЛЛИЧЕСТВО</th>
                  <th className='head__price'>СТОИМОСТЬ</th>
              </tr>
            </thead>
            <tbody className='table__body'>
            {
              basket.map(item => item.count > 0 &&
                  <tr className='table__body__device-row'>
                      <td className='device-row__img-name'>
                          <img className={'img-name__img'} src={'http://localhost:5040/' + JSON.parse(item.img)[0]} />
                          <p className='img-name__name'>
                              {item.name}
                          </p>
                      </td>
                      <td className='device-row__delete'>
                        <div className='delete__crest' onPointerUp={()=> deleteDevice(item.id)}>╳</div>
                      </td>
                      <td className='device-row__count'>
                          <div>
                            <span>{item.count}</span>
                            <img src={btn__count} className='count__btn-plus' onPointerUp={()=> plusDevice(item.id)}/>
                            <img src={btn__count} className='count__btn-minus' onPointerUp={()=> minusDevice(item.id)}/>
                          </div>
                      </td>
                      <td className='device-row__price'>
                          <p className='price__text'>{item.price} ₽</p>
                      </td>
                  </tr>)
            }
            </tbody>
            <tfoot className='table__footer'>
              <tr>
                  <td className='table__footer__cost'>СУММА : {costCart(basket)} ₽</td>
              </tr>
            </tfoot>
          </table>}
          </Fragment>
    )
}

export default Basket