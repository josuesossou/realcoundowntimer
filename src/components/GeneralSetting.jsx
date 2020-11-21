import React from 'react'
import styled from "styled-components"
import moment from 'moment'
import { SmallBtn, LongBtn, CustomColumnBox, RowBox,
    InputBox, HeaderText, Wrapper, AngleRightIcon, RightArrow } from './Shared'

const LongBtnPad = styled(LongBtn).attrs({
    className: 'p-2'
})``

export default ({ state, updateState }) => {
    const { 
        title, 
        days, 
        hours, 
        seconds, 
        minutes,
        dateString,
        dateOptions
    } = state

    const reg = /[^0-9AMP]+/
    const d = new Date(dateString).toLocaleString().split(reg)

    const today = `${d[2]}-${d[0]}-${d[1]}T${d[3]<10? '0'+d[3]:d[3]}:${d[4]}`
    // console.log(d, today)

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
                        // defaultValue={days}
                        onKeyDown={e => e.preventDefault()}
                        value={days}
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
                        // defaultValue={hours}
                        value={hours}
                        onChange={(e) => {updateState({...state, hours: e.target.value})}}
                    /> 
                    <InputBox 
                        type="number" 
                        className="w-1/4 mr-3" 
                        min={0} max={59} 
                        onKeyDown={e => e.preventDefault()}
                        // defaultValue={minutes}
                        value={minutes}
                        onChange={(e) => updateState({...state, minutes: e.target.value})}
                    />
                    <InputBox 
                        type="number" 
                        className="w-1/4" 
                        min={0} max={59} 
                        onKeyDown={e => e.preventDefault()}
                        // defaultValue={seconds}
                        value={seconds}
                        onChange={(e) => updateState({...state, seconds: e.target.value})}
                    />
                </RowBox>
            </CustomColumnBox>

            <CustomColumnBox>
                <HeaderText>Date</HeaderText>
                <InputBox 
                    type="datetime-local"
                    min={today}
                    defaultValue={today}
                    className="py-2"
                    onKeyDown={e => e.preventDefault()}
                    onChange={(e) => {
                        const arr = e.target.value.split(reg)
                        const date = new Date(arr[0], arr[1]-1, arr[2]).toLocaleDateString('en-US', dateOptions)
                        const days = moment(e.target.value).diff(moment(today), 'days');
                        const h =  Number(arr[3])-d[3]
                        const m =  Number(arr[4])-d[4]
                        console.log(arr)
                        updateState({ ...state, date, days, hours: h<0? 24+h:h, minutes: m<0? 60+m:m })
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
                        state.history.push('Counter')
                        updateState({...state, navLink: 'Counter'})
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
