import React, { useContext } from 'react'
import styled from "styled-components"
import Logo from './Logo'
import { FirebaseContext } from '../backend'
import { Link, useHistory } from 'react-router-dom'
import { LOGIN_PAGE, SIGNUP_PAGE, FEEDBACK, INSTRUCTION, HOME } from '../constants/routes'
import { Text } from './Shared'

const NavlinkWrapper = styled.div.attrs({
    className: 'flex md:flex-row flex-col justify-between items-center md:w-5/6 text-gray-300 flex-wrap'
})``
// Navbar
const Navbar = styled.div.attrs({
    className: 'w-full min-h-16 py-3 bg-gray-800 flex justify-center items-center relative '
})``

export default () => {
    const firebase = useContext(FirebaseContext)
    const history = useHistory()
    const signOut = async () => {
        history.push('/auth/signout')
    }

    return (
        <Navbar>
            <NavlinkWrapper>
                <Logo />
                <div className='flex md:flex-row flex-col'>
                    <Text className='md:mr-5 text-center'>
                        <Link to={HOME}>
                            Countdowns
                        </Link>
                    </Text>
                    <Text className='md:mr-5 text-center'>
                        <Link to={FEEDBACK}>
                            Feedback
                        </Link>
                    </Text>
                    {/* <Text className='text-center'>
                        <Link to={INSTRUCTION}>
                            Instructions
                        </Link>
                    </Text> */}
                </div>


                {firebase.getUser ?
                    (<Text>
                        Hello {firebase.getUser.email.split('@')[0]},
                        <a className='font-extrabold cursor-pointer' onClick={signOut}> Sign Out</a>
                    </Text>) 
                    : 
                    (<Text>
                        <Link to={LOGIN_PAGE}>
                            Login
                        </Link> | <Link to={SIGNUP_PAGE}>Sign Up</Link>
                    </Text>)
                }
            </NavlinkWrapper>
        </Navbar>
    )
}