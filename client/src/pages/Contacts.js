import React, { useState } from 'react'
import '../style/Contacts.css'

function Contacts(){
    const [network, setNetwork] = useState([
                                        {title: 'WHATSAAP', link: '#'},
                                        {title: 'TELEGRAM', link: '#'}
                                    ])
    const [phoneNumbers, setPhoneNumbers] = useState(['+79X03X4X190', '+79X03X4X190'])
    const [eMailAdderss, setEMailAdderss] = useState(['e-mail@mail.ru', 'e-mail@yandex.ru'])


    return(
        <article className='contacts-wrapper'>
            <h3 className='contacts-wrapper__title'>ВЫ МОЖЕТЕ СВЯЗАТЬСЯ С НАМИ ЧЕРЕЗ:</h3>
            <div className='flex-container-column'>
            <div className='contacts-wrapper__column'>
                <h4 className='column__title'>СОЦИАЛЬНЫЕ СЕТИ:</h4>
                {
                    network.map(item => 
                    <a href='#' className='column__link'>
                     {item.title}
                    </a>)
                }
            </div>
            <div className='contacts-wrapper__column'>
            <h4 className='column__title'>МОБИЛЬНУЮ СВЯЗЬ:</h4>
                {
                    phoneNumbers.map(item => 
                    <a href='#' className='column__link'>
                     {item}
                    </a>)
                }
            </div>
            <div className='contacts-wrapper__column'>
            <h4 className='column__title'>ПО ЭЛЕКТОРОННОЙ ПОЧТЕ:</h4>
                {
                    eMailAdderss.map(item => 
                    <a href='#' className='column__link'>
                     {item}
                    </a>)
                }
            </div>
            <div className='contacts-wrapper__column'>
            <h4 className='column__title'>НАШ АДРЕС:</h4>
                <a className='column__link' href='https://www.google.com/maps/place/%D0%91%D0%BE%D0%BB%D1%8C%D1%88%D0%B0%D1%8F+%D0%A1%D0%B0%D0%B4%D0%BE%D0%B2%D0%B0%D1%8F+%D1%83%D0%BB.,+58,+%D0%A0%D0%BE%D1%81%D1%82%D0%BE%D0%B2-%D0%BD%D0%B0-%D0%94%D0%BE%D0%BD%D1%83,+%D0%A0%D0%BE%D1%81%D1%82%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB.,+344002/@47.2207661,39.7100104,18z/data=!4m8!1m2!2m1!1z0LrQsNC6INC00LDRgtGMINGB0YHRi9C70LrRgyDQvdCwINCz0YPQs9C7INC60LDRgNGC0YMg0YEg0LzQtdGB0YLQvtC8INC90LAg0LrQsNGA0YLQtSDQsiDRgtGN0LM!3m4!1s0x40e3b90df6bd11bf:0x1201e68cc40fa038!8m2!3d47.2204528!4d39.7108151'>
                    г.Ростов-на-Дону, ул.Садовая д ХХ
                </a>
            </div>
            </div>
        </article>
    )
}

export default Contacts