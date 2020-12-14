import React from 'react'
import styled from "styled-components"
import { Navbar, Logo, Text, LeftArrow, RightArrow } from './Shared'

const NavlinkWrapper = styled.div.attrs({
    className: 'flex md:flex-row flex-col justify-between items-center md:w-5/6 text-gray-300 flex-wrap'
})``

export default () => {
    return (
        <Navbar>
            <NavlinkWrapper>
                <Logo>
                    CDTimer
                </Logo>

                <Text>
                    Countdown Pages
                </Text>

                <Text>
                    Login | Sign Up
                </Text>
                {/* <Text className='text-gray-800'>Login</Text> */}
            </NavlinkWrapper>
        </Navbar>
    )
}