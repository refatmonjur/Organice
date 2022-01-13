import React, { Fragment } from 'react';
import Features from '../Features/features';
import imageJustin from './Justin.png'
import imageTanvir from './Tanvir.png'
import imageMd from './Md.png'
import imageRefat from './Refat.png'
import './meet.css';
import { color } from '@mui/system';


function Meet() {
  return (
    <div className='organice__mtt_container section_margin'>
      <div className='organice__mtt-heading'>
        <h1 className='gradient__text'>The Organice Team</h1>
      </div>
      <div className='oraganice__team'>
        {/* JUSTIN */}
        <div className='member'>
          <img
            className='reize'
            src={imageJustin}
            style={{
              width: 275,
              height: 275,
              borderRadius: 30,
              border: '3px ridge '
            }} />
          <div className='member-content'>
            <Features title="Justin Siu" text="Frontend Developer" />
          </div>
        </div>

        {/* REFAT */}
        <div className='member'>
          <div className='pic'>
            <img src={imageRefat}
              style={{
                width: 275,
                height: 275,
                borderRadius: 30,
                border: '3px ridge '
              }}
            />
          </div>
          <div className='member-content'>
            <Features title="Refat Monjur" text="Frontend Developer" />
          </div>
        </div>


        {/* MD */}
        <div className='member'>
          <div className='pic'>
            <img src={imageMd}
              style={{
                width: 275,
                height: 275,
                borderRadius: 30,
                border: '3px ridge '
              }}
            />
          </div>
          <div className='member-content'>
            <Features title="Md Islam" text="Backend Developer" />
          </div>
        </div>

        {/* TANVIR */}
        <div className='member'>
          <img
            src={imageTanvir}
            style={{
              width: 275,
              height: 275,
              borderRadius: 30,
              border: '3px ridge '
            }}
          />
          <div className='member-content'>
            <Features title="Tanvir Youhana" text="Backend Developer" />
          </div>
        </div>




      </div>

    </div>
  )
}
export default Meet;