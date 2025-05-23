import React from 'react'

const InputFeild = ({ type, placeholder, name, handlechange, details }) => {
  return (
    <input
    className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
    type={type}
    placeholder={placeholder}
    onChange={handlechange}
    name={name}
    value={details[name]}
    required
/>
  )
}

export default InputFeild

