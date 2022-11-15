import React, {useState, Fragment} from 'react'
import '../../style/createDevice.css';
import { creatDevice, deleteDevice } from "../../http/deviceApi";
import { useSelector } from "react-redux";
import { changesDevice } from '../../http/deviceApi';
import { showSomething } from './createRoom';
import Modal from './modal';

function CreateDevice(prop){
    const typeActions = prop.type;
    const [action, setAction] = useState(1);
    const devices = useSelector(state => state.device.devices);
    const types = useSelector(state => state.device.types);
    const [deviceId, setDeviceId] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [typeId, setTypeID] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [file, setFile] = useState([]);
    const [id, setId] = useState();
    const [specifications, setSpecifications] = useState();
    const [specificationsDescr, setSpecificationsDescr] = useState();
    const [colorDev, setColorDev] = useState();
    const [material, setMaterial] = useState();
    const [sale, setSale] = useState(false);
    const [salePercent, setSalePercent] = useState(null);
    const [textModal, setTextModal] = useState();
    const [classModal, setClassModal] = useState();
    const [openModal, setOpenModal] = useState(false);


    function closePopUp(){
        document.body.querySelector('.create-dev__wrapper__active').setAttribute('class','create-dev__wrapper');
        
        if(typeActions === 'DELETE'){
            document.body.querySelector('.create-dev__body__delete').setAttribute('class', 'create-dev__body')
            document.body.querySelector('.create-dev__crest__delete').setAttribute('class', 'create-dev__crest')
         } 
    }

    function fileState(e){
        if(!['image/jpg', 'image/png', 'image/jpag', 'image/jpeg', 'image/gif'].includes(e.target.files[0].type)){
            setTextModal('Не корректный тип файла!')
            setClassModal('modal__createDevice')
            setOpenModal(true)
            setTimeout(()=> setOpenModal(false), 2000)
             return
         }

        if(e.target.files[0] !== undefined){
        setFile([...file, e.target.files[0]])
        }
        
    }
    
    function saleState(e){
        setSale(!sale)
      
    }
    function clearFile(){
        setFile([])
    }
    

   function createNewDevice(){
      const formData = new FormData();

      formData.append('name', name);
      formData.append('price', price);
      formData.append('typeId', typeId);
      for(let i = 0; i < file.length; i++){
        formData.append('img' + i, file[i]);
        console.log(file[i])
      }
      formData.append('description', description);
      formData.append('title', title);
      formData.append('color', colorDev);
      formData.append('material', material);
      formData.append('sale', sale);
      formData.append('percentSale', salePercent);
      formData.append('rate', 0);
      formData.append('specification', specifications);
      formData.append('specDesc', specificationsDescr);

      typeActions === 'CREATE' ?
      creatDevice(formData).then(res => console.log(res))
      :
      changesDevice(formData).then(res => console.log(res))
    closePopUp()

   }

   function removeDevice(){
     let device = devices.find(item => item.id == id);
     
       deleteDevice(device.id, JSON.parse(device.img)).then(res => console.log(res))
       closePopUp()
   }

    return(
        <div className="create-dev__wrapper">
         <div className="create-dev__body">
          <span className="create-dev__crest " onPointerUp={closePopUp}>╳</span>
          {openModal &&
          <Modal text={textModal} class={classModal} />
          }
        
          { typeActions !== 'DELETE' ?
          <Fragment>
          <h3 className="create-dev__title">{typeActions === 'CHANGES' ? 'ИЗМЕНЕНИЕ ' : 'СОЗДАНИЕ '} ТОВАРА</h3>
          <input className="create-dev__input __name __input" onChange={(e) => setName(e.target.value)} 
                 placeholder="название товара"/>
          <input className="create-dev__input __price __input" onChange={(e) => setPrice(e.target.value)} 
                 placeholder="цена" type='number'/>
          <input className="create-dev__input __type-id __input" onChange={(e) => setTypeID(e.target.value)} 
                 onFocus={()=> showSomething(types, setOpenModal, setTextModal, setClassModal, 'modal__createDevice__device-list')}
                 onBlur={()=> setOpenModal(false)}
                 placeholder="id типа товара" type='number'/>
          <input className="create-dev__input __color __input" onChange={(e) => setColorDev(e.target.value)} 
                 placeholder="цвет"/>
          <input className="create-dev__input __material __input" onChange={(e) => setMaterial(e.target.value)} 
                 placeholder="название материала"/>
          <input className="create-dev__input __specifications __input" onChange={(e) => setSpecifications(e.target.value)}
                 value="ХАРАКТЕРИСТИКИ"/>
          <textarea className="create-dev__input __specific_descrip __input" onChange={(e) => setSpecificationsDescr(e.target.value)}
                     placeholder="описание характеристик"/>
          <input className="create-dev__input __title __input" onChange={(e) => setTitle(e.target.value)} 
                placeholder="заголовок"/>
          <textarea className="create-dev__input __descrip __input" onChange={(e) => setDescription(e.target.value)}
                     placeholder="описание"/>
          <label className="create-dev__lable">Товар со скидкой: </label>
          <input className="create-dev__input __sale __input" onPointerUp={(e) => saleState(!sale)}
                 placeholder="скидка" type='checkbox'/>
          <input className="create-dev__input __sale-precent __input" onChange={(e) => setSalePercent(e.target.value)}
                 placeholder="процент скидки"/>
          { typeActions === 'CHANGES' ?
            <input className='create-dev__input __input' onChange={(e)=> setId(e.target.value)}
                   placeholder='id товара' style={{visibility: "visible"}}/>
                   :
            <input className='create-dev__input __input' onChange={(e)=> setId(e.target.value)}
                   placeholder='id товара' style={{visibility: 'hidden'}}/>
          }
          <button className="create-dev__btn __uploade__btn __btn__grey" onPointerDown={clearFile}>ОЧИСТИТЬ ИЗОБРАЖЕНИЕ</button>
          <input className="create-dev__input __img " onChange={(e) => fileState(e)} type='file' />
          <div className='create-dev__list-img'>
              { file.map(item => <span>{item.name} | </span>)}
          </div>
          <button className={`create-dev__btn ${typeActions === 'CHANGES' ? '__btn__grey' : '__btn__green'}`} onPointerUp={createNewDevice}>ДОБАВИТЬ</button>
          </Fragment>
          :
          <Fragment>
           <h3 className="create-dev__title __delete__title">УДАЛИТЬ</h3>
           <input className="create-dev__input __name __input" onChange={(e)=> setId(e.target.value)} placeholder="id товара"/>
           <button className="__delete__btn __btn__red" onPointerDown={removeDevice}>Удалить</button> 
          </Fragment>
          }
          
       </div>
     </div>
    )
}

export default CreateDevice