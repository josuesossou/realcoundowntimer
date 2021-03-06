import React, { useState, useContext, useEffect } from 'react'
import styled from "styled-components"
import CoundownPage from './CountDownPage'
import { FirebaseContext } from '../backend'
import Loader from './Loader'
import { Text, SmallBtn } from './Shared'

const CountdownPageWrapper = styled.div.attrs({
    className: 'h-full lg:w-4/6 md:w-2/3 text-gray-300 w-full relative'
})`
    @media (min-width: 1536px) { 
        max-width: 1024px;
    }
`

const HeaderTab = styled.div.attrs({
    className: `flex w-full h-auto border-b-2 justify-between 
        border-gray-400 text-gray-800 items-center pt-10 relative top-0`
})``

const NavBtn = styled.button.attrs(({selected}) => ({
    className: `border-t-2 border-l-2 border-r-2 border-b-0
        border-gray-400 bg-gray-100 px-3 py-2 ${selected ? 'bg-gray-400': ''}`
}))`
    outline: 0 !important 
`


export default () => {
    const [collectionPages, setCollectionPages] = useState([])
    const [myPages, setMyPages] = useState([])
    const [selected, select] = useState('collection') // navbar selection
    const [isLoading, setLoader] = useState(true)
    const firebase = useContext(FirebaseContext)
    const  {defaultView, documentElement} = document

    const getCollection = () => {
        setLoader(true)

        if (collectionPages.length === 0) {
            firebase.getCountdownPagesData().then((data) => {
                if (data) {
                    setCollectionPages(data)
                } else {
                    setCollectionPages([])
                }
                setLoader(false)
            })
        } else {
            setLoader(false)
        }
    }

    const getMorePages = () => {
        if ((defaultView.innerHeight + defaultView.pageYOffset) >= 
            documentElement.offsetHeight && selected === 'collection') {
                console.log('working')
                const latestCountDownPage = collectionPages[collectionPages.length-1]
                const latestCountDownPageId = latestCountDownPage.data().id
                console.log(collectionPages)
                firebase.getMoreCountdownPagesData(latestCountDownPageId).then((data) => {
                    if (data) {
                        const newData = [...collectionPages, ...data]
                        console.log(newData)
                        setCollectionPages(newData)
                    } 
                    // setLoader(false)
                })
            }
    }

    const getMyPages = async () => {
        const user = firebase.getUser
        let dataFromFirebase = []
        setLoader(true)
        if (myPages.length > 0) {
            return setLoader(false)
        }

        if (user) {
            try {
                dataFromFirebase = await firebase.getUserCountdownPagesData()

                if (!dataFromFirebase) {
                    dataFromFirebase = []
                }
            } catch (error) {
                dataFromFirebase = []
            }
        } 
        let localData = JSON.parse(localStorage.getItem('mypages'))

        if (!localData) {
            localData = {pages: [] }
        }

        setMyPages(dataFromFirebase.concat(localData.pages))

        setLoader(false)
    }

    useEffect(() => {
        defaultView.addEventListener('scroll', getMorePages)
        getCollection()

        return () => {
            defaultView.removeEventListener('scroll', getMorePages)
        }
    }, [getMorePages])

    return (
        <CountdownPageWrapper>
            <HeaderTab>
                <div className="h-full flex justify-center items-center"> 
                    <NavBtn className="mr-1" selected={selected === 'collection'}
                        onClick={() => {
                            select('collection')
                            getCollection()
                        }}
                    >
                        <Text>Collection</Text>
                    </NavBtn>
                    <NavBtn selected={selected === 'mypages'} 
                        onClick={() => {
                            select('mypages')
                            getMyPages()
                        }}
                    >
                        <Text className="mx-2">My Pages</Text>
                    </NavBtn>
                </div>
            </HeaderTab>

            

            {isLoading ? <Loader /> :
                (
                    <div className='flex justify-start items-stretch flex-wrap mt-10'>
                        {selected === 'collection' ? 
                            <div className='text-gray-700 ml-3 mb-3 text-center w-full'>
                                <p>Pick one of the styles below and start customizing!</p>
                                <p>Countdowns you share will also appear here!</p>
                            </div>
                        : null}

                        {selected === 'mypages' && myPages.length === 0 ?
                            <div className='text-gray-700 ml-3 mb-3 text-center w-full'>
                                <p>
                                    You have not created any countdown page yet
                                </p>
                                <SmallBtn onClick={() => {
                                    select('collection')
                                    getCollection()
                                }}>
                                    Get Started
                                </SmallBtn>
                            </div>
                        : null}

                        {selected === 'mypages' && myPages.length !== 0 ?
                            <div className='text-gray-700 ml-3 mb-3 text-center w-full'>
                                <p>
                                    Here are all the countdown you have created
                                </p>
                                <p>
                                    The ones you created locally will also show up here
                                </p>
                            </div>
                        : null}

                        {selected === 'collection' ? collectionPages.map((page, index) => {
                            let data = page.data ? page.data() : page

                            if (data.showLabel === undefined) {
                                data = { ...data, showLabel: true }
                            }

                            return <CoundownPage 
                                key={index} 
                                pageData={{ ...data, freeze: true, cache: false }}
                                typeData={selected}
                            />
                        }) : null}

                        {selected === 'mypages' ? myPages.map((page, index) => {
                            const data = page.data ? page.data() : page
                            return <CoundownPage 
                                key={index} 
                                pageData={{ ...data, freeze: true, cache: false }}
                                typeData={selected}
                            />
                        }) : null}
                    </div>
                )
            }       


        </CountdownPageWrapper>
    )
}