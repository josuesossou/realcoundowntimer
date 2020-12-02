import React, { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom"
import { FirebaseContext } from '../backend'
import { Main, SidePanel, BottomPanel, Loader } from '../components'
import { SideBarWraper, Customize } from '../components/Shared'
import InitState from '../initState'
import "../css/custom.css"



export default () => {
    const [state, setState] = useState(null) // countdownTime Data
    const [history, updateHistory] = useState({ navLink: 'General', history: ['General'] }) // navigation for settings
    const [cache, updateCache] = useState({sec: 0, min: 0, hour: 0, day: 0}) // it saves the current timer from the main page to be use when publishing
    const [modal, updateModal] = useState('-100%') // side panel hide and show

    const { countdownId } = useParams()
    const firebase = useContext(FirebaseContext)
    
    useEffect(() => {
        if (countdownId !== 'default') {
            firebase.getCountdownPageData(countdownId).then((data) => console.log(data))
        } else {
            setState(InitState)
        }
    }, [])

    const updateStateWithCache = () => {
        const {day, hour, min, sec } = cache
        return { ...state, days:day, hours: hour, minutes: min, seconds: sec };
    }

    if (state)  
        return (
            <div className="flex h-screen w-screen overflow-hidden relative">
                <SideBarWraper left={modal} className={``} >
                    <SidePanel 
                        state={state} 
                        updateState={setState} 
                        hideModal={() => updateModal('-100%')}
                        navigation={history}
                        updateHistory={updateHistory} 
                    />
                </SideBarWraper>
                <div className="flex flex-col lg:w-4/5 w-full h-full relative z-0 overflow-hidden">
                    <div className="flex-1 bg-gray-100">
                        <Main state={state} updateCache={updateCache} /> 
                    </div>
                    <BottomPanel updateState={setState} updateCache={updateStateWithCache} />
                </div>
                <Customize 
                    onClick={() => updateModal('0')}> 
                    Customize
                </Customize> 
            </div>
        ) 

    return (
        <Loader />
    )                      
}