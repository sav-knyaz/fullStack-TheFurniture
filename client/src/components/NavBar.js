import {useDispatch, useSelector} from 'react-redux';
import React, { Fragment, useRef, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { fetchAllRooms } from '../http/roomApi';
import '../style/NavBar.css';
import { onKeyDown } from '../pages/Auth';
import { fetchDevices} from '../http/deviceApi';

function NavBar(){
    const Auth = useSelector(state => state.user.isAuth);
    const Admin = useSelector(state => state.user.user.role);
    const typeRoom = useSelector(state => state.room.typeRoom);
    const page = useSelector(state => state.device.page);
    const devices = useSelector(state => state.device.devices);
    const [rooms, setRooms] = useState(null);
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const [search, setSearch] = useState();
    const searchInput = useRef(null);
    const btnBurger = useRef(null);
    const listTypeRoom = useRef(null);
    const btnBurgerWrapper = useRef(null);


    useEffect(()=>{
      fetchAllRooms().then((res)=> {
        let det = [];
        for(let item of res){
          det = [...det, JSON.parse(item.details)]
        }
        console.log(res)
        let allRooms = []
        for(let item of res){
           allRooms = [...allRooms, { name: item.name, 
                                      id: item.id,
                                      typeRoomId: item.typeRoomId,
                                      details: det.map(item => item.map(elem => JSON.parse(elem))) }
                      ]
        }

        setRooms(allRooms)
        dispatch({type:'ADD__ROOMS', payloade: allRooms})})
                     .catch(rej => console.log(rej))
       }, [])
   
    function exit(){
      dispatch({type: "NOT_LOGGED_IN", payload: false})
  }
    function focusInput(){
      searchInput.current.classList.toggle('__search-input')
      navigate('/catalog')
    }
    function focusBlur(){
      searchInput.current.classList.toggle('__search-input')

      dispatch({type:"ADD_FILTER__DEVICES", payload: devices})
    }
    function searchDevice(e){
        if(e.keyCode === 13){//item.name.toLowerCase() === searchInput.current.value.toLowerCase()
          const reg = new RegExp(searchInput.current.value, 'i')
          const filtered = devices.filter(item => item.name.match(reg))
          dispatch({type: "ADD_FILTER__DEVICES", payload: filtered})
        }
    }
    function showRoomNames(e){
        let children = e.target.childNodes;
        
        for(let i = 1; i < children.length; i++){
          
          if(children[i].classList.contains('type-name__names-rooms')){
            children[i].classList.toggle('type-name__names-rooms__visible')
          }
        }
    }
   
    
    return(
      <header className='nav-bar'>
        <ul className='nav-bar__room-menu' ref={listTypeRoom}>
          { (Array.isArray(typeRoom) && Array.isArray(rooms)) &&
            typeRoom.map(item => 
              <li className='room-menu__type-name' id={'type-name__' + item.id}
                  onPointerUp={(e)=> showRoomNames(e)}>
                {item.name}

                {
                  rooms.map(elem => elem.typeRoomId == item.id &&
                    <p className='type-name__names-rooms' id={'room-name__' + item.id}
                      onPointerUp={()=>{ dispatch({type:'SHOW__ROOM', payloade: elem.id}); console.log(elem.deviceId)}}>
                        {elem.name}
                    </p>)
                }
              </li>)
          }
        </ul>
        <div className='nav-bar__wrapper'>
         <nav className='nav-bar__nav __nav__left'>
          <div className='nav-bar__btn-burger'
               onPointerUp={()=> {btnBurger.current.classList.toggle('btn-burger__active');
                                  listTypeRoom.current.classList.toggle('room-menu__visible')}}
               onPointerDown={()=> navigate('/')}>
              <div className='btn-burger__line' ref={btnBurger}></div>
          </div>
          <p className='nav-bar__link-btn __nav__left__link-btn' onPointerUp={()=> navigate('/')}>
            ГЛАВНАЯ
            { window.location.pathname === '/' &&
            <span className='underline__link-btn'></span>
            }
          </p>
          <p className='nav-bar__link-btn __nav__left__link-btn' onPointerUp={()=> navigate('/catalog')}>
            КАТАЛОГ
            { window.location.pathname === '/catalog' &&
            <span className='underline__link-btn'></span>
            }
          </p>
          <p className='nav-bar__link-btn __nav__left__link-btn' onPointerUp={()=> navigate('/contacts')}>
            КОНТАКТЫ
            { window.location.pathname === '/contacts' &&
            <span className='underline__link-btn'></span>
            }
          </p>
         </nav>
         { Auth === true ?
         <Fragment>
          { Admin === 'ADMIN' ?
         <h1 className='nav-bar__title' style={{right: 0 + 'vw'}}>
           The<span className='title__font-weight __span'>Furniture</span>
         </h1>
         :
         <h1 className='nav-bar__title' style={{right: 7 + 'vw'}}>
           The<span className='title__font-weight __span'>Furniture</span>
         </h1>
          }
         </Fragment>
         :
         <h1 className='nav-bar__title' style={{right: 10 + 'vw'}}>
           The<span className='title__font-weight __span'>Furniture</span>
         </h1>
         }
         <nav className='nav-bar__nav __nav__right'>
          { Auth === true &&
          <Fragment>
          { Admin === 'ADMIN' &&
          <p className='nav-bar__link-btn __nav__right__link-btn' onPointerUp={()=> navigate('/admin')}>
            АДМИНИСТРАТОРУ
            { window.location.pathname === '/admin' &&
            <span className='underline__link-btn'></span>
            }
          </p>
          }
          <p className='nav-bar__link-btn __nav__right__link-btn' onPointerUp={()=> navigate('/basket')}>
            КОРЗИНА
            { window.location.pathname === '/basket' &&
            <span className='underline__link-btn'></span>
            }
          </p>
          </Fragment>
            }
           { Auth === true ?
               <p className='nav-bar__link-btn __nav__right__link-btn' onPointerDown={exit}>
                   ВЫЙТИ
               </p>
               :
               <p className='nav-bar__link-btn __nav__right__link-btn' onPointerDown={()=> navigate('/login')}>
                   ВОЙТИ
               </p>
           }         
          <input placeholder='поиск' className='nav-bar__input'
                 onFocus={focusInput} onBlur={focusBlur}
                  ref={searchInput} 
                   onKeyDown={searchDevice}/>
         </nav>
        </div>
      </header>
    )
}

export default NavBar