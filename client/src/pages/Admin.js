import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import '../style/Admin.css';
import '../style/Modal.css';
import CreateType from '../components/modals/createType';
import CreateDevice from '../components/modals/createDevice';
import CreateRoom from '../components/modals/createRoom';
import CreateTypeRoom from '../components/modals/createTypeRoom';
import DeleteRoom from '../components/modals/deleteRoom';

const Admin = ()=> {
    const dispatch = useDispatch();
  //  let popUpType = useSelector(state => state.device.popUpType);
    const ArrBtn = ['ДОБАВИТЬ ТОВАР', 'УДАЛИТЬ ТОВАР', 'ДОБАВИТЬ ТИП', 'УДАЛИТЬ ТИП',
                     'СОЗДАТЬ КОМНАТУ', 'УДАЛИТЬ КОМНАТУ', 'УДАЛИТЬ ТИП КОМНАТЫ', 'СОЗДАТЬ ТИП КОМНАТЫ',
                     'ИЗМЕНИТЬ ТОВАР', 'ИЗМЕНИТЬ ТИП ТОВАРА', 'ИЗМЕНИТЬ ТИП КОМНАТЫ'];
    const [actionType, setActionType] = useState('');
    const [actionDevice, setActionDevice] = useState('');
  //  const [actionRoom, setActionRoom] = useState('');
    const [actionDeviceChange, setActionDeviceChange] = useState(false);
    const [actionTypeRoom, setActionTypeRoom] = useState('');




    function popUp (event) {
        const btn = event.target.textContent;
        const searchElem = (className) =>{
           return document.body.querySelector(className)
        };

        switch (btn) {
            case ArrBtn[0]:
                //setActionDeviceChange(false)
                searchElem('.create-dev__wrapper').setAttribute('class', 'create-dev__wrapper__active')
                setActionDevice('CREATE')
                
                break;

            case ArrBtn[1]:
                //setActionDeviceChange(false)
                searchElem('.create-dev__wrapper').setAttribute('class', 'create-dev__wrapper__active')
                searchElem('.create-dev__body').setAttribute('class', 'create-dev__body__delete')
                searchElem('.create-dev__crest').setAttribute('class', 'create-dev__crest__delete')
                setActionDevice('DELETE')

                break;

            case ArrBtn[2]:
                searchElem('.create-type__background').setAttribute('class', 'create-type__background__active')
                setActionType('CREATE')
                break;

            case ArrBtn[3]:
                searchElem('.create-type__background').setAttribute('class', 'create-type__background__active')
                setActionType('DELETE')
                break;
            case ArrBtn[4]:
                searchElem('.create__room__close').setAttribute('class', 'create__room')
                searchElem('.block__margin__close').setAttribute('class', 'block__margin')
                let heightCreate__room = searchElem('.create__room').offsetHeight;
                searchElem('.block__margin').style.margin = `0 0 ${heightCreate__room}px 0`;
                break;
            case ArrBtn[5]:
                searchElem('.delete-room__wrapper__close').setAttribute('class', 'delete-room__wrapper')
                break;
            case ArrBtn[6]:
                searchElem('.create-type-room__wrapper').setAttribute('class', 'create-type-room__wrapper__active')
                setActionTypeRoom('DELETE')
                break;
            case ArrBtn[7]:
                searchElem('.create-type-room__wrapper').setAttribute('class', 'create-type-room__wrapper__active')
                setActionTypeRoom('CREATE')
                break;
            case ArrBtn[8]:
                searchElem('.create-dev__wrapper').setAttribute('class', 'create-dev__wrapper__active')
                 setActionDevice('CHANGES')
                break;
            case ArrBtn[9]:
                searchElem('.create-type__background').setAttribute('class', 'create-type__background__active')
                setActionType('CHANGES')
                break;
            case ArrBtn[10]:
                searchElem('.create-type-room__wrapper').setAttribute('class', 'create-type-room__wrapper__active')
                setActionTypeRoom('CHANGES')
                break;
        
            default:
                break;
        }
    }

    return(
        <Fragment>
        <section className="admin">
            { ArrBtn.map( item => 
            <button key={Math.random()} className='admin__btn __btn__grey' onPointerUp={(e)=> popUp(e)}>
                {item}
            </button>)
            }
            
              <CreateType type={actionType}/>
              <CreateDevice type={actionDevice} open={actionDeviceChange} />
        </section> 
              <CreateRoom />
              <DeleteRoom />
              <CreateTypeRoom type={actionTypeRoom} />
        </Fragment>
    )
   
}

export default Admin