import React from 'react'
import { Text, LeftArrow, RightArrow, ArrowLeftIcon, Close } from './Shared'
import GeneralSetting from './GeneralSetting'
import BackgroundSetting from './BackgroundSetting'
import CounterBackgroundSetting from './CounterBackgroundSetting'
import TextSetting from './TextSetting'
import ColorPicker from './ColorPicker'
import EndPhraseSetting from './EndPhraseSetting'
import '../css/hidden-scrollbar.css'

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({ updateState, state, hideModal, navigation, updateHistory }) => {
    const goBack = () => {
        navigation.history.pop()
        const newLink = navigation.history[navigation.history.length - 1]
        updateHistory((prev) => ({...prev, navLink: newLink}))
    }

    return (
        <div className="h-full w-full bg-gray-800 text-gray-500 relative overflow-y-scroll" id='side-panel' >
            <div className="flex w-full h-12 bg-gray-700 items-center justify-center relative">
                {navigation.navLink !== 'General' ? (
                        <LeftArrow onClick={goBack}>
                            <ArrowLeftIcon />
                        </LeftArrow>
                    ) : null}
                <Text>{navigation.navLink} Setting</Text>
                    <RightArrow onClick={() => hideModal()} className="lg:hidden">
                        <Close />
                    </RightArrow>
            </div>

            {navigation.navLink === 'General' ? 
                <GeneralSetting 
                    updateState={updateState} 
                    state={state} 
                    updateHistory={updateHistory} 
                    navigation={navigation} 
                /> : null}
            
            {navigation.navLink === 'Background' ? 
                <BackgroundSetting 
                    updateState={updateState} 
                    state={state} 
                    updateHistory={updateHistory} 
                    navigation={navigation} 
                /> : null}

            {navigation.navLink === 'Counter' ? 
                <CounterBackgroundSetting 
                    updateState={updateState} 
                    state={state} 
                    updateHistory={updateHistory} 
                    navigation={navigation} 
                /> : null}

            {navigation.navLink === 'Text' ?
                <TextSetting 
                    updateState={updateState} 
                    state={state} 
                    updateHistory={updateHistory} 
                    navigation={navigation} 
                /> : null}

            {navigation.navLink === 'Color' ?
                <ColorPicker updateState={updateState} state={state} /> : null}
            
            {navigation.navLink === 'End Phrase' ?
                <EndPhraseSetting updateState={updateState} state={state} /> : null}
        </div>
    )
}