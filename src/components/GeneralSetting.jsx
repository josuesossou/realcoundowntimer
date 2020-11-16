import React from 'react'
import { SmallBtn, LongBtn, CustomColumnBox, RowBox,
    InputBox, TextBoxed, Wrapper, AngleRightIcon } from './Shared'

export default ({ state, updateState, updateCurrent }) => {
    const { 
        title, 
        days, 
        hours, 
        seconds, 
        minutes, 
        dateString,
        dateOptions
    } = state

    const year = new Date(dateString).getFullYear()
    const month = new Date(dateString).getMonth()
    const day = new Date(dateString).getDate()
    const date = `${year}-${month}-${day}`


    return (
        <Wrapper>
            <CustomColumnBox>
                <TextBoxed>Title</TextBoxed>
                <InputBox 
                    className="py-2"
                    type='text'
                    defaultValue={title}
                    onChange={(e) => updateState({...state, title: e.target.value})}
                />
            </CustomColumnBox>
            <CustomColumnBox>
            <TextBoxed>Time</TextBoxed>
                <RowBox>
                    <InputBox 
                        type="number" 
                        className="w-1/4 mr-3" 
                        min={0} max={99} 
                        defaultValue={days}
                        onChange={(e) => updateState({...state, days: e.target.value})}
                    /> 
                    <InputBox 
                        type="number" 
                        className="w-1/4 mr-3" 
                        min={0} max={23} 
                        defaultValue={hours}
                        onChange={(e) => updateState({...state, hours: e.target.value})}
                    /> 
                    <InputBox 
                        type="number" 
                        className="w-1/4 mr-3" 
                        min={0} max={59} 
                        defaultValue={minutes}
                        // value={} 
                        onChange={(e) => updateState({...state, minutes: e.target.value})}
                    />
                    <InputBox 
                        type="number" 
                        className="w-1/4" 
                        min={0} max={59} 
                        defaultValue={seconds}
                        onChange={(e) => updateState({...state, seconds: e.target.value})}
                    />
                </RowBox>
            </CustomColumnBox>
            <CustomColumnBox>
                <TextBoxed>Date</TextBoxed>
                <InputBox 
                    type="date" 
                    defaultValue={date}
                    className="py-2"
                    onChange={(e) => {
                        const date = new Date(e.target.valueAsNumber).toLocaleString('en-US', dateOptions)
                        updateState({...state, date})
                    }}
                />
            </CustomColumnBox>
            <CustomColumnBox>
                <TextBoxed>Hide</TextBoxed>
                <RowBox>
                    <SmallBtn
                        className="w-1/3" 
                        selected={state.showDay}
                        onClick={() => updateState((prev) => ({...prev, showDay: !prev.showDay, 
                                showHour: !prev.showDay ? true : prev.showHour}))}
                    >Days</SmallBtn>
                    <SmallBtn 
                        className="w-1/3 mx-3" 
                        selected={state.showHour}
                        onClick={() => updateState((prev) => ({...prev, showHour: !prev.showHour, 
                                            showDay: !prev.showHour ? prev.showDay : false}))}
                    >Hours</SmallBtn>
                    <SmallBtn 
                        className="w-1/3" 
                        selected={state.showDate}
                        onClick={() => updateState((prev) => ({...prev, showDate: !prev.showDate}))}
                    >Date</SmallBtn> 
                </RowBox>
            </CustomColumnBox>
            <CustomColumnBox>
                <TextBoxed>Display</TextBoxed> {/*  (Text to show when time reached) */}
            </CustomColumnBox>
            <CustomColumnBox>
                <LongBtn 
                    onClick={() => {
                        state.history.push('Background')
                        updateState({...state, navLink: 'Background'})
                    }}
                >
                    Background
                </LongBtn>
            </CustomColumnBox>
            <CustomColumnBox>
                <LongBtn
                    onClick={() => {
                        state.history.push('Text')
                        updateCurrent({...state, navLink: 'Text'})
                    }}
                >
                    Text
                    
                </LongBtn>
            </CustomColumnBox>
        </Wrapper>
    )
}
