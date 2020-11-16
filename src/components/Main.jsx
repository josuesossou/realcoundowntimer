import React, { useState, useEffect, useRef, useCallback } from 'react'
import { RowBox, ColumnBox } from './Shared'
import styled from 'styled-components'

const CustomColumnBox = styled(ColumnBox).attrs({
    className: 'items-center relative px-4'
})`
`
const SmallText = styled.div.attrs({
    className: 'text-xm'
})`
    line-height: normal;
`
const LargeText = styled.div.attrs({
    className: 'text-2xl p-0 m-0 relative w-32 text-center'
})`
    line-height: normal;
`
const ColonStyle = styled.p.attrs({
    className: "text-2xl"
})`
    line-height: normal;
`


/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({ state }) => {
    const [time, setTime] = useState({sec: 0, min: 0, hour: 0, day: 0})
    let timer = useRef()
    const tick = useCallback((secs, mins, hrs, days) => {
        let newSec = secs, newMin = mins, newHour = hrs, newDay = days
        newSec = secs-1

        if (newSec <= 0) {
            if (newMin <= 0) {
                if (newHour <= 0) {
                    if (newDay <= 0) {
                    } else {
                        newDay = days-1
                        newHour = 23
                        newMin = 59
                        newSec = 59
                    }
                } else {
                    newHour = hrs-1
                    newMin = 59
                    newSec = 59
                }
            } else {
                newMin = mins-1
                newSec = 59
            }
        }

        setTime({sec: newSec, min: newMin, hour: newHour, day: newDay})

        if (newSec !== 0 || newMin !== 0 || newHour !== 0 || newDay !== 0) {
            timer.current = setTimeout(() => tick(newSec, newMin, newHour, newDay), 990)
        }
    }, [])

    useEffect(() => {
        clearTimeout(timer.current)
        tick(state.seconds, state.minutes, state.hours, state.days)
    }, [state.seconds, state.minutes, state.hours, state.days, tick])

    return (
        <div 
            className="h-full w-full shadow-lg flex flex-col items-center justify-start pt-16"
            style={{ backgroundColor: state.bgColor }}
        >
            <div className="text-xl">
                {state.title}
            </div>

            <div className="flex flex-row-reverse mb-12 w-full justify-center">
                <RowBox>
                    <CustomColumnBox>
                        <LargeText>{`${time.sec < 10 ? "0" : ""}${time.sec}`}</LargeText>
                        <SmallText>seconds</SmallText>
                    </CustomColumnBox>
                </RowBox>
                <RowBox>
                    <CustomColumnBox>
                        <LargeText>{`${time.min < 10 ? "0" : ""}${time.min}`}</LargeText>
                        <SmallText>minutes</SmallText>
                    </CustomColumnBox>
                    <ColonStyle>:</ColonStyle>
                </RowBox>
                
                {state.showHour ? 
                    (<RowBox>
                        <CustomColumnBox>
                            <LargeText>{`${time.hour < 10 ? "0" : ""}${time.hour}`}</LargeText>
                            <SmallText>hours</SmallText>
                        </CustomColumnBox>
                        <ColonStyle>:</ColonStyle>
                    </RowBox>
                ) : null}
                {state.showDay ? 
                    (<RowBox>
                        <CustomColumnBox>
                            <LargeText>{`${time.day < 10 ? "0" : ""}${time.day}`}</LargeText>
                            <SmallText>days</SmallText>
                        </CustomColumnBox>
                        <ColonStyle>:</ColonStyle>
                    </RowBox>
                ) : null}
            </div>
            {state.showDate ? (<div className="text-md">{state.date}</div>) : null}
        </div>
    )
}
