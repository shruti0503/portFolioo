import React from 'react'

const Header = () => {
  return (
    <div className='w-full min-h-[92px] justify-center flex-nowrap bg-dark-100 flex w-full items-center  gap-2 px-4'>

        <ul className='flex w-full gap-5  justify-center' >
            <li className='cursor-pointer'>Projects</li>
            <li className='cursor-pointer'>Work Experience</li>
        </ul>

      
    </div>
  )
}

export default Header
