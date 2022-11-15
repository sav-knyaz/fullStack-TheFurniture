import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {createType, deleteType} from '../../http/deviceApi';
import '../../style/createType.css';


function CreateType(props){

    const actionType = props.type;
    const dispatch = useDispatch();
    const [nameType, setNameType] = useState();

    function closePopUp(){

    document.body.querySelector('.create-type__background__active').setAttribute('class','create-type__background');

    }
    function sendInStore(){
        createType(nameType).then(res => console.log(res))
        closePopUp()
      }
       function removeType(){
        deleteType(nameType).then(res => console.log(res))
        closePopUp()
      }

    return(
        <div className='create-type__background'>
            <div className='create-type__wrapper'>
                <span className="create-type__crest" onPointerUp={closePopUp}>╳</span>
                <h5 className='create-type__title'>
                    { actionType === 'CREATE'  && 'СОЗДАНИЕ ТИПА'}
                    { actionType === 'DELETE'  && 'УДАЛЕНИЕ ТИПА'}
                    { actionType === 'CHANGES'  && 'ИЗМЕНЕНИЕ ТИПА'}
                </h5>
               <input className='create-type__input __input' onChange={(e)=> setNameType(e.target.value)} 
                      placeholder='НАЗВАНИЕ ТИПА' />
               { actionType === 'CREATE' &&
                    <button className='create-type__btn __btn__green' onPointerUp={sendInStore}>
                        СОЗДАТЬ
                    </button>
                }
                { actionType === 'DELETE' &&
                    <button className='create-type__btn __btn__grey' onPointerUp={removeType}>
                        УДАЛИТЬ
                    </button>
                }
                 { actionType === 'CHANGES' &&
                    <button className='create-type__btn __btn__grey' onPointerUp={removeType}>
                        ИЗМЕНИТЬ
                    </button>
                }
            </div>
        </div>
    )
}

export default CreateType