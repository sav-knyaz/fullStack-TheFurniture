import React from 'react'
import { useDispatch } from 'react-redux';
import '../style/Pageations.css'

function Pageations (props){
    const {page, amountPages} = props;
    const dispatch = useDispatch()
    let arrayNumbersPages = [];

    for(let i = 1; i <= amountPages; i++){
        arrayNumbersPages.push(i)
    }

    return(
      <div className='pageations-wrapper'>
        <div className='pageations-wrapper__arrow'
             style={{transform: 'rotate(-45deg)'}}
             onPointerUp={(e)=> page - 1 == 0 ? null
                                        :  dispatch({type: 'ADD_PAGE', payload: page - 1})}></div>
        <div className='pageations-wrapper__numbers-pages'>
            {  page - 1 == 0 ?
                arrayNumbersPages.map(item => item >= page && item <= page + 2 &&
                    <div className={item == page ? 'number-page__now' : 'number-page'}
                         id={item} key={item}
                         onPointerUp={(e)=> dispatch({type: 'ADD_PAGE', payload: e.target.id})}>{item}</div>
                    )
            : page == amountPages ?
                arrayNumbersPages.map(item => item >= page - 2 && item <= page &&
                    <div className={item == page ? 'number-page__now' : 'number-page'}
                        id={item} key={item}
                        onPointerUp={(e)=> dispatch({type: 'ADD_PAGE', payload: e.target.id})}>{item}</div>
                    )
                :
                arrayNumbersPages.map(item => item >= page - 1 && item <= page + 1 &&
                    <div className={item == page ? 'number-page__now' : 'number-page'}
                         id={item} key={item}
                         onPointerUp={(e)=> dispatch({type: 'ADD_PAGE', payload: e.target.id})}>{item}</div>
                    )
            }
        </div>
        <div className='pageations-wrapper__arrow'
             style={{transform: 'rotate(135deg)'}}
             onPointerUp={(e) => page < amountPages ? dispatch({type: 'ADD_PAGE', payload: page + 1}) : null}></div>
      </div>
    )
}

export default Pageations 
