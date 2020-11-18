import React, { useEffect, useState } from 'react'
import InitState from '../initState'
import WebFont from 'webfontloader'
import Main from '../components/Main'

export default () => {
    const [state, setState] = useState(InitState);
    useEffect(() => {
        const savedState = JSON.parse(localStorage.getItem('state'));
        WebFont.load({
            google: {
              families: [savedState.fontFamily]
            }
        })
        setState(savedState)
    }, [])
    
    return (
        <div className="h-screen w-screen overflow-hidden">
            {state ? (<Main state={state} className="w-full h-full" />) : null}
        </div>
    )
}