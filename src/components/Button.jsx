import React from 'react'

const Button = ({
    type = 'button',
    className = '',
    disabled = false,
    children,
    active = true,
    onClick = () => { }
}) => {
    return (
        <button
        onClick={onClick}
            disabled={disabled}
            className={`w-full ${active ? " bg-blue-700 hover:bg-blue-800 focus:bg-blue-800" : " bg-red-700 hover:bg-red-800 focus:bg-red-800"} transiiton-all duration-300 py-1 px-3 rounded-lg text-sm ${className}`}
            type={type}>{children}</button>

    )
}
                
export default Button