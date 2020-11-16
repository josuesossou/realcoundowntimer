import React, { useState } from 'react'
import "../css/custom.css"
import { Main, SidePanel, BottomPanel } from '../components/components'

export default () => {
    const dateString = Date.now()
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    const date = new Date(dateString).toLocaleString('en-US', dateOptions)

    console.log(date)

    const [state, setState] = useState({
        showDay: true,
        showHour: true,
        showDate: true,
        navLink: 'General', 
        history: ['General'],
        days: 0, 
        hours: 0, 
        minutes: 5, 
        seconds: 15,
        date,
        dateString,
        title: 'New Countdown',
        dateOptions,
        backgroundType: 'solid', //gradien, url, later upload, and uploadVideo 
        counterBgType: 'none', //group digit each group, all
        counterBgColor: '#fff',
        colorToUpdate: 'bgColor',
        bgColor: '#888888',
        bgType: 'solid',
        gradientFirstColor: '#888888',
        gradientSecondColor: '#888888',
        gradientAngle: 180,
        urlBg: '',
        urlBgSize: 'cover',
        counterBgColor: '#888888',
        counterBgHeirearchy: 0
    })

    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <div className="w-1/5">
                <SidePanel state={state} updateState={setState} />
            </div>
            <div className="flex flex-col flex-1 h-full">
                <div className="p-16 w-full h-full bg-gray-100">
                    <Main state={state} />
                </div>
                <BottomPanel />
            </div>
        </div>
    );
}