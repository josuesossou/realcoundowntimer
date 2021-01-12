import React from 'react'
import { Navbar, Feedback, Footer } from '../components'
import { ContentWrapper } from '../components/Shared'

export default () => {
    return (
        <div className='bg-gray-100 min-h-screen flex flex-col'>
            <Navbar />
            <ContentWrapper>
                <Feedback />
            </ContentWrapper>
            <Footer />
        </div>
    )
}