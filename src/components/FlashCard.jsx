import React from 'react'
import { Text } from './Shared'

export default ({ message }) => (
    <div 
        className={`absolute w-full sm:w-2/3 xl:w-1/4 md:w-1/2 p-3 
                    bg-gray-300 text-gray-800 top-0 z-20`}>
        <Text>{message}</Text>                
    </div>
)