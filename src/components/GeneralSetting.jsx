import React from 'react'
import { SmallBtn, LongBtn, ColumnBox, RowBox, InputBox, TextBoxed } from './Shared'

export default ({ state, updateState }) => (
    <div className="px-2 py-6 h-full w-full">          
        <ColumnBox>
            <TextBoxed>Title</TextBoxed>
            <InputBox className="py-2"/>
        </ColumnBox>
        <ColumnBox>
        <TextBoxed>Time</TextBoxed>
            <RowBox>
                <InputBox type="number" className="w-1/4 mr-3" min={0} max={99} /> 
                <InputBox type="number" className="w-1/4 mr-3" min={0} max={23} /> 
                <InputBox type="number" className="w-1/4 mr-3" min={0} max={59} />
                <InputBox type="number" className="w-1/4" min={0} max={59} />
            </RowBox>
        </ColumnBox>
        <ColumnBox>
            <TextBoxed>Date</TextBoxed>
            <InputBox type="date" className="py-2"/>
        </ColumnBox>
        <ColumnBox>
            <TextBoxed>Show</TextBoxed>
            <RowBox>
                <SmallBtn 
                    className="w-1/3" 
                    selected={state.date}
                    onClick={() => updateState((prev) => ({...state, date: !prev.date}))}
                >Date</SmallBtn> 
                <SmallBtn
                    className="w-1/3 mx-3" 
                    selected={state.day}
                    onClick={() => updateState((prev) => ({...state, day: !prev.day}))}
                >Days</SmallBtn>
                <SmallBtn 
                    className="w-1/3" 
                    selected={state.hour}
                    onClick={() => updateState((prev) => ({...state, hour: !prev.hour}))}
                >Hours</SmallBtn>
            </RowBox>
        </ColumnBox>
        <ColumnBox>
            <TextBoxed>Display</TextBoxed> {/*  (Text to show when time reached) */}
        </ColumnBox>
        <ColumnBox>
            <LongBtn>Background</LongBtn>
        </ColumnBox>
        <ColumnBox>
            <LongBtn>Text</LongBtn>
        </ColumnBox>
    </div>
)
