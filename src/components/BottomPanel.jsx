import React, { useContext } from 'react'
import styled from "styled-components"
import { FirebaseContext } from '../backend'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { Button, RowSeparator, Text, SmallBtn, ShareIcon } from './Shared'
import { COUNTDOWN_PAGE, HOME, LOGIN_PAGE, SIGNUP_PAGE } from '../constants/routes'
import Switch from '@material-ui/core/Switch'
import Logo from './Logo'
import short from 'short-uuid'


const PublishButton = styled(Button).attrs({
    className: `bg-gray-900 text-gray-300 px-5 py-2 
    shadow-xl hover:shadow-sm cursor-pointer`
})``

export default ({ updateCache, liveState, updateLiveState }) => {
    const firebase = useContext(FirebaseContext)
    const { page, countdownId } = useParams()
    const { isPublic, isShared } = liveState
    const translator = short()

    const onPublishing = () => {
        const state = updateCache()
        const user = firebase.getUser
        let id

        if (user) {
            id = page === 'edit-page' &&
            countdownId.split('_')[0] !== 'local' ? translator.toUUID(countdownId) : uuidv4()

            firebase.setCountdownPageData(
                id, 
                { ...state, id, user: user.uid, }
            )
        } else {
            let data = JSON.parse(localStorage.getItem('mypages'))

            if (page === 'edit-page') {
                const editId = countdownId.split('_')[1]
                data.pages[Number(editId)] = state
                id = state.id
            } else {
                if (!data) {
                    data = {idCount: 0, pages: []}
                }

                id = `local_${data.idCount}`
                data.pages.push({ ...state, id })
                data.idCount++
            }

            localStorage.setItem('mypages', JSON.stringify(data))
        }

        if (id.split('_')[0] === 'local') {
            window.open(`/${COUNTDOWN_PAGE}/${id}`, "_blank")
        }  else {
            window.open(`/${COUNTDOWN_PAGE}/${translator.fromUUID(id)}`, "_blank")
        }
    }

    return (
        <div className={`min-h-20 w-full bg-gray-200 absolute bottom-0 md:flex 
                        flex-column md:justify-between z-10
                        justify-center items-center pl-20 py-3`}>
            <div className='flex'>
                <Logo />
                <RowSeparator />
                <Link to={HOME}>
                    <Text className="text-gray-700">Home</Text>
                </Link>
            </div>
            <div className='mr-16 flex items-center'>
                {firebase.getUser ? (
                    <>
                    {isShared ? 
                        <Text className='text-gray-700 mr-6'>
                            Shared countdowns will show up on the home page
                        </Text> : null}
                    <div className='flex items-center'>
                        <Text>{isPublic ? 'Public' : 'Private'}</Text>
                        <Switch
                            checked={isPublic}
                            onChange={() => updateLiveState({ ...liveState, isPublic: !isPublic})}
                            name="checkedA"
                            color="default"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </div>

                    <RowSeparator />

                    <SmallBtn 
                        className='h-auto hover:bg-gray-600' 
                        style={{ lineHeight: 0 }}
                        onClick={() => updateLiveState({ ...liveState, isShared: !isShared})}
                        selected={isShared}
                    >
                        <ShareIcon />
                    </SmallBtn>
                    </>
                ) : (
                    <Text className='text-gray-700 py-2 md:text-center'>
                        This countdown will be saved locally, 
                        <Link className='font-extrabold' to={LOGIN_PAGE}> login</Link> or 
                        <Link className='font-extrabold' to={SIGNUP_PAGE}> register</Link> to share it with everyone
                    </Text>)
                }
                <RowSeparator />
                <RowSeparator />
                <PublishButton onClick={onPublishing}>
                    <Text>Publish</Text>
                </PublishButton>
            </div>
        </div>
    )
}