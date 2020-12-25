import React, { useState, useEffect, useContext } from 'react'
import moment from 'moment'
import convert from '../constants/convertSecToTime'
import { useParams } from "react-router-dom"
import { FirebaseContext } from '../backend'
import { Main, SidePanel, BottomPanel, Loader } from '../components'
import { SideBarWraper, Customize } from '../components/Shared'
import InitState from '../initState'
import WebFont from 'webfontloader'
import short from 'short-uuid'
import "../css/custom.css"



export default () => {
    const [state, setState] = useState(null) // countdownTime Data
    const [history, updateHistory] = useState({ navLink: 'General', history: ['General'] }) // navigation for settings
    const [cache, updateCache] = useState({sec: 0, min: 0, hour: 0, day: 0}) // it saves the current timer from the main page to be use when publishing
    const [modal, updateModal] = useState('-100%') // side panel hide and show

    const { countdownId } = useParams()
    const firebase = useContext(FirebaseContext)
    const translator = short()
    
    useEffect(() => {
        const id = countdownId.split('_')
        if (id[0] === 'local') {
            let localData = JSON.parse(localStorage.getItem('mypages'))

            if (localData) {
                const data = localData.pages[Number(id[1])]
                setData(data)
            }
        } else {
            
            let id = translator.toUUID(countdownId)

            firebase.getCountdownPageData(id).then((data) =>{
                setData(data)
            })
        }
    }, [])

    const setData = (data) => {
        if (!data) return 
        WebFont.load({
            google: {
                families: [data.fontFamily]
            }
        })

        if (data.useDate) {
            // uses the date key on the data for calculation.
            // overides the hour, day, min, sec
            const value = data.useDateString

            // today date format
            const now = new Date(Date.now())
            const seconds = moment(value).diff(moment(now), 'seconds', true).toString()

            const {d, h, m, s} = convert(seconds)
            if (d < 0) {
                data = { ...data,  days: 0, hours: 0,
                    minutes: 0, seconds: 0}
            } else {
                data = { ...data, days: d, hours: h,
                    minutes: m, seconds: s }
            }
        }

        if (data.useTime) {
            const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
            const date =  new Date(Date.now()).toLocaleString('en-US', dateOptions)
            data = { ...data, date }
        }

        setState(data)
    }

    const updateStateWithCache = () => {
        const {day, hour, min, sec } = cache
        return { ...state, days: day, hours: hour, minutes: min, seconds: sec };
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
                        <Main state={{ ...state, cache: true }} updateCache={updateCache} /> 
                    </div>
                    <BottomPanel 
                    updateState={setState} 
                    updateCache={updateStateWithCache} 
                    liveState={state}
                    updateLiveState={setState}
                    />
                </div>
                <Customize 
                    onClick={() => updateModal('0')}> 
                    Customize
                </Customize> 
            </div>
        ) 

    return (
        <div className="flex h-screen w-screen overflow-hidden relative">
            <Loader />
        </div>
    )                      
}