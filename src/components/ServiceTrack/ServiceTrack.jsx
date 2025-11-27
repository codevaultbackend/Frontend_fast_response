import React from 'react'
import asstes from '../../../public/assets/asstes'

function ServiceTrack() {
  return (
    <div className='ServiceTrack'>

        <div className="ServiceTrack-wrapper flex  min-h-[100vh] bg-[var(--primary-color)] items-center">
            <div className="service-banner-wrapper flex max-w-[1000px] mx-auto gap-[30px] h-fit max-[1000px]:py-[10px] max-[1000px]:flex-col ">
            <div className="left-content relative"> 
                <img src={asstes.leftcard} alt="product image w-[100px]" />
                <img src={asstes.leftcardicon} alt="product image " className=' top-[30%] left-[70%] max-[1000px]:left-[-26px] absolute' />
            </div>
            <div className="content-con w-[300px] ml-[150px] mt-[100px] max-[1000px]:ml-[10px] max-[1000px]:mt-[10px]">
                <h2 className='text-[#FFFFFF] text-[34px]'>Track your progress with our advanced site.</h2>
                <p className='text-[14px] text-[#FFFFFF]'>We share common trends and strategies for improving your rental income and making sure you stay in high demand.</p>
                <button className='text-[#FFFFFF] font-bold mt-[20px]
                 text-[13px]'>Start Booking <i class="fa-solid fa-arrow-right"></i></button>
            </div>
            </div>
        </div>
      
    </div>
  )
}

export default ServiceTrack
