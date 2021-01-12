import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Loader from './Loader'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { FirebaseContext } from '../backend'
import { Text, Separator, TextAreaBox, SmallBtn, ErrorWrapper } from './Shared'
import { HOME } from '../constants/routes'


const FeedbackWrapper = styled.div.attrs({
    className: `lg:w-4/6 text-gray-800 w-5/6
                flex flex-col justify-center items-center
                `
})`
    @media (min-width: 1536px) { 
        max-width: 1024px;
    }
`
export default () => {
    const firebase = useContext(FirebaseContext)
    const [feedback, setFeedback] = useState('')
    const [isLoading, setLoader] = useState(false)
    const [message, setMessage] = useState({ text: 'yes', show: false, success: true })

    const send = () => {
        setLoader(true)

        firebase.sendFeedbackData(feedback, uuidv4()).then(() => {
            setLoader(false)
            setMessage({
                text: "Feedback sent",
                show: true,
                success: true
            })
        })
    }

    return (
        <>
            {isLoading ? (
                <div 
                    className='bg-gray-100 w-full h-full absolute z-10'
                    style={{ 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                    }}
                >
                    <Loader /> 
                </div>
            ) : null}

            {message.show ? (
                <div 
                    className='bg-gray-100 w-full h-full absolute z-10 flex flex-col justify-center items-center'
                >
                    <ErrorWrapper success>
                        {message.text}
                    </ErrorWrapper> 
                    <Text className='text-center'>
                        Your feedback is important to us!
                    </Text>

                    <Text className='text-center'>Thank you for using CDTimer</Text>

                    <Separator />
                    <Text className='underline'>
                        <Link to={HOME}>
                            Home Page
                        </Link>
                    </Text>
                </div>
            ) : null}

            {!message.show ? (
                <FeedbackWrapper>
                    <Separator />
                    <Separator />
                    <Separator />

                    <div className='w-4/6 md:w-full'>
                        <Text className='text-center'>Help us improve the software to assist you better. </Text>
                        <Text className='text-center'>Tell us any feature that will be useful to you and any suggestion you may have.</Text>
                    </div>
                    <Separator />
                    <TextAreaBox 
                        className='md:w-4/6 w-11/12' 
                        style={{height: '12em'}}
                        onChange={(e) => setFeedback(e.target.value)}
                    />

                    <Separator />
                    <SmallBtn
                        selected 
                        className='px-6 hover:shadow-none focus:bg-gray-900'
                        onClick={() => send()}
                    >
                        Send
                    </SmallBtn>
                </FeedbackWrapper>
            ) : null}

            <Separator />
            <Text className='text-center mt-20'>
                For any inquiry and assistant, <br />
                email us at 
                {' '}
                <a 
                className='underline'
                target='_blank' 
                href='https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&to=wonderexplorer1@gmail.com'>
                    wonderexplorer1@gmail.com
                </a>
            </Text>
            <Separator />
            <Text className='underline'>
                <Link to={HOME}>
                    Home Page
                </Link>
            </Text>
        </>
    )
}