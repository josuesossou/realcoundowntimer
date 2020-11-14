import React from 'react'
import { SketchPicker } from 'react-color'

export default () => {
    return (
        <SketchPicker
            className="side-pan"
            color={bg}
            onChangeComplete={handleChangeComplete}
            onChange={handleChange}
        />
    )
}