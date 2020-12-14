import React, { useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components"
import CoundownPage from './CountDownPage'
import { FirebaseContext } from '../backend'
import Loader from './Loader'
import { COUNTDOWN_PREVIEW } from '../constants/routes'
import { SmallBtn, AddIcon, Text } from './Shared'

const CountdownPageWrapper = styled.div.attrs({
    className: 'h-auto md:w-2/3 text-gray-300 w-full'
})``

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
    const [pages, setPages] = useState([])
    const [selected, select] = useState('collection')
    const [isLoading, setLoader] = useState(true)
    const firebase = useContext(FirebaseContext)

    React.useEffect(() => {
        getCollection()
    },[])

    const getCollection = () => {
        setLoader(true)
        firebase.getCountdownPagesData().then((data) => {
            if (data) {
                setPages(data)
            } else {
                setPages([])
            }
            
            setLoader(false)
        })
    }

    const getMyPages = () => {
        const user = firebase.getUser
        setLoader(true)
        if (user) {
            firebase.getUserCountdownPagesData().then((data) => {
                if (data) {
                    setPages(data)
                } else {
                    setPages([])
                }
                
                setLoader(false)
            })
        } else {
            const data = JSON.parse(localStorage.getItem('mypages'));

            if (data) {
                setPages(data)
            } else {
                setPages([])
            }
            
            setLoader(false)
        }
    }

    return (
        <CountdownPageWrapper>
            <HeaderTab>
                <div className="h-full flex justify-center items-center"> 
                    <NavBtn className="mr-1" selected={selected === 'collection'}
                        onClick={() => {
                            getCollection()
                            select('collection')
                        }}
                    >
                        <Text>Collection</Text>
                    </NavBtn>
                    <NavBtn selected={selected === 'mypages'} 
                        onClick={() => {
                            getMyPages()
                            select('mypages')
                        }}
                    >
                        <Text className="mx-2">My Pages</Text>
                    </NavBtn>
                </div>
                <div>
                    
                </div>

                {/* <Link to={`/default/${COUNTDOWN_PREVIEW}`}>

                </Link> */}
            </HeaderTab>

            {isLoading ? <Loader /> :
                (
                    <div className='flex justify-start flex-wrap mt-20'>
                        {pages.map((page, index) => 
                            <CoundownPage key={index} pageData={{ ...page.data(), freeze: true, cache: false }} />
                        )}
                    </div>
                )
            }       


        </CountdownPageWrapper>
    )
}