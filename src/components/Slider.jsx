import React from 'react';
import ReactSlider from 'react-slider'
import styled from "styled-components"

const StyledSlider = styled(ReactSlider)`
    width: 100%;
    height: 25px;
`

const StyledThumb = styled.div.attrs({
    className: 'h-5 w-3 top-0 bg-blue-900 shadow-md'
})`
    top: -0.25rem;
    cursor: grab;
`

const Thumb = (props) => <StyledThumb {...props} />;

const StyledTrack = styled.div.attrs((props) => ({
    className:`
        h-3 ${props.index === 1 ? 'bg-gray-300' : 'bg-blue-700'}
    `
}))`
    top: 0;
    bottom: 0;
`

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

export default ({ change }) => (
    <StyledSlider
        defaultValue={[180]}
        min={0}
        max={360}
        renderTrack={Track}
        renderThumb={Thumb}
        onChange={change}
        className='flex items-center'
    />
)