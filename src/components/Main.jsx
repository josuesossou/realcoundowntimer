import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ColumnBox, BgContent } from './Shared'
import styled from 'styled-components'

const CustomColumnBox = styled(ColumnBox).attrs(({ heirachy }) => ({
    className: `items-center relative w-1/5 px-2
                ${heirachy === 2 ? 'shadow-lg' : ''}`
}))`
    box-sizing: content-box;
    background: ${props => props.bg};
`
const SmallText = styled.div.attrs({
    className: 'text-xm mb-3'
})`
    line-height: normal;
`
const LargeText = styled.div.attrs(({ heirachy }) => ({
    className: `p-0 m-0 mb-3 relative text-center max-w-full px-2
                text-${heirachy === 1 ? 'shadow-lg' : ''}`
}))`
    box-sizing: content-box;
    line-height: normal;
    font-size: 10vw;
    background: ${props => props.bg};
`
const ColonStyle = styled.p.attrs(({ heirachy }) => ({
    className: `px-2`
}))`
    line-height: normal;
    font-size: 10vw;
    background: ${props => props.bg};
`
const CounterWrapper = styled.div.attrs({
    className: `flex flex-row-reverse mb-20 pb-3 px-3 w-11/12 justify-center`
})`
    box-sizing: content-box;
`
const CountDownWrapper = styled.div.attrs({
    className: 'h-full w-full flex flex-col items-center justify-center z-10 relative'
})`
    color: ${props => props.textColor};
    font-family: ${props => props.fontFamily};
`

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({ state, updateCache }) => {
    const [time, setTime] = useState({ sec: 0, min: 0, hour: 0, day: 0 })
    const [ended, setEnded] = useState(false)
    let timer = useRef()

    const tick = useCallback((secs, mins, hrs, days, freeze) => {
        let newSec = secs, newMin = mins, newHour = hrs, newDay = days

        setTime({sec: newSec, min: newMin, hour: newHour, day: newDay})

        if (state.cache) {
            updateCache({ sec: newSec, min: newMin, hour: newHour, day: newDay })
        }

        newSec = secs-1

        if (secs <= 0) {
            if (mins <= 0) {
                if (hrs <= 0) {
                    if (days <= 0) {
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

        if (newSec >= 0 || newMin > 0 || newHour > 0 || newDay > 0) {
            setEnded(false)

            if (freeze) return // stops the timer
            timer.current = setTimeout(() => tick(newSec, newMin, newHour, newDay), 1000)
        }

        if (newSec < 0 && newMin <= 0 && newHour <= 0 && newDay <= 0) {
            setTime({sec: 0, min: 0, hour: 0, day: 0})

            if (state.cache) {
                updateCache({ sec: 0, min: 0, hour: 0, day: 0 })
            }

            if (state.showEndPhrase) {
                setEnded(true)
            }
        }
    }, [state.cache, updateCache, state.showEndPhrase])

    useEffect(() => {
        clearTimeout(timer.current)
        tick(state.seconds, state.minutes, state.hours, state.days, state.freeze)
    }, [state.seconds, state.minutes, state.hours, state.days, state.freeze, tick])

    return (
        <div className="h-full w-full shadow-lg relative">
            {state.bgType === 'solid' ? 
                <BgContent bg={state.bgColor} /> : null} 

            {state.bgType === 'gradient' ? 
                <BgContent bg={`linear-gradient(${state.gradientAngle}deg, ${state.gradientFirstColor}, ${state.gradientSecondColor})`} /> : null}

            {state.bgType === 'url' ? 
                <BgContent bg={`${state.bgColor} url("${state.urlBg}") center/${state.urlBgSize} no-repeat`} /> : null}
            

            <CountDownWrapper textColor={state.textColor} fontFamily={`'${state.fontFamily}'`}>
                <div className="md:text-xl sm:text-lg text-md mb-10 px-2 text-center">
                    {ended && !state.showEndTitle ? '' : state.title}
                </div>

                {ended ? (
                    <div style={{ fontSize: '8vw' }} className="mb-20 text-center">{state.endPhrase}</div>
                )
                : 
                (
                    <CounterWrapper>
                        <CustomColumnBox 
                            bg={state.counterBgHeirearchy >= 2 ? state.counterBgColor : ''}
                            heirachy={state.counterBgHeirearchy}>
                            <LargeText 
                                bg={state.counterBgHeirearchy >= 1 ? state.counterBgColor : ''}
                                heirachy={state.counterBgHeirearchy}>
                                {`${time.sec < 10 ? "0" : ""}${time.sec}`}
                            </LargeText>
                            <SmallText>seconds</SmallText>
                        </CustomColumnBox>
                    
                        <ColonStyle
                            bg={state.counterBgHeirearchy >= 3 ? state.counterBgColor : ''}
                            heirachy={state.counterBgHeirearchy}
                        >:</ColonStyle>
                        
                        <CustomColumnBox 
                            bg={state.counterBgHeirearchy >= 2 ? state.counterBgColor : ''}
                            heirachy={state.counterBgHeirearchy}>
                            <LargeText 
                                bg={state.counterBgHeirearchy >= 1 ? state.counterBgColor : ''}
                                heirachy={state.counterBgHeirearchy}>
                                {`${time.min < 10 ? "0" : ""}${time.min}`}
                            </LargeText>
                            <SmallText>minutes</SmallText>
                        </CustomColumnBox>
                        
                        {state.showHour ? 
                            (<>
                                <ColonStyle
                                    bg={state.counterBgHeirearchy >= 3 ? state.counterBgColor : ''}
                                    heirachy={state.counterBgHeirearchy}
                                >:</ColonStyle>
                                <CustomColumnBox 
                                    bg={state.counterBgHeirearchy >= 2 ? state.counterBgColor : ''} 
                                    heirachy={state.counterBgHeirearchy}>
                                    <LargeText 
                                        bg={state.counterBgHeirearchy >= 1 ? state.counterBgColor : ''}
                                        heirachy={state.counterBgHeirearchy}>
                                        {`${time.hour < 10 ? "0" : ""}${time.hour}`}
                                    </LargeText>
                                    <SmallText>hours</SmallText>
                                </CustomColumnBox>
                            </>
                        ) : null}

                        {state.showDay ? 
                            (<>
                                <ColonStyle
                                    bg={state.counterBgHeirearchy >= 3 ? state.counterBgColor : ''}
                                    heirachy={state.counterBgHeirearchy}
                                >:</ColonStyle>
                                <CustomColumnBox 
                                    bg={state.counterBgHeirearchy >= 2 ? state.counterBgColor : ''}
                                    heirachy={state.counterBgHeirearchy}>
                                    <LargeText 
                                        bg={state.counterBgHeirearchy >= 1 ? state.counterBgColor : ''}
                                        heirachy={state.counterBgHeirearchy}>
                                        {`${time.day < 10 ? "0" : ""}${time.day}`}
                                    </LargeText>
                                    <SmallText>days</SmallText>
                                </CustomColumnBox>
                            </>
                        ) : null}
                    </CounterWrapper>
                )}

                {(state.showDate && !ended) || (ended && state.showEndDate) ? 
                    (<div className=" sm:text-md text-sm mt-5">{state.date}</div>) : null}
            </CountDownWrapper>
        </div>
    )
}
