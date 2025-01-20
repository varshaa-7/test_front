import React from 'react'

const HighLightText = ({ children }) => {
  return (
    <span className='mx-3  bg-gradient-to-b from-blue-400 px-4 h-max text-xl to-blue-800 rounded-full '>{children}</span>
  )
}

export default HighLightText