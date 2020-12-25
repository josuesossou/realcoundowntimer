import React, { useState, useContext, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { FormInput, SmallBtn, Text } from './Shared'
import Logo from './Logo'
import styled from 'styled-components'
import { FirebaseContext } from '../backend'
import { LOGIN_PAGE, SIGNUP_PAGE } from '../constants/routes'

const FormWrapper = styled.div.attrs({
    className: 'w-full md:w-2/5 sm:w-2/3 lg:w-1/4'
})``

const LabelInput = styled.label.attrs(({ err }) => ({
   className: `mb-3 block ${err ? 'border-b-2 border-red-400' : ''}`
}))``

const ErrorWrapper = styled.div.attrs({
    className: `border-2 border-red-300 bg-red-300 text-red-900
    absolute w-full sm:w-2/3 md:w-1/2 p-3 top-0`
})``

 
export default () => {
    const { type } = useParams()
    const history = useHistory()
    const pattern = /^[a-zA-Z0-9 ]+$/
    const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&* ])([a-zA-Z0-9!@#$%^&* ]{8,30})$/
    const [errorMsg, setMessage] = useState({ message: '', errLocation: 0 })
    const [formData, formUpdate] = useState({
        email: '',
        password: '',
        rePassword: '',
        fullName: ''
    })

    useEffect(() => {
        if (type === 'signout') {
            firebase.doSignOut().then(() => {
                firebase.setUser()
                history.goBack()
            })
        }
    }, [])

    const firebase = useContext(FirebaseContext)

    const login = async ({ email, password }) => {
        try {
            await firebase.doSignInWithEmailAndPassword(email, password)
            firebase.setUser()
            history.goBack()
        } catch (error) {
            let message
            if (error.code === 'auth/user-not-found') {
                message = "There is no user account that match the credential provided."
            } else {
                message = error.message
            }

            setMessage({ 
                message: message,
                errLocation: 10
            })
        }
    }

    const register = async ({ email, password }) => {
        try {
            await firebase.doCreateUserWithEmailAndPassword(email, password)
            firebase.setUser()
            history.goBack()
        } catch (error) {
            setMessage({ 
                message: error.message,
                errLocation: 10
            })
        }
    }

    const submit = (e) => {
        e.preventDefault();
        setMessage({message: '', errLocation: 0})

        if (!formData.email.match(/^.+@[a-zA-Z0-9.]+\.[a-z]{1,3}$/)) {
            return setMessage({ 
                message: `Email does not match required pattern. Please make sure
                your email is in the form: example@domain.com`,
                errLocation: 1
            })
        }

        if (!formData.password.match(passwordPattern)) {
            return setMessage({ 
                message: `Password must contain at least one lowercase letter one uppercase letter,
                one number, one special character, and at least 8 characters long.`,
                errLocation: 2
            })
        }

        if (type === 'login') {
            return login(formData)
        }

        if (!formData.rePassword.match(passwordPattern)) {
            return setMessage({ 
                message: `Password must contain at least one lowercase letter, one uppercase letter,
                one number, one special character, and at least 8 characters long.`,
                errLocation: 3
            })
        }

        if (formData.password !== formData.rePassword) {
            return setMessage({ 
                message: `Passwords do not match.`,
                errLocation: 5
            })
        }

        register(formData)
    }

    return (
        <div 
            className={`w-screen h-screen relative bg-gray-300
                        flex justify-center items-center text-gray-800`}
        >
           { errorMsg.errLocation !== 0 ?
                (<ErrorWrapper>
                    {errorMsg.message}
                </ErrorWrapper>) : 
            null}

            <FormWrapper>
                <div className='w-full flex justify-center mb-5'>
                    <Logo />
                </div>
                
                <form className='mb-3 pb-5 border-b border-gray-400' onSubmit={submit}>
                    <LabelInput err={errorMsg.errLocation === 1}>
                        <Text>Email</Text>
                        <FormInput
                            type={'email'}
                            value={formData.email}
                            // pattern={'/^.@[a-zA-Z0-9.]+.[a-z]{1-3}$/'}
                            onChange={(e) => {
                                const val = e.target.value
                                formUpdate({ ...formData, email: '' + val })

                            }}
                        />
                    </LabelInput>

                    <LabelInput err={errorMsg.errLocation === 2 || errorMsg.errLocation === 5}>
                        <Text>Password</Text>
                        <FormInput
                            type={'password'}
                            value={formData.password}
                            min={8}
                            pattern={pattern}
                            onChange={(e) => {
                                const val = e.target.value
                                formUpdate({ ...formData, password: '' + val })
                            }}
                        />
                    </LabelInput>

                    {type === 'signup' ? (<LabelInput err={errorMsg.errLocation === 3 || errorMsg.errLocation === 5}>
                        <Text>Re-Enter Password</Text>
                        <FormInput
                            type={'password'}
                            value={formData.rePassword}
                            min={8}
                            pattern={pattern}
                            onChange={(e) => {
                                const val = e.target.value
                                formUpdate({ ...formData, rePassword: '' + val })
                            }}
                        />
                    </LabelInput>) : null}

                    {/* <LabelInput err={errorMsg.errLocation === 4}>
                        Full Name
                        <FormInput
                            type={'text'}
                            value={formData.fullName}
                            pattern={pattern}
                            onChange={(e) => {
                                const val = e.target.value
                                formUpdate({ ...formData, fullName: '' + val })

                            }}
                        />
                    </LabelInput> */}
                    <br />
                    <SmallBtn className='w-full'>
                        Submit
                    </SmallBtn>
                </form>

                {/* <SmallBtn className='w-full'>
                    {type === 'login' ? 'Login' : 'Sign up'} Using Your Google Account
                </SmallBtn> */}
                
                {type === 'login' ? 
                    (<Text className='text-'>
                        Are you new here?  
                        <Link to={SIGNUP_PAGE} className='font-extrabold'> Sign up</Link>
                    </Text>) : 
                    (<Text>
                        Already have an account? 
                        <Link to={LOGIN_PAGE} className='font-extrabold'> Login</Link>
                    </Text>)
                }
            </FormWrapper>
        </div>   
    )
}