import React, { useEffect, useState, useContext } from 'react'
import WebFont from 'webfontloader'
import moment from 'moment'
import convert from '../constants/convertSecToTime'
import { Main, Loader } from '../components'
import { FirebaseContext } from '../backend'
import { useParams } from 'react-router-dom'

export default () => {
    const [state, setState] = useState(null);
    const firebase = useContext(FirebaseContext)
    const { countdownId } = useParams()

    useEffect(() => {
        firebase.getCountdownPageData(countdownId).then((data) => {
            if (data) {
                WebFont.load({
                    google: {
                        families: [data.fontFamily]
                    }
                })

                if (data.useDate) {
                    const value = data.useDateString

                    // today date format
                    const now = new Date(Date.now())
                    const seconds = moment(value).diff(moment(now), 'seconds', true).toString()

                    const {d, h, m, s} = convert(seconds)
                    if (d < 0) {
                        data = { ...data,  days: 0, hours: 0,
                            minutes: 0, seconds: 0}
                    } else {
                        data = { ...data, days: d, hours: h,
                            minutes: m, seconds: s }
                    }
                }

                if (data.useTime) {
                    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
                    const date =  new Date(Date.now()).toLocaleString('en-US', dateOptions)
                    data = { ...data, date }
                }
                
                if (data.privacy === 'public') {
                    setState(data)
                } else if (data.privacy === 'private') {
                    // check if user id is equal
                    // firebase.userId === data.userId
                }
                setState(data)
            }
        })
    }, [firebase, countdownId])


    
    return (
        <div className="h-screen w-screen overflow-hidden">
            {state ? 
                <Main state={{ ...state, cache: false, freeze: false }} updateCache={() => {}} className="w-full h-full" /> : 
                <Loader />
            }
        </div>
    )
}