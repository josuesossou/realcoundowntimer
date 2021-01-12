import React from 'react'
import {Text} from './Shared'

export default () => {
    return (
        <div className={`w-full min-h-16 py-3 px-10 flex md:flex-row flex-col justify-center
                        items-center relative bg-gray-100 text-gray-400`}>
            <Text className='mr-5 text-center'>Privacy Policy</Text>
            <Text className='mr-5 text-center'>Terms of Use</Text>
            <Text className='mr-5 text-center'>E-mail: wonderexplorer1@gmail.com</Text>
        </div>
    )
}