import {useSelector} from 'react-redux'
import React from 'react';
import image1 from '../image/image1.png';
import image2 from '../image/image2.png';
import '../style/Footer.css';
import { useNavigate } from 'react-router-dom';

function Footer(){
  const Admin = useSelector(state => state.user.user.role)
  const Auth = useSelector(state => state.user.isAuth)
  const navigate = useNavigate()

    return(
        <footer className='footer'>
            <div className='footer__wrapper'>
              <div className='footer__title_block'>
                  <h2 className='footer__title'>
                    The<span className='title__weight __span'>Furniture</span>
                  </h2>
                  <a href='#' className='title_block__email-link'>
                     thefurniturestore@mail.ru
                  </a>
              </div>
              <nav className='footer__nav-bar'>
                  <ul className='nav'>
                      <li className='nav__link-btn' onPointerUp={()=> navigate('/')}>
                        ГЛАВНАЯ
                      </li>
                      <li className='nav__link-btn' onPointerUp={()=> navigate('/catalog')}>
                        КАТАЛОГ
                      </li>
                      <li className='nav__link-btn' onPointerUp={()=> navigate('/contacts')}>
                        КОНТАКТЫ
                      </li>
                      { Auth &&
                      <li className='nav__link-btn' onPointerUp={()=> navigate('/basket')}>
                        КОРЗИНА
                      </li>}
                      { Admin === 'ADMIN' &&
                      <li className='nav__link-btn' onPointerUp={()=> navigate('/admin')}>
                        АДМИНИСТРАТОРУ
                      </li>}
                  </ul>
                  <div className='nav-bar__social-network'>
                    <p className='social-network__title'>Мы в социальных сетях:</p>
                    <img className='social-network__image_1 __image' src={image1} />
                    <img className='social-network__image_2 __image' src={image2} />
                  </div>
              </nav>
            </div>
        </footer>
    )
}

export default Footer