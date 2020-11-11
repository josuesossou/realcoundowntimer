import React, { useState, useEffect } from 'react'

export default ({days, hours, minutes, seconds}) => {
    const [time, setTime] = useState({})

    const tick = (secs,mins,hrs,days) => {
        setTimeout(() => {
            let newSec = secs, newMin = mins, newHour = hrs, newDay = days

            newSec = secs-1

            if (secs === 0) {
                if (mins === 0) {
                    if (hrs === 0) {
                        if (days === 0) {
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
                tick(newSec, newMin, newHour, newDay)
            }

        }, 990)
    }

    useEffect(() => {
        tick(seconds, minutes, hours, days)
    }, [])

    return (
        <div className="h-full w-full bg-red-500">
            <div>{time.sec? `${time.sec < 10 ? "0" : ""}${time.sec}` : "00"}</div>
            <div>{time.min? `${time.min < 10 ? "0" : ""}${time.min}` : "00"}</div>
            <div>{time.hour? `${time.hour < 10 ? "0" : ""}${time.hour}` : "00"}</div>
            <div>{time.day? `${time.day < 10 ? "0" : ""}${time.day}` : "00"}</div>
        </div>
    )
}