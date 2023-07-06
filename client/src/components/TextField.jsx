/* eslint-disable no-unused-vars */
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const TextField = forwardRef(function MyInput({
  className = '',
  error,
  label,
  name,
  children,
}, ref) {
  return (
    <>
      <label
        htmlFor={name}
        className={twMerge('text-base text-gray-900', className)}
      >
        {label}
      </label>
      {children}
      <p className='text-red-600 text-sm ml-2'>{error}</p>
    </>
  )
})

export default TextField
