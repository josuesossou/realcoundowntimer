import styled from "styled-components";
import tw from "twin.macro"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft, faArrowLeft, faTimes,
     faPlus, faTh, faShareAlt, faHeart, faLock } from '@fortawesome/free-solid-svg-icons'

// Logo
export const Logo = styled.div.attrs({
    className: "text-gray-500 cursor-default",
})`
    font-family: 'Racing Sans One';
    fontSize: '1.5em'
`

// Buttons 
export const Button = styled.button.attrs({
    className: `transition duration-500 ease-in-out 
                 h-auto w-auto text-gray-300 bg-gray-700
                `
})`
    outline: 0 !important;
`
export const SmallBtn = styled(Button).attrs(({selected}) => ({
    className: `p-2 relative ${selected ? 'shadow-lg' : ' bg-gray-900'}`
}))``

export const LongBtn = styled(Button).attrs({
    className: "flex justify-start hover:bg-gray-600 shadow-lg relative"
})``

// wrappers, flex column
export const ColumnBox = styled.div.attrs({
    className: 'flex flex-col'
})``

export const CustomColumnBox = styled(ColumnBox).attrs({
    className: 'justify-start mb-5'
})``

// wrappers flex row
export const RowBox = styled.div.attrs({
    className: 'flex'
})``

export const InputBox = styled.input.attrs({
    className: 'transition duration-500 ease-in-out bg-gray-900 focus:bg-gray-700 text-gray-300 pl-2 py-2 w-full'
})`
    outline: 0 !important   
`

export const SelectBox = styled.select.attrs({
    className: 'transition duration-500 ease-in-out bg-gray-900 focus:bg-gray-700 text-gray-300 pl-2 py-2 w-auto'
})`
    outline: 0 !important;
`

const Input = styled.input.attrs({
    className: `bg-gray-400 text-gray-900 
        focus:bg-gray-200 py-2 w-full pl-2`
})`
    outline: 0 !important  
`

export const FormInput = ({ type, onChange, value}) => (
    <Input 
        type={type}
        value={value}
        maxLength={35}
        onChange={onChange}
    />
)

export const Text = styled.p.attrs({
    className: "font-semibold"
})``
export const HeaderText = styled(Text).attrs({
    className: "mb-2 "
})``

export const Wrapper = styled.div.attrs({
    className:"px-2 py-6 h-full w-full"
})``

// Radio selection
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

// Left and Right arrow wrapper and buttons
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
export const Separator = styled.div.attrs({
    className: 'mb-5'
})``

export const RowSeparator = styled.div.attrs({
    className: 'ml-5'
})``

export const Hr = styled.div.attrs({
    className: 'border border-1 border-gray-700 '
})``

export const SideBarWraper = styled.div.attrs({
    className: 'lg:relative absolute sm:w-3/5 w-full lg:w-1/5 h-full z-10 overflow-hidden'
})`
    left: ${props => props.left};
    transition: left .5s cubic-bezier(0.820, 0.085, 0.395, 0.895);
    @media (min-width: 1024px) { left: 0 }
`

// Customize button on the preview page for smaller devices
export const Customize = styled.div.attrs({
    className: 'absolute lg:hidden bg-gray-200 shadow-lg py-2 px-3' 
})`
    left: 2em;
    top: 1em;
`

export const Spinner = styled.svg.attrs({
    className: 'animate-spin h-8 w-8 mr-3 bg-gray-800',
    viewBox: '0 0 24 24'
})``

// Icons from Font Awesome
export const AngleRightIcon = () => <FontAwesomeIcon icon={faAngleRight} />
export const AngleLeftIcon = () => <FontAwesomeIcon icon={faAngleLeft} />
export const ArrowLeftIcon = () => <FontAwesomeIcon icon={faArrowLeft} />
export const Close = () => <FontAwesomeIcon icon={faTimes} />
export const AddIcon = () => <FontAwesomeIcon icon={faPlus} />
export const FilterIcon = () => <FontAwesomeIcon icon={faTh} color='#1a202c' />
export const ShareIcon = () => <FontAwesomeIcon icon={faShareAlt} color='#e2e8f0' />
export const LikeIcon = ({color}) => <FontAwesomeIcon icon={faHeart} color={color} />
export const LockIcon = () => <FontAwesomeIcon icon={faLock} />