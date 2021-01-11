import React, { useEffect, useState, useContext } from 'react'
import WebFont from 'webfontloader'
import moment from 'moment'
import convert from '../constants/convertSecToTime'
import short from 'short-uuid'
import { Main, Loader } from '../components'
import { FirebaseContext } from '../backend'
import { useParams } from 'react-router-dom'
import {Text} from '../components/Shared'

export default () => {
    const [state, setState] = useState(null);
    const [isLoading, setLoader] = useState(true)
    const firebase = useContext(FirebaseContext)
    const { countdownId } = useParams()
    const translator = short()

    useEffect(() => {
        setLoader(true)

        const id = countdownId.split('_')
        if(id[0] === 'local') {
            let localData = JSON.parse(localStorage.getItem('mypages'))

            if (localData) {
                const data = localData.pages[Number(id[1])]
                setData(data)
            }
        } else {
            firebase.getCountdownPageData(translator.toUUID(countdownId)).then((data) => {
                setData(data)
            })
        }
    }, [firebase, countdownId])

    const setData = (data) => {
        if (data) {
            WebFont.load({
                google: {
                    families: [data.fontFamily]
                }
            })

            if (data.showLabel === undefined) {
                data = { ...data, showLabel: true }
            }

            if (data.timerFontStyle === undefined || 
                data.titleFontStyle === undefined ||
                data.dateFontStyle === undefined ) {
                data = { 
                    ...data, 
                    timerFontStyle: {
                        fontSize: '8vw'
                    },
                    dateFontStyle: {
                        fontSize: '8vw'
                    }, 
                    titleFontStyle: {
                        fontSize: '8vw'
                    }, 
                }
            }

            if (data.useDate) {
                // uses the date key on the data for calculation.
                // overides the hour, day, min, sec
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
            
            if (data.isPublic){
                setState(data)
            } else {
                const user = firebase.getUser

                if (user && user.uid === data.user) {
                    setState(data)
                } else {
                    setState(null)
                }
            }  
            setLoader(false)
        }
    }

    
    return (
        <div className="h-screen w-screen overflow-hidden">
            {isLoading ? 
                <Loader /> : (
                    state ?
                        <Main state={{ ...state, cache: false, freeze: false }} updateCache={() => {}} className="w-full h-full" /> 
                        :
                        (
                            <div className='w-full h-full bg-gray-300 flex justify-center items-center'>
                                <Text>This Page Is Private</Text>
                            </div>
                        )
                )
            }
        </div>
    )
}