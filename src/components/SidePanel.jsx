import React, { useState } from 'react'
import { SketchPicker } from 'react-color'
import '../css/custom.css'

export default () => {
    const [bg, setBg] = useState('fff')
    const handleChangeComplete = (color) => {
        setBg(color)
    }
    const handleChange = (color, event) => {
        console.log(color, event)
    }

    return (
        <div className="h-full w-full  text-gray-400">
            <div className="flex w-full h-12 bg-gray-700 items-center justify-center">
                <p>General Setting</p>
            </div>
            <div className="px-2 py-6">
                {/* <SketchPicker
                    className="side-pan"
                    color={bg}
                    onChangeComplete={handleChangeComplete}
                    onChange={handleChange}
                /> */}
                
                title
                time
                date
                show (text on box, date, days, hours)
                Display (Text to show when time reached)
                Background (button for Background customiztion)
                Text (Button for text style and color customiztion)
            </div>
        </div>
    )
}