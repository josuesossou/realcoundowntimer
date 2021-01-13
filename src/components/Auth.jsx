import React, { useState, useContext, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { FormInput, SmallBtn, Text, ErrorWrapper } from './Shared'
import Logo from './Logo'
import styled from 'styled-components'
import { FirebaseContext } from '../backend'
import { LOGIN_PAGE, SIGNUP_PAGE, PASSWORD_RESET_PAGE, HOME } from '../constants/routes'

const FormWrapper = styled.div.attrs({
    className: 'w-full md:w-2/5 sm:w-2/3 lg:w-1/4'
})``

const LabelInput = styled.label.attrs(({ err }) => ({
   className: `mb-3 block ${err ? 'border-b-2 border-red-400' : ''}`
}))``
 
export default () => {
    const { type } = useParams()
    const history = useHistory()
    const firebase = useContext(FirebaseContext)
    const pattern = /^[a-zA-Z0-9 ]+$/
    const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&* ])([a-zA-Z0-9!@#$%^&* ]{8,30})$/
    const [errorMsg, setMessage] = useState({ message: '', errLocation: 0, success: false })
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

    const login = async ({ email, password }) => {
        try {
            await firebase.doSignInWithEmailAndPassword(email, password)
            firebase.setUser()
            history.push('/')
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
            history.push('/')
        } catch (error) {
            setMessage({ 
                message: error.message,
                errLocation: 10
            })
        }
    }

    const resetPwd = async ({ email }) => {
        try {
            await firebase.doPasswordReset(email)
            setMessage({ 
                message: `Password reset email was sent to ${email}`,
                errLocation: 10,
                success: true
            })
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

        if (type === 'resetpwd') {
            return resetPwd(formData)
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
                        flex-col flex justify-center items-center text-gray-800`}
        >
           { errorMsg.errLocation !== 0 ?
                (<ErrorWrapper success={errorMsg.success}>
                    {errorMsg.message}
                </ErrorWrapper>) : 
            null}

            <FormWrapper>
                <div className='w-full flex justify-center mb-5'>
                    <Logo />
                </div>

                <div className='w-full flex justify-center mb-5'>
                    <Text className='text-md'>
                        {type === 'signup' ? 'Sign Up': ''} 
                        {type === 'login' ? 'Login' : ''}
                        {type === 'resetpwd' ? 'Password Reset' : ''}
                    </Text>
                </div>
                
                <form className='mb-3 pb-5 border-b border-gray-400' onSubmit={submit}>
                    <LabelInput err={errorMsg.errLocation === 1}>
                        <Text>Email</Text>
                        <FormInput
                            type={'email'}
                            value={formData.email}
                            onChange={(e) => {
                                const val = e.target.value
                                formUpdate({ ...formData, email: '' + val })

                            }}
                        />
                    </LabelInput>
                    
                    {type !== 'resetpwd' ? (
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
                    ) : null}

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
                    <br />
                    <SmallBtn className='w-full'>
                        Submit
                    </SmallBtn>
                </form>
                
                {type === 'login' ? 
                    (<Text className='text-'>
                        Are you new here?  
                        <Link to={SIGNUP_PAGE} className='font-extrabold'> Sign up</Link>
                        <br />
                        Forgot your password? 
                        <Link to={PASSWORD_RESET_PAGE} className='font-extrabold'> Reset</Link>
                    </Text>) : null}
                {type === 'signup' ?
                    (<Text>
                        Already have an account? 
                        <Link to={LOGIN_PAGE} className='font-extrabold'> Login</Link>
                    </Text>) : null}
                
                {type === 'resetpwd' ?
                    (<Text>
                        Already have an account? 
                        <Link to={LOGIN_PAGE} className='font-extrabold'> Login</Link>
                        <br />
                        Are you new here?  
                        <Link to={SIGNUP_PAGE} className='font-extrabold'> Sign up</Link>
                    </Text>) : null}
            </FormWrapper>
            {type === 'signup' ?
                (<p className='w-1/3 text-center mt-5 text-gray-700'>
                    You do not need to provide a valid email address, and you won't be
                    able to reset your password if your email is invalid. 
                </p>) : null}
            <Text className='text-center underline mt-8'>
                <Link to={HOME}>Home</Link>
            </Text>
        </div>   
    )
}