import React, { useState, useEffect, useRef, useCallback } from 'react'
import { RowBox, ColumnBox, BgContent } from './Shared'
import WebFont from 'webfontloader'
import styled from 'styled-components'

const CustomColumnBox = styled(ColumnBox).attrs(({ heirachy }) => ({
    className: `items-center relative px-3
                ${heirachy === 2 ? 'shadow-lg' : ''}`
}))`
    background: ${props => props.bg};
`
const SmallText = styled.div.attrs({
    className: 'text-xm mb-3'
})`
    line-height: normal;
`
const LargeText = styled.div.attrs(({ heirachy }) => ({
    className: `text-2xl p-0 m-0 mb-3 relative text-center
                ${heirachy === 1 ? 'shadow-lg' : ''}`
}))`
    line-height: normal;
    background: ${props => props.bg};
`
const ColonStyle = styled.p.attrs({
    className: "text-2xl px-3"
})`
    line-height: normal;
`
const CounterWrapper = styled.div.attrs(({ heirachy }) => ({
    className: `flex flex-row-reverse mb-10 pb-3 px-3 w-auto justify-center
                ${heirachy === 3 ? 'shadow-lg' : ''}`
}))`
    background: ${props => props.bg};
`
const CountDownWrapper = styled.div.attrs({
    className: 'h-full w-full flex flex-col items-center justify-start pt-16 z-10 relative'
})`
    color: ${props => props.textColor};
    font-family: 'Bowlby One';
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

    WebFont.load({
        google: {
          families: ['Droid Sans', 'Droid Serif', 'Bowlby One']
        }
    })

    return (
        <div className="h-full w-full shadow-lg relative">
            {state.bgType === 'solid' ? 
                <BgContent bg={state.bgColor} /> : null} 

            {state.bgType === 'gradient' ? 
                <BgContent bg={`linear-gradient(${state.gradientAngle}deg, ${state.gradientFirstColor}, ${state.gradientSecondColor})`} /> : null}

            {state.bgType === 'url' ? 
                <BgContent bg={`${state.bgColor} url("${state.urlBg}") center/${state.urlBgSize} no-repeat`} /> : null}
            

            <CountDownWrapper textColor={state.textColor}>
                <div className="text-xl">
                    {state.title}
                </div>

                <CounterWrapper 
                    bg={state.counterBgHeirearchy === 3 ? state.counterBgColor : ''}
                    heirachy={state.counterBgHeirearchy}>
                    <RowBox>
                        <CustomColumnBox 
                            bg={state.counterBgHeirearchy === 2 ? state.counterBgColor : ''}
                            heirachy={state.counterBgHeirearchy}>
                            <LargeText 
                                bg={state.counterBgHeirearchy === 1 ? state.counterBgColor : ''}
                                heirachy={state.counterBgHeirearchy}>
                                {`${time.sec < 10 ? "0" : ""}${time.sec}`}
                            </LargeText>
                            <SmallText>seconds</SmallText>
                        </CustomColumnBox>
                    </RowBox>
                    <RowBox>
                        <CustomColumnBox 
                            bg={state.counterBgHeirearchy === 2 ? state.counterBgColor : ''}
                            heirachy={state.counterBgHeirearchy}>
                            <LargeText 
                                bg={state.counterBgHeirearchy === 1 ? state.counterBgColor : ''}
                                heirachy={state.counterBgHeirearchy}>
                                {`${time.min < 10 ? "0" : ""}${time.min}`}
                            </LargeText>
                            <SmallText>minutes</SmallText>
                        </CustomColumnBox>
                        <ColonStyle>:</ColonStyle>
                    </RowBox>
                    
                    {state.showHour ? 
                        (<RowBox >
                            <CustomColumnBox 
                                bg={state.counterBgHeirearchy === 2 ? state.counterBgColor : ''} 
                                heirachy={state.counterBgHeirearchy}>
                                <LargeText 
                                    bg={state.counterBgHeirearchy === 1 ? state.counterBgColor : ''}
                                    heirachy={state.counterBgHeirearchy}>
                                    {`${time.hour < 10 ? "0" : ""}${time.hour}`}
                                </LargeText>
                                <SmallText>hours</SmallText>
                            </CustomColumnBox>
                            <ColonStyle>:</ColonStyle>
                        </RowBox>
                    ) : null}

                    {state.showDay ? 
                        (<RowBox>
                            <CustomColumnBox 
                                bg={state.counterBgHeirearchy === 2 ? state.counterBgColor : ''}
                                heirachy={state.counterBgHeirearchy}>
                                <LargeText 
                                    bg={state.counterBgHeirearchy === 1 ? state.counterBgColor : ''}
                                    heirachy={state.counterBgHeirearchy}>
                                    {`${time.day < 10 ? "0" : ""}${time.day}`}
                                </LargeText>
                                <SmallText>days</SmallText>
                            </CustomColumnBox>
                            <ColonStyle>:</ColonStyle>
                        </RowBox>
                    ) : null}
                </CounterWrapper>
                {state.showDate ? (<div className="text-md">{state.date}</div>) : null}
            </CountDownWrapper>
        </div>
    )
}
