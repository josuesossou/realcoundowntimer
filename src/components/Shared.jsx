import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft, faArrowLeft } from '@fortawesome/free-solid-svg-icons'


const Button = styled.button.attrs({
    className: `transition duration-500 ease-in-out 
                 h-auto w-auto text-gray-300 bg-gray-700
                `
})`
    outline: 0 !important   
`
export const SmallBtn = styled(Button).attrs(({selected}) => ({
    className: `p-2 bg-gray-700 relative ${selected ? 'shadow-lg' : ' bg-gray-900'}`
}))``

export const LongBtn = styled(Button).attrs({
    className: "flex justify-start hover:bg-gray-600 shadow-lg relative"
})``

export const ColumnBox = styled.div.attrs({
    className: 'flex flex-col'
})``

export const CustomColumnBox = styled(ColumnBox).attrs({
    className: 'justify-start mb-5'
})``

export const RowBox = styled.div.attrs({
    className: 'flex'
})``

export const InputBox = styled.input.attrs({
    className: 'transition duration-500 ease-in-out bg-gray-900 focus:bg-gray-700 text-gray-300 pl-2 py-2'
})`
    outline: 0 !important   
`
export const Text = styled.p.attrs({
    className: "font-semibold"
})``
export const HeaderText = styled(Text).attrs({
    className: "mb-2 "
})``

export const Wrapper = styled.div.attrs({
    className:"px-2 py-6 h-full w-full"
})``

export const RadioSelection = styled.div.attrs(({selected}) => ({
    className:`p-2 w-full h-auto transition duration-500 ease-in-out
                ${selected ? 'bg-gray-900' : 'bg-gray-700'} flex justify-start items-center
                text-gray-400 shadow-lg cursor-pointer`
}))``

export const RadioDot = styled.div.attrs(({selected}) => ({
    className: `rounded-full 
                ${selected ? 'bg-gray-200 border-4 border-blue-600 w-4 h-4' :
                             'border-2 border-gray-200 w-4 h-4 border-opacity-25'} mr-4`
}))`
`
const Arrow = styled.div.attrs({
    className: `absolute bottom-0 top-0 h-full w-2/12 z-10 flex justify-center 
                items-center cursor-pointer text-gray-300 `
})``

export const RightArrow = styled(Arrow).attrs({
    className: 'right-0'
})``

export const LeftArrow = styled(Arrow).attrs({
    className: 'left-0'
})``

export const ColorPickerBg = styled.div.attrs({
    className: 'w-10/12 h-10 relative top-0 left-0'
})`
    background-color: ${props => props.bgColor}
`

export const BgContent = styled.div.attrs({
    className: 'w-full h-full absolute top-0 bottom-0 left-0 right-0 bg-yellow-600 z-0'
})`
    // z-index: -1;
    background: ${props=> props.bg}
`
export const Separator = styled.p.attrs({
    className: 'mb-5'
})``

export const Hr = styled.div.attrs({
    className: 'border border-1 border-gray-700 '
})``

export const AngleRightIcon = () => <FontAwesomeIcon icon={faAngleRight} />
export const AngleLeftIcon = () => <FontAwesomeIcon icon={faAngleLeft} />
export const ArrowLeftIcon = () => <FontAwesomeIcon icon={faArrowLeft} />