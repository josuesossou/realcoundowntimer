import React from 'react'
import { TextBoxed } from './Shared'
import GeneralSetting from './GeneralSetting'
import '../css/custom.css'

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({ updateState, state }) => {
    // const [bg, setBg] = useState('fff')
    // const [changeState, setChangeState] = useState
    // const [selected, setSelected] = useState({ date: false, day: false, hour: false })
    // const handleChangeComplete = (color) => {
    //     setBg(color)
    // }
    // const handleChange = (color, event) => {
    //     console.log(color, event)
    // }

    return (
        <div className="h-full w-full bg-gray-800 text-gray-500">
            <div className="flex w-full h-12 bg-gray-700 items-center justify-center">
                <TextBoxed>General Setting</TextBoxed>
            </div>

            <GeneralSetting updateState={updateState} state={state} />
           
        </div>
    )
}