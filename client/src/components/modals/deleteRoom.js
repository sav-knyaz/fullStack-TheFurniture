import React, { useRef } from "react";
import { deleteRoom } from "../../http/roomApi";
import '../../style/deleteRoom.css';


function DeleteRoom(){
    const input = useRef(null);

    function closePopUp(){

    document.body.querySelector('.delete-room__wrapper').setAttribute('class','delete-room__wrapper__close');

    }
    function deleteType(){
        deleteRoom(input.current.value).catch(rej=> console.log(rej))
    
    }

    return(
        <article className='delete-room__wrapper__close'>
            <div className='delete-room__body'>
             <span className="delete-room__crest" onPointerUp={closePopUp}>╳</span>
             <p className="delete-room__title">УДАЛИТЬ КОМНАТУ</p>
                <input className='delete-room__input __input' ref={input} placeholder='НАЗВАНИЕ КОМНАТЫ'/>
                <button className='delete-room__btn __btn__red' onPointerUp={deleteType}>
                 УДАЛИТЬ
                </button>
            </div>
        </article>
    )
}

export default DeleteRoom