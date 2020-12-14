import React, { useEffect } from 'react'
import { Wrapper, CustomColumnBox, HeaderText, InputBox, SmallBtn,
        RowBox } from './Shared'
// import '../css/custom.css'

export default ({ state, updateState }) => {
    return (
        <Wrapper>
            <CustomColumnBox>
                <SmallBtn
                    className="w-1/3" 
                    selected={!state.showEndPhrase}
                    onClick={() => 
                        updateState((prev) => ({...prev, showEndPhrase: !prev.showEndPhrase }))
                    }
                >{state.showEndPhrase ? 'Disable' : 'Enable' }
                </SmallBtn>
            </CustomColumnBox>

            <CustomColumnBox>
                <HeaderText>End Phrase</HeaderText>
                <InputBox
                    className="py-2"
                    type='text'
                    value={state.endPhrase}
                    maxLength={35}
                    pattern='/[a-zA-Z0-9]+/'
                    onChange={(e) => {
                        e.preventDefault()
                        if (e.target.value.match('^[a-zA-Z0-9 ]+$')) {
                            updateState({...state, endPhrase: e.target.value})
                        }
                    }}
                />
            </CustomColumnBox>

            <CustomColumnBox>
                <HeaderText>Hide</HeaderText>

                <RowBox>
                <SmallBtn
                    className="w-1/3" 
                    selected={state.showEndTitle}
                    onClick={() => 
                        updateState((prev) => ({...prev, showEndTitle: !prev.showEndTitle }))
                    }
                >Title</SmallBtn>
                <SmallBtn 
                    className="w-1/3 mx-3" 
                    selected={state.showEndDate}
                    onClick={() => 
                        updateState((prev) => ({...prev, showEndDate: !prev.showEndDate}))
                    }
                >Date</SmallBtn>
                </RowBox>
            </CustomColumnBox>
        </Wrapper>
    )
}