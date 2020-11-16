import React, { useState } from 'react'
import { SketchPicker } from 'react-color'
import { Wrapper } from './Shared'
import '../css/custom.css'

export default ({ state, updateState }) => {
    const [color, setColor] = useState('fff')
    const handleChangeComplete = (color) => {
        setColor(color)
    }
    const handleChange = (color, event) => {
        console.log(color, event)
        updateState({ ...state, [state.colorToUpdate]: color.hex })
    }
    return (
        <Wrapper>
            <SketchPicker
                className="side-pan"
                color={color}
                onChangeComplete={handleChangeComplete}
                onChange={handleChange}
            />
        </Wrapper>
    )
}