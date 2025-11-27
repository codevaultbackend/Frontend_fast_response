import React from 'react'
import asstes from '../../../public/assets/asstes'

function Omgservice() {
  return (
    <div className='Omgservice min-h-[100vh] bg-[#161C2D] flex items-center'>

        <div className="Omgservice max-w-[1280px] mx-auto flex gap-[35px]max-[1000px]-flex-col pb-[20px] ">
            <div className="Omgservice-left max-w-[500px] flex items-center flex-col  text-left items-start">
                "
                <img src={asstes.rattingstar} alt="rattingstar " className=' w-fit ml-0 mb-[50px] mt-[120px]' />
                <p className='text-[18px] font-[300] text-[#FFFFFF]'>“OMG! I cannot believe that I have got a brand new room after getting your services. It was super easy to order and get started.”</p>
            </div>
            <div className="right-content">
                <img src={asstes.leftcards2} alt="omg-cards" />
            </div>
        </div>
      
    </div>
  )
}

export default Omgservice
