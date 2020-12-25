import React, { useState, useContext, useEffect, useCallback } from 'react'
import styled from "styled-components"
import CoundownPage from './CountDownPage'
import { FirebaseContext } from '../backend'
import Loader from './Loader'
import { Text } from './Shared'

const CountdownPageWrapper = styled.div.attrs({
    className: 'h-auto lg:w-4/6 md:w-2/3 text-gray-300 w-full'
})`
    @media (min-width: 1536px) { 
        max-width: 1024px;
    }
`

const HeaderTab = styled.div.attrs({
    className: `flex w-full h-auto border-b-2 justify-between 
        border-gray-400 text-gray-800 items-center pt-10`
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
    const [isLoading, setLoader] = useState(false)
    const firebase = useContext(FirebaseContext)

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

    const getMyPages = async () => {
        const user = firebase.getUser
        let dataFromFirebase = []
        setLoader(true)

        if (user && myPages.length === 0) {
            try {
                dataFromFirebase = await firebase.getUserCountdownPagesData()
                if (dataFromFirebase === null) {
                    dataFromFirebase = []
                }
            } catch (error) {
                dataFromFirebase = []
            }
        } 

        let localData = JSON.parse(localStorage.getItem('mypages'))

        if (localData) setMyPages(dataFromFirebase.concat(localData.pages))
        setLoader(false)
    }

    useEffect(() => {
        getCollection()
    }, [])

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
                            :
                            <p className='mb-3'></p>}
                        {selected === 'collection' ? collectionPages.map((page, index) => {
                            const data = page.data ? page.data() : page
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