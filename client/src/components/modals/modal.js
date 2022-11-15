import { useState } from "react"
import '../../style/PopUp.css';


const Modal = (prop) => {   

    return(
        <div className={`modal__active ${prop.class}`} >
          <p className="modal__text">{prop.text}</p>
        </div>
    )
}

export default Modal