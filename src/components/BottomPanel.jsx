import React from 'react'
import styled from "styled-components"
import { FirebaseContext } from '../backend'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { Button, Logo, RowSeparator, Text } from './Shared'
import { COUNTDOWN_PAGE, HOME } from '../constants/routes'

const PublishButton = styled(Button).attrs({
    className: 'bg-gray-800 text-gray-300 px-5 py-2'
})``


export default ({ updateCache }) => {
    const firebase = React.useContext(FirebaseContext)
    const id = uuidv4()

    const onPublishing = () => {
        const state = updateCache()

        firebase.setCountdownPageData(id, { ...state, cache: false, freeze: false, id })
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
            <Link onClick={onPublishing} to={`/${id}/${COUNTDOWN_PAGE}`} target='_blank'>
                <PublishButton>
                    Publish
                </PublishButton>
            </Link>
        </div>
    )
}