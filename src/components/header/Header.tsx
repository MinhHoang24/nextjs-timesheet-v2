import React from 'react'
import './Header.css'

const HeaderComponent = () => {
  return (
    <div className='header-container'>
      <div className='left-header'>
        <a href="#" className='header-branch'>
          <img src="https://stg-timesheet.nccsoft.vn/assets/images/Timesheet.png" alt="logo"  className='header-logo' />
          Timesheet
        </a>
      </div>
      <div className='right-header'>
        <div className='switch-language'>
          <a 
            href="https://docs.google.com/document/d/13kP2JNm9BhWx0-BW7Hb0RJmukF4r6G9JjZb6tIpcEUU/edit" 
            className='link-release-note'
            target='_blank'
            title='Release Note'
          >
            <i className='fas fa-file-arrow-up'></i>
          </a>
          <a 
            href="https://docs.google.com/document/d/1-h4z6oW1ouqXPP05SkVJss3JzkyEA-8Y/edit" 
            className='link-user-guide'
            target='_blank'
            title='User guide'
          >
            <i className='fas fa-file-alt'></i>
          </a>
          <li className='dropdown'>
            <a className='dropdown-toggle' data-toggle="dropdown" role='button'>
              <i className='famfamfam-flags gb' title='English'></i>
              English
              <b className='caret'></b>
            </a>
          </li>
        </div>
        <li className='pull-right'>
          <a className='js-right-sidebar' data-close="false">
            <i className='material-icons'>more_vert</i>
          </a>
        </li>
      </div>
    </div>
  )
}

export default HeaderComponent
