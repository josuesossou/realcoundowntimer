import React, { useState } from 'react'
import { HeaderText, Text, LeftArrow, AngleLeftIcon } from './Shared'
import GeneralSetting from './GeneralSetting'
import BackgroundSetting from './BackgroundSetting'
import CounterBackgroundSetting from './CounterBackgroundSetting'
import TextSetting from './TextSetting'
import ColorPicker from './ColorPicker'

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({ updateState, state }) => {
    const goBack = () => {
        state.history.pop()
        const newLink = state.history[state.history.length - 1]
        updateState((prev) => ({...prev, navLink: newLink}))
    }

    return (
        <div className="h-full w-full bg-gray-800 text-gray-500">
            <div className="flex w-full h-12 bg-gray-700 items-center justify-center relative">
                {state.navLink !== 'General' ? (
                        <LeftArrow onClick={goBack}>
                            <AngleLeftIcon />
                        </LeftArrow>
                    ) : null}
                <Text>{state.navLink} Setting</Text>
            </div>

            {state.navLink === 'General' ? 
                <GeneralSetting updateState={updateState} state={state} /> : null}
            
            {state.navLink === 'Background' ? 
                <BackgroundSetting updateState={updateState} state={state} /> : null}

            {state.navLink === 'Counter Background' ? 
                <CounterBackgroundSetting updateState={updateState} state={state} /> : null}

            {state.navLink === 'Text' ?
                <TextSetting updateState={updateState} state={state} /> : null}

            {state.navLink === 'Color' ?
                <ColorPicker updateState={updateState} state={state} /> : null}
        </div>
    )
}