import React, { useState } from 'react'
import styled from "styled-components"
import { Link } from 'react-router-dom'
import WebFont from 'webfontloader'
import moment from 'moment'
import convert from '../constants/convertSecToTime'
import short from 'short-uuid'
import { COUNTDOWN_PREVIEW, COUNTDOWN_PAGE } from '../constants/routes'
import { SmallBtn, BgContent, ColumnBox, Text, LockIcon } from './Shared'

const PageContainer = styled.div.attrs({
    className: `lg:w-2/6 sm:w-3/6 w-full relative
    mb-20 px-3`
})``

const ContentWrapper = styled.div.attrs({
    className: ` w-full shadow-md relative`
})``

const BottomBar = styled.div.attrs({
    className: 'w-full h-auto relative flex justify-between items-center pr-3'
})``

const SmallpagerStyle = styled.div.attrs({
    className: 'w-full h-auto bg-yellow-500 relative py-3'
})``

const CountDownWrapper = styled.div.attrs({
    className: 'h-full w-full flex flex-col items-center justify-center z-10 relative'
})`
    color: ${props => props.textColor};
    font-family: ${props => props.fontFamily};
`

/***  STYLES COPIED FROM MAIN.JSX TO KEEP THE FORMAT */
const CustomColumnBox = styled(ColumnBox).attrs(({ heirachy }) => ({
    className: `items-center relative w-1/5 
                ${heirachy === 2 ? 'shadow-lg' : ''}`
}))`
    box-sizing: content-box;
    background: ${props => props.bg};
`
const SmallText = styled.div.attrs({
    className: 'mb-0'
})`
    line-height: normal;
    font-size: 6%;
`
const LargeText = styled.div.attrs(({ heirachy }) => ({
    className: `p-0 m-0 mb-1 relative text-center max-w-full px-2
                text-${heirachy === 1 ? 'shadow-lg' : ''}`
}))`
    box-sizing: content-box;
    line-height: normal;
    font-size: auto;
    background: ${props => props.bg};
`
const ColonStyle = styled.p.attrs(({ heirachy }) => ({
    className: `px-2`
}))`
    line-height: normal;
    font-size: auto;
    background: ${props => props.bg};
`
const CounterWrapper = styled.div.attrs({
    className: `flex flex-row-reverse mb-2 px-3 w-11/12 justify-center`
})`
    box-sizing: border-box;
`

