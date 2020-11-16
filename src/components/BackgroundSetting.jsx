import React, {useState} from 'react'
import { RadioDot, LongBtn, CustomColumnBox, 
        RadioSelection, InputBox, TextBoxed, Wrapper } from './Shared'
import { data } from 'autoprefixer'


export default ({ state, updateState }) => {
    //gradient, url, later upload, and uploadVideo
    const [selected, setSelected] = useState('solid')
    const bgTypes = [
        {title: 'Solid Color', type: 'solid'},
        {title: 'Gradient', type: 'gradient'},
        {title: 'URL', type: 'url'},
    ]

    return (
        <Wrapper>
            <CustomColumnBox>
                <TextBoxed>Background Type</TextBoxed>
                <div className="mb-10">
                    {bgTypes.map(data => (
                        <RadioSelection selected={selected === data.type} onClick={() => setSelected(data.type)}>
                            <RadioDot selected={selected === data.type} />
                            {data.title}
                        </RadioSelection>
                    ))}
                </div>
                <LongBtn 
                    onClick={() => {
                        state.history.push('ColorPicker')
                        updateState({...state, navLink: 'ColorPicker', colorToUpdate: 'bgColor' })
                    }}
                >
                    Color Picker
                </LongBtn>
            </CustomColumnBox>
        </Wrapper>
    )
}

/// add gif, jpeg, png url, upload gif, jpeg, png, video files,