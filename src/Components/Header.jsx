import React from 'react'
import keep from './keep.png'

function Header() {
    const logo = <img src={keep} alt='logo' />
    return (
        <div className='header'>
            {logo}
            <h3>Keep </h3>
        </div>
    )
}

export default Header