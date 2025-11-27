import React from 'react'
import asstes from '../../../public/assets/asstes'

function ReadyToService() {
  return (
    <div className='ReadyToService min-h-[100vh] relative'>

        <div className="ReadyToService-wrapper relative z-0">
          <img src={asstes.leftcards3} className='w-full' alt="service-banner" />
        </div>
        <div className="overlay absolute w-full h-full bg-[#000] opacity-[80%] z-20 top-0"></div>
        <div className="overlay absolute top-[35%] z-30 text-center w-fit left-[30%] max-[1000px]:left-[10%] max-w-[600px] px-[20px]">
            <h2 className='text-[60px] max-[1000px]:text-[35px] text-[#FFFFFF]'>Ready to have a decorated lifestyle?</h2>
            <button className='bg-[#68D585] rounded-[12px] text-[#fff] text-[13px] h-[45px] w-[110px] mt-[20px] cursor-pointer'>Start Booking</button>
        </div>
      
    </div>
  )
}

export default ReadyToService
