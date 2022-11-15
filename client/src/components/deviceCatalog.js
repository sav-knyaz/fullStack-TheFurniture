import React, { Fragment, useState } from 'react';
import { DEVICE_ROUTE, URL } from '../utils/constans';
import { useNavigate } from 'react-router-dom';
import { addToCart } from './handlBasket';
import { useSelector } from 'react-redux'
import '../style/DeviceCatalog.css';
import SliderImages from './sliderImages';
import Modal from './modals/modal';

////<SliderImages image={images} width={'20vw'} height={'100%'} />
export function salePrice(percent, devPrice){
    return Math.floor(devPrice - ((devPrice / 100) * Number(percent)))
  }

export function DeviceCatalog(props){
    const devices = props.device;
    const basketId = useSelector(state => state.user.user.userId);
    const isAuth = useSelector(state => state.user.isAuth);
    const navigate = useNavigate();
    const images = JSON.parse(devices.img);
    const [isOpen, setIsOpen] = useState(false);

    function openModal(){
      setIsOpen(true)
      setTimeout(()=> setIsOpen(false), 900)
    }
    function goToDevicePage (e){
      const btn = document.body.querySelector(`.btn_${devices.id}`);

      if(e.target === btn){return}

      navigate(DEVICE_ROUTE + '/:' + devices.id)
    }
    
  
  return(
     <div className='catalog__device-card' id={`divece-card__${devices.id}`} onPointerUp={(e)=>goToDevicePage(e)}>
       <div className='device-card__block-img'>
       <img src={'http://localhost:5040/' + images[0]} className="device-card__img"/> 
       </div>
       <p className='device-card__title'>{devices.name}</p>
       <p className='device-card__rating'>{'☆' + devices.rate}</p>
       { devices.sale === true ?
       <Fragment>
       <span className='device-card__price__cross-out'>{devices.price + '₽'}</span>
       <span className='device-card__price__sale'>{salePrice(devices.percentSale, devices.price)}₽</span>
       </Fragment>
       :
       <span className='device-card__price'>{devices.price + '₽'}</span>
       }
       {isAuth == true ?
       <span className={`device-card__btn btn_${devices.id}`} onPointerDown={()=> addToCart(devices.id, basketId)}>+</span>
       :
       <Fragment>
       { isOpen &&
       <Modal text={'ВЫ НЕ АВТОРИЗОВАННЫ'} class={'modal__catalog'}/>
       }
       <span className={`device-card__btn btn_${devices.id}`} onPointerDown={openModal}>+</span>
       </Fragment>
       }
     </div>
  )
}

export default DeviceCatalog