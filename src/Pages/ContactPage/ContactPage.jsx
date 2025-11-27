import React from 'react'
import asstes from '../../../public/assets/asstes'
import Herosection from '../../components/Herosection/Herosection'

function ContactPage() {
  return (
    <div className='ContactPage'>

        <div className="contact-hero-section flex gap-[10px] max-w-[1180px] px-[20px] mx-auto justify-between items-center">

            <div className="left-contact-hero-section min-h-[100vh] flex  flex-col justify-center">
                <img src={asstes.contactLineBar}  alt="Fastresponce" className="lineoverlay absolute left-0 object-cover" />
                <h3 className='text-[17px] font-semibold text-[var(--primary-color)]'>Hello,</h3>
                <h2>We Help People To Bring Their Ideas Alive </h2>
                <p>A talented team to help you in your journey on creating usefull and easy to use product</p>
                <div className="left-contact-hero-section-cta">
                    <button>Let's Talk</button>
                    <button>Book our Services</button>
                </div>
            </div>

            <div className="right-contact-hero-section">
                <img src={asstes.EnquiryHero} alt="ContactFastResponse" className='max-w-[420px] object-cover' />
                <img src={asstes.contactSectionDots} alt="ContactFastResponse" className=' max-w-[320px] object-cover absolute bottom-0 right-0' />
            </div>

        </div>
      
    </div>
  )
}

export default ContactPage
