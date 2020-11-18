import React, {useEffect} from 'react'
import styled from "styled-components";
import { useParams, Link } from 'react-router-dom'
import { Button } from './Shared'

const PublishButton = styled(Button).attrs({
    className: 'bg-blue-600 px-5 py-2'
})``

export default ({ state }) => {
    useEffect(() => {
        
    }, [])

    const onPublishing = () => {
        localStorage.setItem('state', JSON.stringify(state));
    }

    return (
        <div className="h-20 w-full bg-gray-200 relative flex items-center justify-between px-20">
            <div style={{ fontFamily: 'Racing Sans One', fontSize: '1.5em' }} className="text-gray-500">
                CDTimer
            </div>

            <Link onClick={onPublishing} to='/countdown-page' target='_blank'>
                <PublishButton>
                    Publish
                </PublishButton>
            </Link>
        </div>
    )
}