import React, { Fragment, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate} from "react-router-dom"; 
import { LOGIN_ROUTE, REGISTRATION_ROUTE, URL } from '../utils/constans';
import '../style/Auth.css'
import { useDispatch, useSelector } from 'react-redux';
import { login, registration } from '../http/userApi';
import Modal from '../components/modals/modal';

export function onKeyDown(e, funct){
    if(e.keyCode === 13){
        funct(e)
    }
}

const Auth = ()=>{
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [nameDirty, setNameDirty] = useState(false);
    const [emailError, setEmailError] = useState('Email не может быть пустым');
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
    const [nameError, setNameError] = useState('Никнейм не может быть пустым');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [checkBox, setCheckBox] = useState(false);
    const [firstTouch, setFirstTouch] = useState(false);
    const [textModal, setTextModal] = useState();
    const [isOpen, setIsOpen] = useState(false);

    function handlBlur(e){
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        setFirstTouch(true)

        if(e.target.name === 'email'){

            if(reg.test(email) == false && email.length > 0){
                setEmailDirty(true)
                setEmailError('Введен не корректный email')
            } else if( reg.test(email) == true && email.length > 0){
                setEmailDirty(false)
                setEmailError('Email не может быть пустым')
            }

             
            if(email.length == 0){
                setEmailError('Email не может быть пустым')
                setEmailDirty(true)
             }

        } else if(e.target.name === 'password'){

            if(password.length > 0 && password.length < 4){
                setPasswordDirty(true)
                setPasswordError('Пароль должен быть больше 3 символов')
            } else {
                setPasswordError('Пароль не может быть пустым')
                if(password.length === 0){
                    setPasswordDirty(true)
                 } else {
                    setPasswordDirty(false)
                 }
            }

        } else if(e.target.name === 'name'){
          if(userName.length === 0){
            setNameDirty(true)
          } else {
            setNameDirty(false)
          }
        }

    }; 

    function handleState(e){
        if(e.target.name === 'email'){
        setEmail(e.target.value)
        } else if(e.target.name === 'password'){
        setPassword(e.target.value)
        } else if(e.target.name === 'name'){
        setUserName(e.target.value)
        }
    }
    function checkAdmin(){
        setCheckBox(!checkBox)
    }
    function badValidForm(text){
       setTextModal(text)
       setIsOpen(true)
       setTimeout(()=> setIsOpen(false), 1300)
    }
 

 async function authorization(e){

        const password = document.body.querySelector('#input__password').value;
        const email = document.body.querySelector('#input__email').value;

        
            if(isLogin){
                let error = true;
                let rejection = null;
                const user = await login(email, password).catch(rej => {rejection = rej;  error = false});
                

                if(error !== true){
                    if(rejection.massage !== null){
                        badValidForm('Указан не верный логин/пароль!')
                    } else{
                        badValidForm('Вы не заполнили поля ввода!')
                    }
                }
           
                dispatch({type: "LOGGED_IN",
                        payload: {
                            user:{
                                email: user.email,
                                role: user.role,
                                userId: user.id,
                                name: user.name
                            },
                            isAuth: true
                        }
                        });

                        navigate('/catalog')
            } else {
                const role = checkBox ? 'ADMIN' : 'USER';
                const user = await registration(email, password, userName, role).catch(rej => console.log(rej));
    
                dispatch({type: "LOGGED_IN",
                        payload: {
                            user:{
                                email: user.email,
                                role: user.role,
                                userId: user.id,
                                name: user.name
                            },
                            isAuth: true
                        }
                        });

                
                navigate('/catalog')
            }

        
    }

    

    return(
      <section className="authorization_card">
        <h3 className="authorization_card__title">{isLogin ? "Авторизация" : "Регистратиция"}</h3>
        { isOpen && 
        <Modal text={textModal} class={'modal__dev_page'}/>}
        <form onKeyDown={(e)=> firstTouch == true && emailDirty == false && passwordDirty == false ? 
                                 onKeyDown(e, authorization)
                                : 
                                 onKeyDown(e, ()=>{})}>
            {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}
            <input onBlur={handlBlur} value={email} onChange={handleState} className="authorization_card__input __input"
                   name='email' placeholder='email' id='input__email'/>
            {isLogin == false &&
            <Fragment>
            {nameDirty && <div style={{color: 'red'}}>{nameError}</div>}
            <input onBlur={handlBlur} value={userName} onChange={handleState} className="authorization_card__input __input"
                   name='name' placeholder='ваш никнейм' id='input__name'/>
            </Fragment>
            }
            {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}
            <input onBlur={handlBlur} value={password} onChange={handleState}
                    className="authorization_card__input __input" name='password' placeholder='пароль'
                    id='input__password' type={'password'} />
            { isLogin === false &&
            <Fragment>
            <div className='authorization_card__check_box' onPointerUp={checkAdmin}>
                { checkBox &&
                 <span className='check_box__check'>✓</span>}
            </div>
            <span>Вы Админ?</span>
            </Fragment>
            }
        </form>
        <div className='authorization_card__description'>
              {isLogin ?
              <p>Нет аккаунта? <a href={`${URL}${REGISTRATION_ROUTE}`}>Зарегистрируйся!</a></p>
              :
              <p>Есть аккаунт?<a href={`${URL}${LOGIN_ROUTE}`}>Войди!</a></p>}
          </div>
        { firstTouch == true && emailDirty == false && passwordDirty == false ?
            <button className='authorization_card__btn' onPointerDown={authorization}
                     onKeyDown={(e)=> onKeyDown(e, authorization)}>
                {isLogin ? 'ВОЙТИ' : 'ЗАРЕГИСТРИРОВАТЬСЯ'}
            </button>
            :
            <button className='authorization_card__btn__block __btn__grey' onPointerUp={()=>badValidForm('Вы не заполнили поля ввода!')}
                    onKeyDown={(e) => onKeyDown(e, badValidForm('Вы не заполнили поля ввода!'))}>
                {isLogin ? 'ВОЙТИ' : 'ЗАРЕГИСТРИРОВАТЬСЯ'}
            </button>
        }
      </section>
    )
}

export default Auth