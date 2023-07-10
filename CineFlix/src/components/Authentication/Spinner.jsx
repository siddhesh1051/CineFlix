import React from 'react'
import SpinnerSvg from './Spinner.svg'
const Spinner = () => {
  return (
    <div>
        <img src={SpinnerSvg} className='inline h-[28px] w-[28px]' alt="" />
        <p className='inline ml-3'>Please Wait !</p>
      
    </div>
  )
}

export default Spinner
