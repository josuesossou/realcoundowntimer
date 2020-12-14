import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import ContdownPageList from '../components/CountdownPagesCollection'

const ContentWrapper = styled.div.attrs({
    className: 'flex justify-center w-full h-full'
})``

export default () => {
    return (
        <div className='bg-gray-100 min-h-screen'>
            <Navbar />
            <ContentWrapper>
                <ContdownPageList />
            </ContentWrapper>
        </div>
    )
}