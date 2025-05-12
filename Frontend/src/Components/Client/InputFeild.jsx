import React from 'react'

const InputFeild = ({ type, placeholder, name, handlechange, address }) => {
  return (
    <input
    className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
    type={type}
    placeholder={placeholder}
    onChange={handlechange}
    name={name}
    value={address[name]}
    required
/>
  )
}

export default InputFeild

