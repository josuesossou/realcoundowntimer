import React, { useState } from 'react'
import "../css/custom.css"
import { Main, SidePanel, BottomPanel } from '../components/components'

export default () => {
    const [state, setState] = useState({
        day: false,
        hour: false,
        date: false,

    })

    return (
        <div className="flex h-screen w-screen">
            <div className="w-1/5">
                <SidePanel state={state} updateState={setState} />
            </div>
            <div className="flex flex-col flex-1 h-full">
                <div className="p-16 w-full h-full bg-gray-100">
                    <Main days={1} hours={0} minutes={1} seconds={10} state={state} />
                </div>
                <BottomPanel />
            </div>
        </div>
    );
}