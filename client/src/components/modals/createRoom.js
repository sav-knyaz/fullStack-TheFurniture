import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { createRoom, fetchTypeRoom } from '../../http/roomApi';
import { onKeyDown } from '../../pages/Auth';
import '../../style/createRoom.css';
import Modal from './modal';


export function showSomething(array, setOpenModal, setTextModal, setClassModal, nameClass){
            let showSmth = [];

            for(let item of array){
                showSmth = [...showSmth, `${item.id} : ${item.name} || `]
            }
            setClassModal(nameClass)
            setTextModal(showSmth)
            setOpenModal(true)
        }
export function searchDevice(devId, devices){
    const dev = devices.find(item => item.id == Number(devId));

    return dev !== undefined ? dev.name : null
}

function CreateRoom(prop){
    const typeWrapper = prop.type;
    const deviceS = useSelector(state => state.device.devices);
    const [typeRoom, setTypeRoom] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [textModal, setTextModal] = useState('');
    const [classModal, setClassModal] = useState('');
    const [checkBox, setCheckBox] = useState(false);
    const [fileBackGround, setFileBackGround] = useState(null);
    const [fileDevice, setFileDevice] = useState(null);
    const [imageBackGround, setImageBackGround] = useState([]);
    const [images, setImages] = useState([]);
    const [autoIncrementDeviceId, setAutoIncrementDeviceId] = useState(0);
    const [autoIncrementBlockPlusId, setAutoIncrementBlockPlusId] = useState(0);
    const [device, setdevice] = useState([]);
    const [background, setBackground] = useState({
        type: 'background',
        file: false,
        img: null,
        color: null
    });
    const [blockPlus, setBlockPlus] = useState([]);
    const colorInput = useRef(null);
    const nameRoomInput = useRef(null);
    const deviceIdInput = useRef(null);
    const sizeHinput = useRef(null);
    const sizeWinput = useRef(null);
    const blockPlusInput = useRef(null);
    const typeRoomInput = useRef(null);

 useEffect(()=>{
   fetchTypeRoom().then(res => setTypeRoom(res))
                  .catch(rej => console.log(rej))

 }, [])

function closeCreateRoom(){
    document.body.querySelector('.create__room').setAttribute('class', 'create__room__close')
    document.body.querySelector('.block__margin').style.margin = '0 0 0 0'
    document.body.querySelector('.block__margin').setAttribute('class', 'block__margin__close')
}

function backgroundCreate(){
    let obj = {};
    obj.color = colorInput.current.value
    obj.file = checkBox
    obj.img = fileBackGround
    
    setBackground(obj)

}

function deviceCreate(){
    const obj = {id: autoIncrementDeviceId,
                 type: 'device',
                 img: fileDevice,
                 deviceId: deviceIdInput.current.value,
                 sizeH: sizeHinput.current.value,
                 sizeW: sizeWinput.current.value,
                 left: 40,
                 top: 50};

    setdevice([...device, obj])
    setAutoIncrementDeviceId(autoIncrementDeviceId + 1)
}
function deviceDelete(id){
    let newArrDevices = device.filter(item => item.id !== id);

    setdevice(newArrDevices)
}

function createBlockPlus(){

    const obj = {id: autoIncrementBlockPlusId,
                 type: 'blockPlus',
                 deviceId: blockPlusInput.current.value,
                 left: 30,
                 top: 40};

    setBlockPlus([...blockPlus, obj])
    setAutoIncrementBlockPlusId(autoIncrementBlockPlusId + 1)
}
function blockPLusDelete(id){
    let newArrBlocks = blockPlus.filter(item => item.id !== id);

    setBlockPlus(newArrBlocks)
}
function openBlockPlus(e){
   let block = (e.target.classList.value === 'block__plus' || e.target.classList.value === 'block__text text__visible') ?
               e.target.parentNode
                 : 
               e.target;


   document.onkeydown = (e)=>{
    if(e.key === 'Enter'){
        block.classList.toggle('container__block__open')
        block.firstChild.classList.toggle('plus__none')
        block.lastChild.classList.toggle('text__visible')
    }
   }
}

function dragStart(e){
    let elem = e.target;
    const roomContainer = document.querySelector('.room__container');

     if(e.target.classList.contains('container__img')){
      elem = e.target;
      } else if( e.target.classList.contains('container__block')){
      elem = e.target
     } else if( e.target.classList.contains('block__plus')){
        elem = e.target.parentNode;
       }
 

    elem.style.position = 'absolute'
    elem.style.zIndex = 1000
    
   

    document.onpointermove = (e) =>{
        let elemLeft;
        let elemTop;
        let coordinateX = (e.pageX - roomContainer.getBoundingClientRect().left);
        let coordinateY = e.pageY
        if( elem.classList.contains('container__block')){
            console.log('plus')
         elemLeft = (coordinateX < roomContainer.getBoundingClientRect().width * 0.1) ? 
                        coordinateX + elem.offsetWidth * 2.2
                         :
                    (coordinateX > roomContainer.getBoundingClientRect().width * 0.1 && coordinateX < roomContainer.getBoundingClientRect().width * 0.2) ?
                        coordinateX + elem.offsetWidth * 2.6
                        : 
                    (coordinateX > roomContainer.getBoundingClientRect().width * 0.2 && coordinateX < roomContainer.getBoundingClientRect().width * 0.3) ?
                        coordinateX + elem.offsetWidth * 2.4
                        : 
                    (coordinateX > roomContainer.getBoundingClientRect().width * 0.3 && coordinateX < roomContainer.getBoundingClientRect().width * 0.4) ?
                        coordinateX + elem.offsetWidth * 2.3
                        :
                    (coordinateX > roomContainer.getBoundingClientRect().width * 0.4 && coordinateX < roomContainer.getBoundingClientRect().width * 0.5) ?
                        coordinateX + elem.offsetWidth * 2.5
                        :
                    (coordinateX > roomContainer.getBoundingClientRect().width * 0.5 && coordinateX < roomContainer.getBoundingClientRect().width * 0.6) ?
                        coordinateX + elem.offsetWidth * 2.8
                        :
                    (coordinateX > roomContainer.getBoundingClientRect().width * 0.6 && coordinateX < roomContainer.getBoundingClientRect().width * 0.7) ?
                        coordinateX + elem.offsetWidth * 2.9
                        :
                    (coordinateX > roomContainer.getBoundingClientRect().width * 0.7 && coordinateX < roomContainer.getBoundingClientRect().width * 0.8) ?
                        coordinateX + elem.offsetWidth * 2.8
                        :
                    (coordinateX > roomContainer.getBoundingClientRect().width * 0.8 && coordinateX < roomContainer.getBoundingClientRect().width * 0.9) ?
                        coordinateX + elem.offsetWidth * 2.7
                        :
                        coordinateX + elem.offsetWidth * 2.6


         elemTop = (coordinateY < roomContainer.getBoundingClientRect().height * 0.5) ?
                     coordinateY - elem.offsetHeight * 0.9
                     :
                     coordinateY - elem.offsetHeight * 0.9
                     

        } else {
            if(Number(elem.style.width.split('vw').join('')) <= 5){
                
            elemLeft =  (coordinateX < roomContainer.getBoundingClientRect().width * 0.1) ? 
                            coordinateX + elem.offsetWidth * 0.8
                                :
                        (coordinateX > roomContainer.getBoundingClientRect().width * 0.1 && coordinateX < roomContainer.getBoundingClientRect().width * 0.2) ?
                            coordinateX + elem.offsetWidth * 0.6
                            : 
                        (coordinateX > roomContainer.getBoundingClientRect().width * 0.2 && coordinateX < roomContainer.getBoundingClientRect().width * 0.3) ?
                            coordinateX + elem.offsetWidth * 0.5
                            : 
                        (coordinateX > roomContainer.getBoundingClientRect().width * 0.3 && coordinateX < roomContainer.getBoundingClientRect().width * 0.4) ?
                            coordinateX + elem.offsetWidth * 0.5
                            :
                        (coordinateX > roomContainer.getBoundingClientRect().width * 0.4 && coordinateX < roomContainer.getBoundingClientRect().width * 0.5) ?
                            coordinateX + elem.offsetWidth * 0.5
                            :
                        (coordinateX > roomContainer.getBoundingClientRect().width * 0.5 && coordinateX < roomContainer.getBoundingClientRect().width * 0.6) ?
                            coordinateX + elem.offsetWidth * 0.4
                            :
                        (coordinateX > roomContainer.getBoundingClientRect().width * 0.6 && coordinateX < roomContainer.getBoundingClientRect().width * 0.7) ?
                            coordinateX + elem.offsetWidth * 0.4
                            :
                        (coordinateX > roomContainer.getBoundingClientRect().width * 0.7 && coordinateX < roomContainer.getBoundingClientRect().width * 0.8) ?
                            coordinateX + elem.offsetWidth * 0.3
                            :
                        (coordinateX > roomContainer.getBoundingClientRect().width * 0.8 && coordinateX < roomContainer.getBoundingClientRect().width * 0.9) ?
                            coordinateX + elem.offsetWidth * 0.2
                            :
                            coordinateX + elem.offsetWidth * 0.2


            elemTop = (coordinateY < roomContainer.getBoundingClientRect().height * 0.5) ?
                        coordinateY + elem.offsetHeight * 0.2
                        :
                        coordinateY + elem.offsetHeight * 0.4
            }else {
                elemLeft =  (coordinateX < roomContainer.getBoundingClientRect().width * 0.1) ? 
                            coordinateX - elem.offsetWidth 
                                :
                        (coordinateX > roomContainer.getBoundingClientRect().width * 0.1 && coordinateX < roomContainer.getBoundingClientRect().width * 0.2) ?
                            coordinateX - elem.offsetWidth * 0.3
                            : 
                        (coordinateX > roomContainer.getBoundingClientRect().width * 0.2 && coordinateX < roomContainer.getBoundingClientRect().width * 0.4) ?
                            coordinateX - elem.offsetWidth * 0.2
                            : 
                        (coordinateX > roomContainer.getBoundingClientRect().width * 0.4 && coordinateX < roomContainer.getBoundingClientRect().width * 0.5) ?
                            coordinateX - elem.offsetWidth * 0.1
                            :
                        (coordinateX > roomContainer.getBoundingClientRect().width * 0.5 && coordinateX < roomContainer.getBoundingClientRect().width ) ?
                            coordinateX - elem.offsetWidth * 0.3
                            :
                            coordinateX - elem.offsetWidth * 0.3


            elemTop = (coordinateY < roomContainer.getBoundingClientRect().height * 0.5) ?
                        coordinateY - elem.offsetHeight * 0.2
                        :
                        coordinateY - elem.offsetHeight * 0.4
            } 
        }
        
       elemLeft = elemLeft / Math.round(window.innerWidth / 100)
       elemTop = elemTop / Math.round(window.innerHeight / 100)
       
       if(elemLeft > 96 || elemLeft < 4 || elemTop > 101 || elemTop < 8){
          if( elem.classList.contains('container__img') ){
             deviceDelete( Number(elem.id.split('device__').join('')) )
             document.onpointermove = null
          } else if( elem.classList.contains('container__block') ){
             blockPLusDelete( Number(elem.id.split('block__').join('')) )
             document.onpointermove = null
          }
       } else {
       elem.style.left = elemLeft + 'vw'
       elem.style.top = elemTop + 'vh'
       }
    }

}

function dragStop(e){
    document.onpointermove = null;

    let elem = e.target,
        containerImage = false;
     if(e.target.classList.contains('container__img')){
      containerImage = true
      elem = e.target;
      } else if(e.target.classList.contains('container__block')){
      elem = e.target
     } else if( e.target.classList.contains('block__plus')){
        elem = e.target.parentNode;
       }


    let arrDevices = [],
        deviceItem = [],
        blockPlusItem = [],
        arrBlockPlus = [],
        elemId = containerImage ? Number(elem.id.split('device__').join('')) : Number(elem.id.split('block__').join(''));

    if(containerImage === true){
        deviceItem = device.find(item => item.id == elemId);
        arrDevices = device.filter(item => item.id !== elemId);
    } else {
        blockPlusItem = blockPlus.find(item => item.id == elemId);
        arrBlockPlus = blockPlus.filter(item => item.id !== elemId);
    }

   let elemLeft = elem.style.left.split('vw').join('')
   let elemTop = elem.style.top.split('vh').join('')
    
       if(containerImage === true){
        deviceItem.left = elemLeft;
        deviceItem.top = elemTop;
    } else {
        blockPlusItem.left = elemLeft;
        blockPlusItem.top = elemTop;
    }

if(containerImage){
    setdevice([...arrDevices, deviceItem])
} else {
    setBlockPlus([...arrBlockPlus, blockPlusItem])  
}

}

function actionFile(e){
    if(!['image/jpg', 'image/png', 'image/jpag', 'image/jpeg', 'image/gif'].includes(e.target.files[0].type)){
       setTextModal('Не корректный тип файла!')
       setClassModal('modal__createRoom')
       setOpenModal(true)
       setTimeout(()=> setOpenModal(false), 2000)
        return
    }

    if(e.target === document.querySelector('.background__create__image')){
        setImageBackGround([...imageBackGround, e.target.files[0]])
        } else {
        setImages([...images, e.target.files[0]])
        }

    let fileReader = new FileReader();
      
       fileReader.readAsDataURL(e.target.files[0])
       fileReader.onload = (e)=>{
        if(e.target === document.querySelector('.background__create__image')){
        setFileBackGround(e.target.result)
        } else {
        setFileDevice(e.target.result)
        }

       }

}
function sendRoom(){
    let formData = new FormData();

    formData.append('background', JSON.stringify(background))
    formData.append('devices', JSON.stringify(device))
    for(let item of images){
    formData.append(`img`, item)
    }
    formData.append('blockPlus', JSON.stringify(blockPlus))
    formData.append('name', nameRoomInput.current.value)
    formData.append('typeRoomId', typeRoomInput.current.value)
    
     createRoom(formData).catch(rej=> console.log(rej))
}


    return(
        <Fragment>
        <article className='create__room__close'>
            { openModal === true &&
             <Modal text={textModal} class={classModal} />
            }
            <span onPointerUp={closeCreateRoom} className={'room__crest'}>╳</span>
          <div className='room__container' 
               style={{ backgroundColor: background.file === false ? background.color : 'none'}}>
                {background.file &&
                <img src={background.img} className='container__background-img'/>
            
                }
            {
                device.map(item => 
                    <img src={item.img} id={`device__${item.id}`}
                         className={`container__img`} key={Math.random(9)}
                         onPointerDown={(e)=> dragStart(e)}
                         onPointerUp={(e)=> dragStop(e)}
                         style={{width: item.sizeW + 'vw', height: item.sizeH + 'vh', position: 'absolute', left:  item.left < 5 ? 6 + 'vw' : item.left + 'vw', top: item.top < 10 ? 15 + 'vh' : item.top + 'vh'}}/>)
            }
            {
                blockPlus.map(item =>
                    <div className='container__block' key={Math.random(9)}
                         onPointerDown={(e)=> dragStart(e)}
                         onPointerUp={(e)=> dragStop(e)}
                         onMouseOver={(e)=> openBlockPlus(e)}
                         id={`block__${item.id}`}
                         style={{position: 'absolute', left: item.left < 5 ? 6 + 'vw' : item.left + 'vw', top: item.top < 10 ? 15 + 'vh' : item.top + 'vh'}}>
                        <span className='block__plus'>+</span>
                        <span className='block__text'>{searchDevice(item.deviceId, deviceS)}</span>
                    </div>)
            }
          </div>

          <div className='room__wrapper__input'>
            <div className='room__background__create'>
                <p className='background__create__title'>BACKGROUND</p>
                <input type={'color'} className='background__create__color __input' ref={colorInput}/>
                <label className='background__create__lable'>
                    Фоном будет изображение?
                <input type={'checkbox'} className='background__create__checkbox __input'
                       onChange={()=> setCheckBox(!checkBox)}/>
                </label>
                <input type={'file'} className='background__create__image __input'
                        onChange={(e)=> actionFile(e)}/>
                <button className='background__create__btn __btn__room __btn__grey' onPointerUp={backgroundCreate}>
                    ПРИМЕНИТЬ
                </button>
            </div>

            <div className='room__device__create'>
                <p className='device__create__title'>РАЗМЕЩЕНИЕ ТОВАРА</p>
                <input type={'text'} className='device__create__device-id __input__text __input' 
                      placeholder='id товара' ref={deviceIdInput}
                      onFocus={()=> showSomething(deviceS, setOpenModal, setTextModal, setClassModal, 'modal__createRoom__device-list')} 
                      onBlur={()=> setOpenModal(false)}/>
                <input type={'file'} className='device__create__image'  onChange={(e)=> actionFile(e)}/>
                <input type={'number'} className='device__create__size__w __input__text __input' placeholder='ширина изображения' ref={sizeWinput}/>
                <input type={'number'} className='device__create__size__h __input__text __input' placeholder='высота изображения' ref={sizeHinput}/>
                <button className='device__create__btn __btn__room __btn__grey' onPointerUp={deviceCreate}>
                        ПРИМЕНИТЬ
                </button>
            </div>

            <div className='room__plus-box'>
                <p className='plus-box__title'>БЛОК С ИНФОРМАЦИЕЙ О ТОВАРЕ</p>
                <input type={'number'} placeholder='id девайса'  className='plus-box__device-id __input__text __input'
                      ref={blockPlusInput}
                      onFocus={()=> showSomething(deviceS, setOpenModal, setTextModal, setClassModal, 'modal__createRoom__device-list')} 
                      onBlur={()=> setOpenModal(false)}/>
                <button className='plus-box__btn __btn__room __btn__grey' onPointerUp={createBlockPlus}>
                    ПРИМЕНИТЬ
               </button>
            </div>
            
            <div className='room__plus-box'>
                <p className='plus-box__title'>ТИП КОМНАТЫ</p>
                <input type={'number'} placeholder='id типа комнаты'
                     className='plus-box__device-id __input__text __input'
                      ref={typeRoomInput} 
                      onFocus={()=> showSomething(typeRoom, setOpenModal, setTextModal, setClassModal, 'modal__createRoom__device-list')}
                      onBlur={()=> setOpenModal(false)} />
                      <input placeholder='название комнаты'
                        className='plus-box__device-id __input__text __input'
                        ref={nameRoomInput} />
            </div>
          </div>
          <button className='room__btn__save __btn__green' onPointerUp={sendRoom}>
                СОХРАНИТЬ КОМНАТУ
          </button>
        </article>
        <div className='block__margin__close'></div>
        </Fragment>
    )
}

export default CreateRoom