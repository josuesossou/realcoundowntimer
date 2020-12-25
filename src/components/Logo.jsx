import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from './Shared'

export default () => (
    <Logo className='cursor-pointer'>
        <Link to={'/'}>
            CDTimer
        </Link>
    </Logo>
)