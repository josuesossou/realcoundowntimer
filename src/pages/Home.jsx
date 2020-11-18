import React, { useState, useEffect } from 'react'
import { Main, SidePanel, BottomPanel } from '../components/components'
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