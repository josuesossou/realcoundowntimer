import React, { useState, useEffect } from 'react'
import { Main, SidePanel, BottomPanel } from '../components/components'
import { SideBarWraper, Customize } from '../components/Shared'
import WebFont from 'webfontloader'
import InitState from '../initState'
import "../css/custom.css"

export default () => {
    useEffect(() => {
        WebFont.load({
            google: {
              families: ['Droid Sans', 'Racing Sans One']
            }
        })
    }, [])

    const [state, setState] = useState(InitState)
    const [cache, updateCache] = useState({sec: 0, min: 0, hour: 0, day: 0})
    const [modal, updateModal] = useState('0')

    const updateStateWithCache = () => {
        const {day, hour, min, sec } = cache
        return { ...state, days:day, hours: hour, minutes: min, seconds: sec };
    }

    return (
        <div className="flex h-screen w-screen overflow-hidden relative">
            <SideBarWraper left={modal} className={``} >
                <SidePanel state={state} updateState={setState} hideModal={() => updateModal('-100%')} />
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
    );
}