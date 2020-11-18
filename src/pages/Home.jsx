import React, { useState, useEffect } from 'react'
import { Main, SidePanel, BottomPanel } from '../components/components'
import WebFont from 'webfontloader'
import "../css/custom.css"

export default () => {
    const dateString = Date.now()
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    const date = new Date(dateString).toLocaleString('en-US', dateOptions)

    useEffect(() => {
        WebFont.load({
            google: {
              families: ['Droid Sans', 'Racing Sans One']
            }
        })
    }, [])

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
        counterBgHeirearchy: 0,
        textColor: '#000',
        fontFamily: 'Droid Sans'
    })

    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <div className="w-1/5">
                <SidePanel state={state} updateState={setState} />
            </div>
            <div className="flex flex-col w-4/5 h-full relative">
                <div className="flex-1 bg-gray-100">
                    <Main state={state} className="" />
                </div>
                <BottomPanel state={state} className="" />
            </div>
        </div>
    );
}