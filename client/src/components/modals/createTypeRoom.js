import React, { useRef } from "react";
import { changesTypeRoom, createTypeRoom, deleteTypeRoom } from "../../http/roomApi";
import '../../style/createTypeRoom.css';


function CreateTypeRoom(prop){
   const typeWrapper = prop.type;
   const newNameType = useRef(null);
   const idType = useRef(null);
    function closePopUp(){

    document.body.querySelector('.create-type-room__wrapper__active').setAttribute('class','create-type-room__wrapper');

    }
    function actionTypeRoom(){
        if(typeWrapper === 'DELETE'){
            deleteTypeRoom(newNameType.current.value).catch(rej=> console.log(rej))
        closePopUp()
        }
        if(typeWrapper === 'CREATE'){
         createTypeRoom(newNameType.current.value).catch(rej=> console.log(rej))
        } else {
         changesTypeRoom(newNameType.current.value, idType.current.value).catch(rej=> console.log(rej))
        }
       closePopUp()
    }

    return(
        <article className='create-type-room__wrapper'>
            <div className={typeWrapper !== 'CHANGES' ? `create-type-room__body` : `create-type-room__body__change`}>
             <span className="create-type-room__crest" onPointerUp={closePopUp}>╳</span>
             <p className="create-type-room__title">
                {typeWrapper === 'CREATE' && 'СОЗДАТЬ '}
                {typeWrapper === 'DELETE' && 'УДАЛИТЬ '}
                {typeWrapper === 'CHANGES' && 'ИЗМЕНИТЬ '}
                 ТИП КОМНАТЫ</p>
                <input className='create-type-room__input __input' placeholder="НАЗВАНИЕ КОМНАТЫ" ref={newNameType}/>
                {typeWrapper === 'CHANGES' &&
                <input className="create-type-room__input __input" placeholder="id КОМНАТЫ" type={'number'} ref={idType}/>}
                <button className={`create-type-room__btn ${typeWrapper === 'CREATE' && '__btn__green'}
                                                          ${typeWrapper === 'DELETE' && '__btn__red'}
                                                           ${typeWrapper === 'CHANGES' && '__btn__grey'} `}
                     onPointerUp={actionTypeRoom}>
                {typeWrapper === 'CREATE' && 'СОЗДАТЬ'}
                {typeWrapper === 'DELETE' && 'УДАЛИТЬ'}
                {typeWrapper === 'CHANGES' && 'ИЗМЕНИТЬ'}
                </button>
            </div>
        </article>
    )
}

export default CreateTypeRoom