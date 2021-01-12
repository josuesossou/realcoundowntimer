import React, { useState } from 'react'
import FontPicker from "font-picker-react";
import fontStr from '../fonts.js'
import { 
    LongBtn, 
    CustomColumnBox, 
    RightArrow, 
    AngleRightIcon,
    ColorPickerBg, 
    HeaderText, 
    Wrapper, 
    Separator,
    InputBox,
    RowBox,
    SelectBox,
    RadioDot,
    RadioSelection
} from './Shared'

export default ({ state, updateState, navigation, updateHistory }) => {
    const fontsArray = fontStr.split('\n')
    const [fontSizeFor, setFontFor] = useState('timerFontStyle')
    const [fontSize, setFontSize] = useState(8)
    const [fontUnit, setFontUnit] = useState('vw')

    const fontFor = [
        {title: 'Timer', for: 'timerFontStyle'},
        // {title: 'Title', for: 'titleFontStyle'},
        // {title: 'Date', for: 'dateFontStyle'},
    ]

    return (  
        <Wrapper>
            <CustomColumnBox>
                <HeaderText>Text Color</HeaderText>
                <LongBtn 
                    onClick={() => {
                        navigation.history.push('ColorPicker')
                        updateHistory({ ...navigation, navLink: 'Color' })
                        updateState({ ...state, colorToUpdate: 'textColor' })
                    }}
                >
                    <ColorPickerBg bgColor={state.textColor} />
                    <RightArrow >
                        <AngleRightIcon />
                    </RightArrow>
                </LongBtn>

                <Separator />
                <HeaderText>Part To Edit</HeaderText>
                {fontFor.map(font => (
                    <RadioSelection 
                        selected={fontSizeFor === font.for} 
                        onClick={() => setFontFor(font.for)}>
                        <RadioDot selected={fontSizeFor === font.for} />
                        {font.title}
                    </RadioSelection>
                ))}

                <Separator />

                <HeaderText>Font Size</HeaderText>
                <RowBox>
                    <InputBox 
                        type="number" 
                        className="w-2/4 mr-3" 
                        min={0}
                        value={fontSize}
                        onChange={(e) => {
                            const value = e.target.value
                            if (value >= 0) {
                                const newSize = { ...state[fontSizeFor], fontSize: `${value}${fontUnit}` }
                                setFontSize(value)
                                updateState({ ...state, [fontSizeFor]: newSize })
                            }
                        }}
                    />

                    <SelectBox
                        onChange={(e) => {
                            const value = e.target.value
                            const newSize = { ...state[fontSizeFor], fontSize: `${fontSize}${value}` }
                            setFontUnit(value)
                            updateState({ ...state, [fontSizeFor]: newSize })
                        }}
                    >
                        <option value='em'>em-unit</option>
                        <option value='px'>pixel</option>
                        <option value='vw'>v-width</option>
                    </SelectBox>
                </RowBox>

            </CustomColumnBox>
        </Wrapper>
    )
}