export default ({ pageData, typeData }) => {
    const [page, setPage] = useState(pageData)
    const translator = short()
    const [countdownId, setId] = useState('')

    React.useEffect(() => {
        WebFont.load({
            google: {
                families: [pageData.fontFamily]
            }
        })
        
        if (pageData.id.split('_')[0] === 'local') {
            setId(pageData.id)
        } else {
            setId(translator.fromUUID(pageData.id))
        }
        

        if (pageData.useDate) {
            const value = pageData.useDateString

            // today date format
            const now = new Date(Date.now())
            const seconds = moment(value).diff(moment(now), 'seconds', true).toString()

            const {d, h, m, s} = convert(seconds)
            if (d < 0) {
                setPage(page => ({ ...page,  days: 0, hours: 0,
                    minutes: 0, seconds: 0}))
            } else {
                setPage(page => ({ ...page, days: d, hours: h,
                    minutes: m, seconds: s }))
            }
        }

        if (pageData.useTime) {
            const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
            const date =  new Date(Date.now()).toLocaleString('en-US', dateOptions)
            setPage(page => ({ ...page, date }))
        }

    }, [pageData.fontFamily, pageData.useDate, pageData.useTime, pageData.useDateString])

    return (
        <PageContainer>
            <ContentWrapper>
                <SmallpagerStyle >
                    {page.bgType === 'solid' ? 
                        <BgContent bg={page.bgColor} /> : null} 

                    {page.bgType === 'gradient' ? 
                        <BgContent bg={`linear-gradient(${page.gradientAngle}deg, ${page.gradientFirstColor}, ${page.gradientSecondColor})`} /> : null}

                    {page.bgType === 'url' ? 
                        <BgContent bg={`${page.bgColor} url("${page.urlBg}") center/${page.urlBgSize} no-repeat`} /> : null}

                    <CountDownWrapper textColor={page.textColor} fontFamily={`'${page.fontFamily}'`}>
                        {!page.title || page.title === '' ? (
                            <p className='mb-2 opacity-0'>A</p>
                        ) : (
                            <p className='mb-2'>{page.title}</p>
                        )}
                        
                        
                        <CounterWrapper>
                            <CustomColumnBox 
                                bg={page.counterBgHeirearchy >= 2 ? page.counterBgColor : ''}
                                heirachy={page.counterBgHeirearchy}>
                                <LargeText 
                                    bg={page.counterBgHeirearchy >= 1 ? page.counterBgColor : ''}
                                    heirachy={page.counterBgHeirearchy}>
                                    {`${page.seconds < 10 ? "0" : ""}${page.seconds}`}
                                </LargeText>
                                <SmallText>seconds</SmallText>
                            </CustomColumnBox>
                        
                            <ColonStyle
                                bg={page.counterBgHeirearchy >= 3 ? page.counterBgColor : ''}
                                heirachy={page.counterBgHeirearchy}
                            >:</ColonStyle>
                            
                            <CustomColumnBox 
                                bg={page.counterBgHeirearchy >= 2 ? page.counterBgColor : ''}
                                heirachy={page.counterBgHeirearchy}>
                                <LargeText 
                                    bg={page.counterBgHeirearchy >= 1 ? page.counterBgColor : ''}
                                    heirachy={page.counterBgHeirearchy}>
                                    {`${page.minutes < 10 ? "0" : ""}${page.minutes}`}
                                </LargeText>
                                <SmallText>minutes</SmallText>
                            </CustomColumnBox>
                            
                            {page.showHour ? 
                                (<>
                                    <ColonStyle
                                        bg={page.counterBgHeirearchy >= 3 ? page.counterBgColor : ''}
                                        heirachy={page.counterBgHeirearchy}
                                    >:</ColonStyle>
                                    <CustomColumnBox 
                                        bg={page.counterBgHeirearchy >= 2 ? page.counterBgColor : ''} 
                                        heirachy={page.counterBgHeirearchy}>
                                        <LargeText 
                                            bg={page.counterBgHeirearchy >= 1 ? page.counterBgColor : ''}
                                            heirachy={page.counterBgHeirearchy}>
                                            {`${page.hours < 10 ? "0" : ""}${page.hours}`}
                                        </LargeText>
                                        <SmallText>hours</SmallText>
                                    </CustomColumnBox>
                                </>
                            ) : null}

                            {page.showDay ? 
                                (<>
                                    <ColonStyle
                                        bg={page.counterBgHeirearchy >= 3 ? page.counterBgColor : ''}
                                        heirachy={page.counterBgHeirearchy}
                                    >:</ColonStyle>
                                    <CustomColumnBox 
                                        bg={page.counterBgHeirearchy >= 2 ? page.counterBgColor : ''}
                                        heirachy={page.counterBgHeirearchy}>
                                        <LargeText 
                                            bg={page.counterBgHeirearchy >= 1 ? page.counterBgColor : ''}
                                            heirachy={page.counterBgHeirearchy}>
                                            {`${page.days < 10 ? "0" : ""}${page.days}`}
                                        </LargeText>
                                        <SmallText>days</SmallText>
                                    </CustomColumnBox>
                                </>
                            ) : null}
                        </CounterWrapper>
                        {page.showDate ? 
                            (<div style={{ fontSize: '0.6em' }}>{page.date}</div>) : 
                            (<p style={{ opacity: 0, fontSize: '0.6em', cursor: 'default' }}>{'b '}</p>)}

                    </CountDownWrapper>
                </SmallpagerStyle>
                <BottomBar>
                    {typeData === 'mypages' ?
                        (<Link to={`/${COUNTDOWN_PREVIEW}/edit-page/${countdownId}`}>
                            <SmallBtn>
                                Edit
                            </SmallBtn>
                        </Link>)
                        :
                        (<Link to={`/${COUNTDOWN_PREVIEW}/new-page/${countdownId}`}>
                            <SmallBtn>
                                <Text>Customize</Text>
                            </SmallBtn>
                        </Link>)
                    }
                    {page.isPublic || typeData === 'mypages'? 
                    (
                        <Text className='text-gray-800'>
                            <Link to={`/${COUNTDOWN_PAGE}/${countdownId}`} target='_blank'>Preview</Link>
                        </Text>
                    ) : (
                        <Text className='text-gray-500'>
                            <LockIcon />
                        </Text>
                    )}
                </BottomBar>
            </ContentWrapper>
        </PageContainer>
    )
}