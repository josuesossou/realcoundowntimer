import React, { useEffect } from 'react'
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
} from './Shared'

export default ({ state, updateState, navigation, updateHistory }) => {
    const fontsArray = fontStr.split('\n')

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

                <HeaderText>Fonts</HeaderText>
                <FontPicker
					apiKey="AIzaSyCxhfAU4B8V5whdC-ay_SI5Bh3fCGGjOks"
					activeFontFamily={state.fontFamily}
					onChange={(font) =>
						updateState({ ...state, fontFamily: font.family })
                    }
                    families={fontsArray}
                    limit={348}
                    className='w-full bg-gray-700'
				/>
            </CustomColumnBox>
        </Wrapper>
    )
}