import React from 'react'
import styled from "styled-components"
import { FirebaseContext } from '../backend'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { Button, Logo, RowSeparator, Text, SmallBtn, ShareIcon } from './Shared'
import { COUNTDOWN_PAGE, HOME } from '../constants/routes'

const PublishButton = styled(Button).attrs({
    className: 'bg-blue-100 text-gray-800 px-5 py-2'
})``

const SelectedButton = styled.div.attrs({

})``

export default ({ updateCache }) => {
    const firebase = React.useContext(FirebaseContext)
    const id = uuidv4()

    const onPublishing = () => {
        const state = updateCache()
        console.log(state)

        firebase.setCountdownPageData(id, { ...state, id })
        // localStorage.setItem('state', JSON.stringify({ ...state, cache: false, freeze: false }));
    }

    return (
        <div className="h-20 w-full bg-gray-200 relative flex items-center justify-between px-20">
            <Link to={HOME} className='flex'>
                <Logo>
                    CDTimer
                </Logo>
                <RowSeparator />
                <Text className="text-gray-700">Home</Text>
            </Link>
            <div className='flex'>
                <div className='mr-16 flex items-center'>
                        <ShareIcon />
                        {/*  share will not show if user is not logged in, use the share icon here */}

                        Private
                    <SmallBtn selected>
                        {/* Check is user is login, if not logged in data goes to locale storage. Alert user to login when they click on publish. the id will be local. private should say login */}
                    </SmallBtn>

                </div>


                <Link onClick={onPublishing} to={`/${id}/${COUNTDOWN_PAGE}`} target='_blank'>
                    <PublishButton>
                        Publish
                    </PublishButton>
                </Link>
            </div>
        </div>
    )
}