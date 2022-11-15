import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRooms, fetchOneRoom, fetchTypeRoom } from '../http/roomApi';
import { fetchDevices } from '../http/deviceApi';
import { searchDevice } from '../components/modals/createRoom';
import "../style/Main.css";
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/constans';



function Main(){
  const [room, setRoom] = useState(null);
  const page = useSelector(state=> state.device.page)
  const rooms = useSelector(state => state.room.rooms)
  const showRoom = useSelector(state => state.room.showTheRoom);
  const [typeRoom, setTypeRoom] = useState()
  const devices = useSelector(state=> state.device.devices)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    fetchOneRoom(showRoom).then(res=>{ 
    let det = JSON.parse(res.details);
        setRoom({ name: res.name, 
                  typeRoomId: res.typeRoomId,
                  details: det.map(item => JSON.parse(item)) }) }
                                        )
    
    fetchTypeRoom().then(res=> {dispatch({type:'ADD__TYPE__ROOMS', payloade: res}) 
                                setTypeRoom(res)})
    
  }, [showRoom])

  function openBlockPlus(e){
    let block = (e.target.classList.value === 'block__plus' || e.target.classList.value === 'block__text text__visible') ?
                e.target.parentNode
                  : 
                e.target;
 
         block.classList.toggle('container__block__open')
         block.firstChild.classList.toggle('plus__none')
         block.lastChild.classList.toggle('text__visible')
     
 }

 
 room !== null && console.log(room.details.filter(item => Array.isArray(item) === true))
  return(
      <section className='main__wrapper'>
        { room !== null &&
        <Fragment>
        <h6 className='main__title'>{room.name}</h6>
        <article className='main__body'
          style={{ backgroundColor: room.details[0].file === false ? room.details[0].color : 'none'}}>
        {
          room.details.filter(item => Array.isArray(item) === true)
                      .find(item => item[0].type === 'device')
                      .map(item => 
              <img src={'http://localhost:5040/' + item.img} className='body__device'
               style={{position: 'absolute', left: item.left + 'vw', top: item.top + 'vh', width: item.sizeW + 'vw', height: item.sizeH + 'vh'}}
               />)
        }
        {
          room.details.filter(item => Array.isArray(item) === true)
                      .find(item=> item[0].type === 'blockPlus')
                      .map(item =>
                        <div className='container__block' key={Math.random(9)}
                        onPointerUp={(e) => openBlockPlus(e)}
                         id={`block__${item.id}`}
                         style={{position: 'absolute', left: item.left < 5 ? 6 + 'vw' : item.left + 'vw', top: item.top < 10 ? 15 + 'vh' : item.top + 'vh'}}>
                        <span className='block__plus'>+</span>
                        <span className='block__text'>
                            {searchDevice(item.deviceId, devices)}
                        </span>
                    </div>)
        }
        </article>
        </Fragment>
        }
      </section>
  )
}

export default Main