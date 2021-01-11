import React from 'react'
import styled from 'styled-components'
import {Navbar, CountdowPageList, Footer} from '../components'
// import Navbar from '../components/Navbar'
// import ContdownPageList from '../components/CountdownPagesCollection'


const ContentWrapper = styled.div.attrs({
    className: 'flex justify-center w-full h-full'
})``

export default () => {
    return (
        <>
            <Navbar />
            <div className='bg-gray-100 min-h-screen'>
                <ContentWrapper>
                    <CountdowPageList />
                </ContentWrapper>
            </div>
            {/* <Footer /> */}
        </>
    )
}