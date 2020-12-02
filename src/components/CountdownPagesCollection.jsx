import React from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components"
import { FirebaseContext } from '../backend'
import { COUNTDOWN_PREVIEW } from '../constants/routes'
import { SmallBtn, AddIcon, Text, CountdownPageWrapper, RowSeparator, FilterIcon } from './Shared'

const HeaderTab = styled.div.attrs({
    className: 'flex w-full h-auto border-b-2 justify-end items-center py-3'
})``



export default () => {
    const firebase = React.useContext(FirebaseContext)

    React.useEffect(() => {
        firebase.getCountdownPagesData().then((data) => console.log(data))
    },[])

    return (
        <CountdownPageWrapper>
            <HeaderTab>
                <div className="h-full flex justify-center items-center cursor-pointer"> 
                    <FilterIcon></FilterIcon>
                </div>

                <RowSeparator  />

                <Link to={`/default/${COUNTDOWN_PREVIEW}`}>
                    <SmallBtn className="flex items-center justify-center px-3">
                        <AddIcon /> <Text className="ml-3">New</Text>
                    </SmallBtn>
                </Link>
            </HeaderTab>
            {/* <FirebaseContext.Consumer>
                {firebase => (
                    <p>
                        {`${firebase.getCountdownPageData()} h`}
                    </p>
                )}
            </FirebaseContext.Consumer> */}
        </CountdownPageWrapper>
    )
}