import React from 'react'
import styled from "styled-components"
import moment from 'moment'
import convert from '../constants/convertSecToTime'
import { SmallBtn, LongBtn, CustomColumnBox, RowBox, RadioDot, RadioSelection,
    InputBox, HeaderText, Wrapper, AngleRightIcon, RightArrow, Separator } from './Shared'

const LongBtnPad = styled(LongBtn).attrs({
    className: 'p-2'
})``

export default ({ state, updateState, navigation, updateHistory }) => {
    const { 
        title, 
        days, 
        hours, 
        seconds, 
        minutes,
    } = state

    const dateString = Date.now()
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }

    const reg = /[^0-9AMP]+/
    const newDate = new Date(dateString)
    const d = newDate.toLocaleString().split(reg)
    const today = `${d[2]}-${d[0]}-${d[1]<10? '0'+d[1]:d[1]}T${d[3]<10?
                     '0'+d[3]:d[3]}:${d[4]<10? '0'+d[4]:d[4]}`

    return (
        <Wrapper>
            <CustomColumnBox>
                <HeaderText>Title</HeaderText>
                <InputBox 
                    className="py-2"
                    type='text'
                    value={title}
                    maxLength={35}
                    onChange={(e) => {
                        e.preventDefault()
                        if (e.target.value.match(/^[a-zA-Z0-9!@#$%^&*()_, \-]*$/)) {
                            updateState({...state, title: e.target.value})
                        }
                    }}
                />
            </CustomColumnBox>
            
            <CustomColumnBox>
            <RadioSelection 
                selected={state.useDate} 
                onClick={() => updateState({ ...state, useTime: false, useDate: true,
                            date: newDate.toLocaleString('en-US', dateOptions) })}>
                <RadioDot selected={state.useDate} />
                By Date
            </RadioSelection>
            <RadioSelection 
                selected={state.useTime} 
                onClick={() => updateState({ ...state, useTime: true, useDate: false, 
                            date: newDate.toLocaleString('en-US', dateOptions) })}>
                <RadioDot selected={state.useTime} />
                By Time
            </RadioSelection>
            </CustomColumnBox>

            <Separator />

            {state.useTime ? (
                <CustomColumnBox>
                    <RowBox>
                        <InputBox 
                            type="number" 
                            className="w-1/4 mr-3" 
                            min={0} max={99}
                            maxLength={2}
                            value={days}
                            onChange={(e) => {
                                const value = e.target.value
                                if (value >= 0 && value <= 99)
                                    updateState({ ...state, days: value })
                            }}
                        /> 
                        <InputBox
                            type="number" 
                            className="w-1/4 mr-3" 
                            min={0} max={23}
                            maxLength={2}
                            value={hours}
                            onChange={(e) => {
                                const value = e.target.value
                                if (value >= 0 && value <= 23)
                                    updateState({ ...state, hours: value })
                            }}
                        /> 
                        <InputBox 
                            type="number" 
                            className="w-1/4 mr-3" 
                            min={0} max={59}
                            value={minutes}
                            onChange={(e) => {
                                const value = e.target.value
                                if (value >= 0 && value <= 59)
                                    updateState({ ...state, minutes: value })
                            }}
                        />
                        <InputBox 
                            type="number" 
                            className="w-1/4" 
                            min={0} max={59}
                            value={seconds}
                            onChange={(e) => {
                                const value = e.target.value
                                if (value >= 0 && value <= 59)
                                    updateState({ ...state, seconds: value })
                            }}
                        />
                    </RowBox>
                </CustomColumnBox>
            ) : null}

            {state.useDate ? (
                <CustomColumnBox>
                    <InputBox 
                        type="datetime-local"
                        min={today}
                        defaultValue={today}
                        className="py-2"
                        onKeyDown={e => e.preventDefault()}
                        onChange={(e) => {
                            const value = e.target.value
                            const now =  new Date(Date.now())
                            const date = new Date(value).toLocaleDateString('en-US', dateOptions)

                            const seconds = moment(value).diff(moment(now), 'seconds', true).toString()
                            const {d, h, m, s} = convert(seconds)
                   
                            updateState({ ...state, date, days: d, hours: h,
                                         minutes: m, seconds: s, useDateString: value})
                        }}
                    />
                </CustomColumnBox>
            ) : null}

            <Separator />
            <CustomColumnBox>
                <HeaderText>Hide</HeaderText>
                <RowBox className='flex-warp justify-center items-center'>
                    <SmallBtn
                        className="w-1/3" 
                        selected={state.showDay}
                        onClick={() => updateState((prev) => ({...prev, showDay: !prev.showDay, 
                                showHour: !prev.showDay ? true : prev.showHour}))}
                    >Days</SmallBtn>
                    <SmallBtn
                        className="w-1/3" 
                        selected={state.showHour}
                        onClick={() => updateState((prev) => ({...prev, showHour: !prev.showHour, 
                                            showDay: !prev.showHour ? prev.showDay : false}))}
                    >Hours</SmallBtn>
                    <SmallBtn 
                        className="w-1/3" 
                        selected={state.showDate}
                        onClick={() => updateState((prev) => ({...prev, showDate: !prev.showDate}))}
                    >Date</SmallBtn>
                    <SmallBtn 
                        className="w-1/3" 
                        selected={state.showLabel}
                        onClick={() => updateState((prev) => ({...prev, showLabel: !prev.showLabel}))}
                    >Label</SmallBtn> 
                </RowBox>
            </CustomColumnBox>

            {state.useTime ? 
                (<CustomColumnBox>
                    <HeaderText></HeaderText>
                    <SmallBtn
                        selected={!state.freeze}
                        className="w-1/3 px-3"
                        onClick={() => {
                            updateState((prev) => ({ ...state, freeze: !prev.freeze  }))
                        }}
                    >
                        {state.freeze ? 'Start' : 'Freeze'}
                    </SmallBtn>
                </CustomColumnBox>) : null}

            
            <CustomColumnBox>
                <Separator />
            </CustomColumnBox>

            <CustomColumnBox>
                <LongBtnPad 
                    onClick={() => {
                        navigation.history.push('End Phrase')
                        updateHistory({ ...navigation, navLink: 'End Phrase'})
                    }}
                >
                    Final Text
                    <RightArrow>
                        <AngleRightIcon />
                    </RightArrow>
                </LongBtnPad>
            </CustomColumnBox>

            <CustomColumnBox>
                <LongBtnPad 
                    onClick={() => {
                        navigation.history.push('Background')
                        updateHistory({ ...navigation, navLink: 'Background'})
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
                        navigation.history.push('Counter')
                        updateHistory({ ...navigation, navLink: 'Counter'})
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
                        navigation.history.push('Text')
                        updateHistory({ ...navigation, navLink: 'Text'})
                    }}
                >
                    Text Style
                    <RightArrow>
                        <AngleRightIcon />
                    </RightArrow>
                </LongBtnPad>
            </CustomColumnBox>
        </Wrapper>
    )
}
