import React from 'react'
// import './Header.css'

const HeaderComponent = () => {
  return (
    <div className='header-container h-[70px] bg-[#f44336] fixed top-0 left-0 shadow-md border-0 w-full flex justify-between px-[15px] m-auto z-20'>
      <div className='left-header'>
        <a href="#" className='header-branch text-white no-underline text-[18px] p-[15px] flex items-center leading-[40px]'>
          <img src="https://stg-timesheet.nccsoft.vn/assets/images/Timesheet.png" alt="logo"  className='header-logo w-8 h-8' />
          Timesheet
        </a>
      </div>
      <div className='right-header flex items-center'>
        <div className='switch-language flex items-center cursor-pointer'>
          <a 
            href="https://docs.google.com/document/d/13kP2JNm9BhWx0-BW7Hb0RJmukF4r6G9JjZb6tIpcEUU/edit" 
            className='link-release-note'
            target='_blank'
            title='Release Note'
          >
            <i className='fas fa-file-arrow-up text-white text-xl mr-3'></i>
          </a>
          <a 
            href="https://docs.google.com/document/d/1-h4z6oW1ouqXPP05SkVJss3JzkyEA-8Y/edit" 
            className='link-user-guide'
            target='_blank'
            title='User guide'
          >
            <i className='fas fa-file-alt text-white text-xl mr-3'></i>
          </a>
          <li className='dropdown'>
            <a className='dropdown-toggle text-white flex items-center' data-toggle="dropdown" role='button'>
              <i className='famfamfam-flags gb' title='English'></i>
              English
              <b className='caret ml-2'></b>
            </a>
          </li>
        </div>
        <li className='pull-right'>
          <a className='js-right-sidebar text-white pt-1.5 px-1.5 pb-0 mt-4 mr-1 mb-0 ml-0 cursor-pointer' data-close="false">
            <i className='material-icons'>more_vert</i>
          </a>
        </li>
      </div>
    </div>
  )
}

export default HeaderComponent
