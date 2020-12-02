import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import ContdownPageList from '../components/CountdownPagesCollection'

const ContentWrapper = styled.div.attrs({
    className: 'flex justify-center w-full'
})``

export default () => {
    return (
        <>
            <Navbar />
            <ContentWrapper>
                <ContdownPageList />
            </ContentWrapper>
        </>
    )
}