import React from 'react'
import styled from "styled-components"
import { Navbar, SmallBtn, RowBox, Logo, Text } from './Shared'

const NavlinkWrapper = styled.div.attrs({
    className: 'flex md:flex-row flex-col justify-between items-center lg:w-1/2 text-gray-300 flex-wrap'
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

                <Text>Login</Text>
            </NavlinkWrapper>
        </Navbar>
    )
}