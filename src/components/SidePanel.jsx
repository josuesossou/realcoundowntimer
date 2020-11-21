import React from 'react'
import { Text, LeftArrow, RightArrow, ArrowLeftIcon, Close } from './Shared'
import GeneralSetting from './GeneralSetting'
import BackgroundSetting from './BackgroundSetting'
import CounterBackgroundSetting from './CounterBackgroundSetting'
import TextSetting from './TextSetting'
import ColorPicker from './ColorPicker'
import FontSetting from './FontSetting'

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({ updateState, state, hideModal }) => {
    const goBack = () => {
        state.history.pop()
        const newLink = state.history[state.history.length - 1]
        updateState((prev) => ({...prev, navLink: newLink}))
    }

    return (
        <div className="h-full w-full bg-gray-800 text-gray-500 relative" >
            <div className="flex w-full h-12 bg-gray-700 items-center justify-center relative">
                {state.navLink !== 'General' ? (
                        <LeftArrow onClick={goBack}>
                            <ArrowLeftIcon />
                        </LeftArrow>
                    ) : null}
                <Text>{state.navLink} Setting</Text>
                    <RightArrow onClick={() => hideModal()} className="lg:hidden">
                        <Close />
                    </RightArrow>
            </div>

            {state.navLink === 'General' ? 
                <GeneralSetting updateState={updateState} state={state} /> : null}
            
            {state.navLink === 'Background' ? 
                <BackgroundSetting updateState={updateState} state={state} /> : null}

            {state.navLink === 'Counter' ? 
                <CounterBackgroundSetting updateState={updateState} state={state} /> : null}

            {state.navLink === 'Text' ?
                <TextSetting updateState={updateState} state={state} /> : null}

            {state.navLink === 'Color' ?
                <ColorPicker updateState={updateState} state={state} /> : null}
            
            {state.navLink === 'Font' ?
                <FontSetting updateState={updateState} state={state} /> : null}
        </div>
    )
}