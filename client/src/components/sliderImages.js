import React, { useRef } from 'react';
import '../style/sliderImages.css';

function SliderImages(props){
    let images = JSON.parse(props.image);
    const imagesLength = images.length;
    const width = props.width + 'vw';
    const height = props.height + 'vh';
    const sliderLine = useRef(null);
    const btnRight = useRef(null);
    let maxScroll = imagesLength * props.width,
        scrollCurrent = 0;

  function twistSliderLeft(){
    
    if(scrollCurrent < 0){
    scrollCurrent += 40
    sliderLine.current.style.transform = `translateX(${scrollCurrent}vw) scale(0.95)`;
    setTimeout(()=>{
        sliderLine.current.style.transform = `translateX(${scrollCurrent}vw) scale(1)`;
    }, 400)
   
    }
  }
  function twistSliderRight(){
    
    if(scrollCurrent > Number('-' + maxScroll) + 40){
        scrollCurrent -= 40
    sliderLine.current.style.transform = `translateX(${scrollCurrent}vw) scale(0.95)`;
    setTimeout(()=>{
        sliderLine.current.style.transform = `translateX(${scrollCurrent}vw) scale(1)`;
    }, 400)
   
    }
}

    return(
        <div className='slider-image__wrapper'>
         <div className='slider-image__btn__wrapper __left__wrapper'>
          <div className='slider-image__btn __left__slider-btn' onPointerUp={twistSliderLeft} ></div>
         </div>
         <div className='slider-image__btn__wrapper __right__wrapper'>
          <div className='slider-image__btn __right__slider-btn' onPointerUp={twistSliderRight} ></div>
         </div>
         <div className='slider-image__wrapper__line'>
         <div className='slider-image__line' ref={sliderLine}>
         {
            images.map(item => 
                <div style={{ width: width, height: height }}>
                <img src={'http://localhost:5040/' + item} className='slider-image__image'
                      key={Math.random(9)}/>
                </div>)
         }
         </div>
         </div>
        </div>
    )
}


export default SliderImages