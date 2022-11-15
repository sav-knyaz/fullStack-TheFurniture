import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchOneDevice, rateDevice } from '../http/deviceApi';
import Modal from '../components/modals/modal';
import { addToCart } from '../components/handlBasket';
import SliderImages from '../components/sliderImages';
import '../style/DevicePage.css'
import Commits from '../components/commits';
import { salePrice } from '../components/deviceCatalog';
import star_img from '../image/star.png'
import starActive_img from '../image/star-active.png'

function Device(){
     const [device, setDevice] = useState(null);
     const [info, setInfo] = useState({});
     const [commits, setCommits] = useState({});
     const basketId = useSelector(state => state.user.user.userId);
     const name = useSelector(state => state.user.user.name);
     const isAuth = useSelector(state => state.user.isAuth);
     const idDevice = window.location.pathname.split('/device/:').join('');
     const [stars, setStars] = useState(['no active', 'no active', 'no active', 'no active', 'no active']);
     const [isOpen, setIsOpen] = useState(false);
     const [textModal, setTextModal] = useState();
     
     useEffect(()=>{
        
            fetchOneDevice(idDevice)
            .then((res) => {setDevice(res.device);
                             setInfo(res.info);
                            setCommits(res.commit)})
            
     },[isOpen])


     function evaluationDevice(event){
        let star = event.target.className.split('stars__')[1];
            star = Number(star);
  
        if(isAuth == true){
        rateDevice(star, idDevice, basketId)
        .then(res => { 
                setTextModal(res)
                setIsOpen(true)
                setTimeout(()=> setIsOpen(false), 1300)})
        } else {
          setTextModal('Вы не авторизованы и не можете оценить товар.')
          setIsOpen(true)
          setTimeout(()=> setIsOpen(false), 1600)
        }
      }
      
      function hoverStars(event){
        let star = event.target.id.split('stars__')[1];
            star = Number(star);

            switch (star) {
              case 1:
                    setStars(stars.map((item, ind) => ++ind == 1 ? 'active' : 'no active'))
                break;
              case 2:
                  setStars(stars.map((item, ind) => ++ind <= 2 ? 'active' : 'no active'))
              break;
              case 3:
                  setStars(stars.map((item, ind) => ++ind <= 3 ? 'active' : 'no active'))
              break;
              case 4:
                  setStars(stars.map((item, ind) => ++ind <= 4 ? 'active' : 'no active'))
              break;
              case 5:
                  setStars(stars.map((item, ind) => ++ind <= 5 ? 'active' : 'no active'))
              break;
              default:
                break;
            }
      }
    return(
        <Fragment>
        { device !== null &&
        <div className='device-page__wrapper'>

        <h3 className="device-page__title">{device.name}</h3>

        <SliderImages image={device.img} width={40} height={40} />

        <div className='device-page__rating'>{'☆ ' + device.rate}</div>

        { device.sale == true ?
        <Fragment>
        <p className='device-page__price__cross-out'>{device.price + ' ₽'}</p>
        <p className='device-page__price'>{salePrice(device.percentSale, device.price)} ₽</p>
        </Fragment>
        :
        <p className='device-page__price'>{device.price + ' ₽'}</p>
        }

        {isAuth == true &&
          <button className='device-page__btn __btn__grey' onPointerDown={()=> addToCart(device.id, basketId)}>ДОБАВИТЬ В КОРЗИНУ</button>
        }

        <div className='device-page__description'>
        <p className='description__title'>{info.title}</p>
        <p className='description__descript'>{info.description}</p>
        </div>

        <div className='device-page__spec-desc'>
        <p className='spec-desc__title'>{info.specification}</p>
        <p className='spec-desc__descript'>{info.specDesc}</p>
        </div>

        <p className='device-page__grade'>Хотите оценить товар?</p>

        { isOpen &&
          <Modal text={textModal} class={'modal__dev_page'}/>}

        <div className='device-page__stars' onPointerDown={(e)=>evaluationDevice(e)}
             onMouseOut={()=>setStars(stars.map(item => item = 'no active'))}>
          {
            stars.map((item, index) =>
            <span key={index} className={`stars__${++index}`}>
              <img src={stars[--index] === 'no active' ? star_img : starActive_img} id={`stars__${++index}`}
                    onMouseOver={hoverStars}/>
            </span>)
          }
        </div>
        
        <Commits commits={commits} deviceId={idDevice} userId={basketId} name={name}/>
       </div>
        }
       </Fragment>
    )
}

export default Device