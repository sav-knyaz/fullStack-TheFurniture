import {useDispatch, useSelector} from 'react-redux';
import React, { Fragment, useRef, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import '../../style/NavBar.css';
import { onKeyDown } from '../../pages/Auth';

function Menu (){
    const Auth = useSelector(state => state.user.isAuth);
    const Admin = useSelector(state => state.user.user.role);
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const searchInput = useRef(null);
    const [search, setSearch] = useState();

    function focusInput(){
        searchInput.current.classList.toggle('__search-input')
        navigate('/catalog')
      }
      function searchDevice(){
          let searchLength = search.length;
          let deviceFilter = devices.filter(item => item.name === search);
  
          if(deviceFilter.length > 0){
            dispatch({type:"ADD_FILTER__DEVICES", payload: deviceFilter})
           } else {
            dispatch({type:"ADD_FILTER__DEVICES", payload: devices})
           }
      }

    return(
        <div>
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
                 onFocus={focusInput} onBlur={()=> searchInput.current.classList.toggle('__search-input')}
                  ref={searchInput} onChange={()=> {setSearch(searchInput.current.value)}}
                   onKeyDown={(e)=> onKeyDown(e, searchDevice)}/>
        </div>
    )
}

export default Menu