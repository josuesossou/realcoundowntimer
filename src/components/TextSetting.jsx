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

export default ({ state, updateState}) => {
    return (
        
        <Wrapper>
            <CustomColumnBox>
                <HeaderText>Text Color</HeaderText>
                <LongBtn 
                    onClick={() => {
                        state.history.push('ColorPicker')
                        updateState({ ...state, navLink: 'Color', colorToUpdate: 'textColor' })
                    }}
                >
                    <ColorPickerBg bgColor={state.textColor} />
                    <RightArrow >
                        <AngleRightIcon />
                    </RightArrow>
                </LongBtn>
            </CustomColumnBox>
        </Wrapper>
    )
}