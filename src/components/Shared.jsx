import styled from "styled-components";

const Button = styled.button.attrs(({selected}) => ({
    className: `transition duration-500 ease-in-out 
                h-auto w-auto text-gray-300 bg-gray-700
                shadow-lg ${selected ? 'bg-gray-900' : ''}
                `
}))`
    outline: 0 !important   
`
export const SmallBtn = styled(Button).attrs({
    className: "p-2 bg-gray-700"
})``
export const LongBtn = styled(Button).attrs({
    className: "p-2 flex justify-start hover:bg-gray-600"
})``

export const ColumnBox = styled.div.attrs({
    className: 'flex flex-col justify-start mb-5'
})``

export const RowBox = styled.div.attrs({
    className: 'flex'
})``

export const InputBox = styled.input.attrs({
    className: 'transition duration-500 ease-in-out bg-gray-900 focus:bg-gray-700 text-gray-300 pl-2 py-2'
})`
    outline: 0 !important   
`
export const TextBoxed = styled.p.attrs({
    className: "font-bold mb-1"
})``