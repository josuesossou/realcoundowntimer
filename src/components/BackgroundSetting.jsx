import React from 'react'
import Slider from './Slider'
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
    RowBox,
    InputBox,
    Hr
} from './Shared'

export default ({ state, updateState, navigation, updateHistory }) => {
    //gradient, url, later upload, and uploadVideo
    const bgTypes = [
        {title: 'Solid Color', type: 'solid'},
        {title: 'Gradient', type: 'gradient'},
        {title: 'URL', type: 'url'},
    ]

    return (
        <Wrapper>
            <CustomColumnBox>
                <HeaderText>Background Type</HeaderText>
                {bgTypes.map(bg => (
                    <RadioSelection 
                        selected={state.bgType === bg.type} 
                        onClick={() => updateState({ ...state, bgType: bg.type })}>
                        <RadioDot selected={state.bgType === bg.type} />
                        {bg.title}
                    </RadioSelection>
                ))}

                <Separator />
                <Separator />

                {state.bgType === 'solid' ? 
                    <SolidColor  
                        state={state} 
                        updateState={updateState}
                        navigation={navigation} 
                        updateHistory={updateHistory}
                    /> : null}
                {state.bgType === 'gradient' ? 
                    <Gradient
                        state={state} 
                        updateState={updateState} 
                        navigation={navigation} 
                        updateHistory={updateHistory}
                    /> : null}
                {state.bgType === 'url' ? 
                    <UrlSetting 
                        state={state} 
                        updateState={updateState} 
                    /> : null}

            </CustomColumnBox>
        </Wrapper>
    )
}

// For solid Color Setting
const SolidColor = ({ state, updateState, navigation, updateHistory }) => {
    return (
        <>
            <HeaderText>Solid Color</HeaderText>
            <LongBtn 
                onClick={() => {
                    navigation.history.push('ColorPicker')
                    updateHistory({ ...navigation, navLink: 'Color' })
                    updateState({ ...state, colorToUpdate: 'bgColor' })
                }}
            >
                <ColorPickerBg bgColor={state.bgColor} />
                <RightArrow >
                    <AngleRightIcon />
                </RightArrow>
            </LongBtn>
        </>
    )
}

// For Gradient Color Setting
const Gradient = ({ state, updateState, navigation, updateHistory }) => {
    return (
        <>
            <HeaderText>Gradient First Color</HeaderText>
            <LongBtn 
                onClick={() => {
                    navigation.history.push('ColorPicker')
                    updateHistory({ ...navigation, navLink: 'Color' })
                    updateState({ ...state, colorToUpdate: 'gradientFirstColor' })
                }}
            >
                <ColorPickerBg bgColor={state.gradientFirstColor} />
                <RightArrow >
                    <AngleRightIcon />
                </RightArrow>
            </LongBtn>

            <Separator />

            <HeaderText>Gradient Second Color</HeaderText>
            <LongBtn 
                onClick={() => {
                    navigation.history.push('ColorPicker')
                    updateHistory({ ...navigation, navLink: 'Color' })
                    updateState({ ...state, colorToUpdate: 'gradientSecondColor' })
                }}
            >
                <ColorPickerBg bgColor={state.gradientSecondColor} />
                <RightArrow >
                    <AngleRightIcon />
                </RightArrow>
            </LongBtn>

            <Separator />
            
            <RowBox className="justify-between">
                <HeaderText>Angle</HeaderText>
                <HeaderText>{state.gradientAngle}&deg;</HeaderText>
            </RowBox>
            
            <Slider change={(val) => updateState({ ...state, gradientAngle: val })} />
        </>
    )
}

// For Url Setting
const UrlSetting = ({ state, updateState }) => {
    const imgSizes = [
        'cover', 'contain', 'auto'
    ]
    return (
        <>
            <HeaderText>Image Url</HeaderText>
            <InputBox 
                type="text"
                placeholder='Paste a url'
                className="py-2"
                onChange={(e) => {
                    updateState({ ...state, urlBg: e.target.value })
                }}
            />

            <Separator />

            <HeaderText>Image Size</HeaderText>
            {imgSizes.map(size => (
                <RadioSelection 
                    selected={state.urlBgSize === size} 
                    onClick={() => updateState({ ...state, urlBgSize: size })}>
                    <RadioDot selected={state.urlBgSize === size} />
                    {size}
                </RadioSelection>
            ))}
        </>
    )
}
/// add gif, jpeg, png url, upload gif, jpeg, png, video files,