import React from 'react'
import styled from "styled-components"
import { SmallBtn, LongBtn, CustomColumnBox, RowBox, Separator,
    InputBox, HeaderText, Wrapper, AngleRightIcon, RightArrow } from './Shared'

const LongBtnPad = styled(LongBtn).attrs({
    className: 'p-2'
})``

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
                <HeaderText>Title</HeaderText>
                <InputBox 
                    className="py-2"
                    type='text'
                    defaultValue={title}
                    onChange={(e) => updateState({...state, title: e.target.value})}
                />
            </CustomColumnBox>

            <CustomColumnBox>
            <HeaderText>Time</HeaderText>
                <RowBox>
                    <InputBox 
                        type="number" 
                        className="w-1/4 mr-3" 
                        min={0} max={99} 
                        defaultValue={days}
                        onKeyDown={e => e.preventDefault()}
                        onChange={(e) => {
                            e.preventDefault()
                            updateState({...state, days: e.target.value})
                        }}
                    /> 
                    <InputBox 
                        type="number" 
                        className="w-1/4 mr-3" 
                        min={0} max={23} 
                        onKeyDown={e => e.preventDefault()}
                        defaultValue={hours}
                        onChange={(e) => {updateState({...state, hours: e.target.value})}}
                    /> 
                    <InputBox 
                        type="number" 
                        className="w-1/4 mr-3" 
                        min={0} max={59} 
                        onKeyDown={e => e.preventDefault()}
                        defaultValue={minutes}
                        // value={} 
                        onChange={(e) => updateState({...state, minutes: e.target.value})}
                    />
                    <InputBox 
                        type="number" 
                        className="w-1/4" 
                        min={0} max={59} 
                        onKeyDown={e => e.preventDefault()}
                        defaultValue={seconds}
                        onChange={(e) => updateState({...state, seconds: e.target.value})}
                    />
                </RowBox>
            </CustomColumnBox>

            <CustomColumnBox>
                <HeaderText>Date</HeaderText>
                <InputBox 
                    type="date" 
                    defaultValue={date}
                    className="py-2"
                    onKeyDown={e => e.preventDefault()}
                    onChange={(e) => {
                        const date = new Date(e.target.valueAsNumber).toLocaleString('en-US', dateOptions)
                        updateState({...state, date})
                    }}
                />
            </CustomColumnBox>

            <CustomColumnBox>
                <HeaderText>Hide</HeaderText>
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

            {/* <CustomColumnBox>
                <HeaderText>Display</HeaderText>  (Text to show when time reached) 
            </CustomColumnBox> */}

            <CustomColumnBox />

            <CustomColumnBox>
                <LongBtnPad 
                    onClick={() => {
                        state.history.push('Background')
                        updateState({...state, navLink: 'Background'})
                    }}
                >
                    Background
                    <RightArrow>
                        <AngleRightIcon />
                    </RightArrow>
                </LongBtnPad>
            </CustomColumnBox>

            <CustomColumnBox>
                <LongBtnPad 
                    onClick={() => {
                        state.history.push('Counter Background')
                        updateState({...state, navLink: 'Counter Background'})
                    }}
                >
                    Counter Background
                    <RightArrow>
                        <AngleRightIcon />
                    </RightArrow>
                </LongBtnPad>
            </CustomColumnBox>

            <CustomColumnBox>
                <LongBtnPad
                    onClick={() => {
                        state.history.push('Text')
                        updateState({...state, navLink: 'Text'})
                    }}
                >
                    Text
                    <RightArrow>
                        <AngleRightIcon />
                    </RightArrow>
                </LongBtnPad>
            </CustomColumnBox>
        </Wrapper>
    )
}
