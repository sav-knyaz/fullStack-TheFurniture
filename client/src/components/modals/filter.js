import React, {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../style/filter.css';

function Filter(){
   const dispatch = useDispatch();
   const colorsList = useRef(null);
   const materiaList = useRef(null);
   const typeList = useRef(null);
   const inputFrom = useRef(null);
   const inputTo = useRef(null);

   const [checkBox, setCheckBox] = useState(false);
   const [selectMaterial, setSelectMaterial] = useState(null);
   const [selectColor, setSelectColor] = useState(null);
   const [selectType, setSelectType] = useState({id: null, name: 'тип товара'});
   const [rate, setRate] = useState(0);

   const arrValue = ['#value__1', '#value__2', '#value__3', '#value__4', '#value__5'];
   const arrSpacing = ['.spacing__1', '.spacing__2', '.spacing__3', '.spacing__4'];
   const devices = useSelector(state => state.device.devices);
   const types = useSelector(state => state.device.types);

   let set = new Set();
   let colorDevices = [];
   let materialDevices = [];

   
    for(let item of devices){
     set.add(item.color)
    }
    for(let item of  set){
      colorDevices.push(item)
    }
    set = new Set();
    for(let item of devices){
     set.add(item.material)
    }
    for(let item of set){
     materialDevices.push(item)
    }
   
  

   function closePopUp(){
    document.querySelector('.filter__wrapper').classList.toggle('filter__wrapper')
   }
   function checkAdmin(){
    setCheckBox(!checkBox)
    }

    function dragStart(e){
     const polzunok = e.target;
     const valueCoords = arrValue.map(item =>  Math.trunc(document.querySelector(item).getBoundingClientRect().left));
     let forward = false
     let coordsLeft = 0
    
      document.body.onpointermove = (e)=>{
         let left = e.pageX - document.querySelector('.polzunok__wrapper').getBoundingClientRect().left - polzunok.getBoundingClientRect().width / 2;
          
        if(coordsLeft < e.pageX){
            forward = true
        } else {
            forward = false
        }
        coordsLeft = e.pageX
        
        if(e.pageX > document.querySelector('.polzunok__wrapper').getBoundingClientRect().left - 7 && e.pageX < document.querySelector('.polzunok__wrapper').getBoundingClientRect().right - 7){
         polzunok.style.left = left + 'px';
        }

        
        if(valueCoords[0] < polzunok.getBoundingClientRect().left && valueCoords[0] + 3 > polzunok.getBoundingClientRect().left){
            setRate(1)
            document.querySelector(arrValue[0]).classList.toggle('active__value' , forward)
         } else if (valueCoords[1] - 7 < polzunok.getBoundingClientRect().left && valueCoords[1] + 3 > polzunok.getBoundingClientRect().left){
            setRate(2)

            document.querySelector(arrValue[1]).classList.toggle('active__value', forward)
            document.querySelector('.spacing__1').classList.toggle('active__spacing', forward)
           
         }  else if (valueCoords[2] - 7 < polzunok.getBoundingClientRect().left && valueCoords[2] + 3 > polzunok.getBoundingClientRect().left){
            setRate(3)
            
            document.querySelector(arrValue[2]).classList.toggle('active__value', forward)
            document.querySelector('.spacing__2').classList.toggle('active__spacing', forward)
           
        }  else if (valueCoords[3] - 7 < polzunok.getBoundingClientRect().left && valueCoords[3] + 3 > polzunok.getBoundingClientRect().left){
            setRate(4)
          
            document.querySelector(arrValue[3]).classList.toggle('active__value', forward)
            document.querySelector('.spacing__3').classList.toggle('active__spacing', forward)
            
        }  else if (valueCoords[4] - 20 < polzunok.getBoundingClientRect().left ){
            setRate(5)
            
            document.querySelector(arrValue[4]).classList.toggle('active__value', forward)
            document.querySelector('.spacing__4').classList.toggle('active__spacing', forward)
            
        }
      }
      

    }
    function dragStop(){
        document.body.onpointermove = null
    }

   function resetFilter(){
      setRate(0)
      setSelectColor(null)
      setSelectMaterial(null)
      setSelectType({id: null, name: 'тип товара'})
      setCheckBox(false)

      inputFrom.current.value = 0
      inputTo.current.value = 0

      document.querySelector('.polzunok__polzunok').style.left = 0 + 'px';

      for(let i = 0; i < 5; i++){
        document.querySelector(arrValue[i]).classList.toggle('active__value', false)
        i < 4 &&
        document.querySelector(arrSpacing[i]).classList.toggle('active__spacing', false)
      }

      dispatch({type:"ADD_FILTER__DEVICES", payload: devices})
   }

   function filterDevices(){
      let filteredDevices = []
      let set = new Set();
      let filteredArrays = [];
      let filteredColor = [];
      let filteredMaterial = [];
      let filteredSale = [];
      let filteredPrice = [];
      let filteredRate = [];
      let filteredType = [];
      let count = 0;
      


        if(selectColor !== null){

            filteredColor = devices.filter(item => item.color === selectColor)
            count += 1
           console.log('color', count)
        }
        if(selectMaterial !== null){

            filteredMaterial = devices.filter(item => item.material === selectMaterial)
            count += 1
            console.log('mat', count)

        }

        //фильтруем по наличию скидки на товар
        if(checkBox === true){

            filteredSale = devices.filter(item => item.sale === checkBox)
            count += 1
            console.log('sale', count)

        }
        if(selectType.id !== null){

            filteredType = devices.filter(item => item.typeId === selectType.id)
            count += 1
            console.log('type', count)

        }
        if(rate !== 0){

            filteredRate = devices.filter(item => item.rate == rate)
            count += 1
            console.log('rate', count)

        }

        //фильтруем по цене
        if(inputFrom.current.value !== '' && inputTo.current.value !== ''){

            filteredPrice = devices.filter(item => item.price >= inputFrom && item.price <= inputTo)
            count += 1
            console.log('all price', count)

        }
        if(inputFrom.current.value !== '' && inputTo.current.value == ''){

            filteredPrice = devices.filter(item => item.price >= inputFrom )
            count += 1
            console.log('from price', count)

        }
        if(inputFrom.current.value == '' && inputTo.current.value !== ''){

            filteredPrice = devices.filter(item => item.price <= inputTo)
            count += 1
            console.log('to price', count)

        }

        let filteredDevicesObj = {};
        filteredArrays = [...filteredColor, ...filteredMaterial, ...filteredPrice, ...filteredRate, ...filteredSale, ...filteredType];

        for(let item of filteredArrays){
            let name = item.id;

            if(filteredDevicesObj.hasOwnProperty(name)){
                filteredDevicesObj[name] += 1;
            } else {
                filteredDevicesObj[name] = 1
            }

        }

        filteredArrays = []

        for(let key in filteredDevicesObj){

            if(filteredDevicesObj[key] == count){
                filteredArrays.push(key)
            }

        }

        for(let item of filteredArrays){
            filteredDevices.push(devices.find(elem => elem.id == item))
        }


        // for(let item of set){
        //     filteredDevices = [...filteredDevices, item]
        // }

       dispatch({type:"ADD_FILTER__DEVICES", payload: filteredDevices})

       closePopUp()
   }
   
    return(
        <section className="filter__wrapper__close">
         <div className="filter__body">
         <span className="filter__crest" onPointerUp={closePopUp}>╳</span>
           <p className="filter__title">
            фильтр
            </p>

           <div className="filter__main">

            <div className="filter__block-color filter__block"
                 onPointerUp={()=> {colorsList.current.classList.toggle('block-color__wrapper__active')
                                     document.querySelector('.filter__block-color').classList.toggle('filter__block-color__active')}}>
               { selectColor === null ? 'цвет' : selectColor}
             <ul className="block-color__wrapper" ref={colorsList}>
              {colorDevices.map(item =>
                <li className="block-color__item"
                    onPointerUp={()=> setSelectColor(item)}>{item}</li>)}
             </ul>

             </div>


             <div className="filter__block-material filter__block"
                 onPointerUp={()=> {materiaList.current.classList.toggle('block-material__wrapper__active')
                                     document.querySelector('.filter__block-material').classList.toggle('filter__block-material__active')}}>
               { selectMaterial === null ? 'материал' : selectMaterial}
             <ul className="block-material__wrapper" ref={materiaList}>
              {materialDevices.map(item =>
                <li className="block-material__item"
                    onPointerUp={()=> setSelectMaterial(item)}>{item}</li>)}
             </ul>
             </div>


             <div className="filter__block-type filter__block"
                 onPointerUp={()=> {typeList.current.classList.toggle('block-type__wrapper__active')
                                    document.querySelector('.filter__block-type').classList.toggle('filter__block-type__active')}}>
               {selectType.name}
             <ul className="block-type__wrapper" ref={typeList}>
              {types.map(item =>
                <li className="block-type__item"
                 onPointerUp={()=> setSelectType({id: item.id, name: item.name})}
                 key={Math.random(9)}>{item.name}</li>)}
             </ul>
             </div>


             <div className="filter__block-sale">
                <div className='authorization_card__check_box' onPointerUp={checkAdmin}>
                    { checkBox &&
                    <span className='check_box__check'>✓</span>}
                </div>
                <span>Товар со скидкой?</span>
             </div>


             <div className="filter__block-price">
                <p className="block__title">стоимость</p>
                <span>от: </span>
                <input className="block-price__input" type="number" ref={inputFrom}/>
                <span>до: </span>
                <input className="block-price__input" type="number" ref={inputTo}/>
             </div>


             <div className="rating__block" onPointerUp={dragStop}>
                <p className="block__title">Рейтинг товара</p>
                <p className="rating__value">
                   { rate > 0 ? rate : 'не выбран'}
                </p>
                <div className='polzunok__wrapper' onPointerOver={dragStop}>

                    <div className="polzunok__polzunok"
                         onPointerDown={(e)=> dragStart(e)}
                         onPointerOver={dragStop}></div>

                    <span className="polzunok__value" id="value__1"></span>
                    <div className="polzunok__spacing spacing__1"></div>
                    <span className="polzunok__value" id="value__2"></span>
                    <div className="polzunok__spacing spacing__2"></div>
                    <span className="polzunok__value" id="value__3"></span>
                    <div className="polzunok__spacing spacing__3"></div>
                    <span className="polzunok__value" id="value__4"></span>
                    <div className="polzunok__spacing spacing__4"></div>
                    <span className="polzunok__value" id="value__5"></span>
                </div>
             </div>

            </div>
            
         <button className="filter__reset"
                 onPointerUp={resetFilter}>
            СБРОСИТЬ
         </button>
         <button className="filter__apply"
                 onPointerUp={filterDevices}>
            ПРИМЕНИТЬ
         </button>

         </div>

        </section>
    )
}

export default Filter