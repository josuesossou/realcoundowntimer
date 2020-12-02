import React, { useEffect, useState, useContext } from 'react'
import WebFont from 'webfontloader'
import { Main, Loader } from '../components'
import { Spinner } from '../components/Shared'
import { FirebaseContext } from '../backend'
import { useParams } from 'react-router-dom'

export default () => {
    const [state, setState] = useState(null);
    const firebase = useContext(FirebaseContext)
    const { countdownId } = useParams()

    useEffect(() => {
        // const savedState = JSON.parse(localStorage.getItem('state'));
        firebase.getCountdownPageData(countdownId).then((data) => {
            if (data) {
                console.log(data)
                WebFont.load({
                    google: {
                        families: [data.fontFamily]
                    }
                })

                setState(data)
            }
        })
        // if (savedState) {
        //     WebFont.load({
        //         google: {
        //             families: [savedState.fontFamily]
        //         }
        //     })

        //     setState(savedState)
        // }

    }, [])
    
    return (
        <div className="h-screen w-screen overflow-hidden">
            {state ? 
                <Main state={state} updateCache={() => {}} className="w-full h-full" /> : 
                <Loader />
            }
        </div>
    )
}