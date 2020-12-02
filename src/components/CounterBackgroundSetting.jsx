import React from 'react'
import { 
    RadioDot, 
    LongBtn, 
    CustomColumnBox, 
    RightArrow, 
    AngleRightIcon,
    RadioSelection, 
    ColorPickerBg, 
    HeaderText, 
    Wrapper, 
    Separator,
} from './Shared'

export default ({ state, updateState, navigation, updateHistory}) => {
    const counterBgTypes = [
        {title: 'None', type: 0},
        {title: 'Group Digits', type: 1},
        {title: 'Each Group', type: 2},
        {title: 'All', type: 3}
    ]
    return (
        <Wrapper>
            <CustomColumnBox>
                <HeaderText>Counter Background Type</HeaderText>
                {counterBgTypes.map(bg => (
                    <RadioSelection 
                        selected={state.counterBgHeirearchy === bg.type} 
                        onClick={() => updateState({ ...state, counterBgHeirearchy: bg.type })}>
                        <RadioDot selected={state.counterBgHeirearchy === bg.type} />
                        {bg.title}
                    </RadioSelection>
                ))}

                <Separator />
                <Separator />

                <HeaderText>Counter Background Color</HeaderText>
                <LongBtn 
                    onClick={() => {
                        navigation.history.push('ColorPicker')
                        updateHistory({ ...navigation, navLink: 'Color' })
                        updateState({ ...state, colorToUpdate: 'counterBgColor' })
                    }}
                >
                    <ColorPickerBg bgColor={state.counterBgColor} />
                    <RightArrow >
                        <AngleRightIcon />
                    </RightArrow>
                </LongBtn>

            </CustomColumnBox>
        </Wrapper>
    )
}