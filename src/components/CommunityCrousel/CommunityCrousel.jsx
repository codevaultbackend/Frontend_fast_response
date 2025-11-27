import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import asstes from "../../../public/assets/asstes";

function CommunityCrousel() {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const testimonial = [
    {
      icon: asstes.ACrepair,
      title: "Sarah Mitchell",
      bio: "Found amazing guidance and clarity through the platform. The kundli reports are incredibly accurate!",
      job: "Spiritual Seeker",
    },
    {
      icon: asstes.ACrepair,
      title: "Raj Mitchell",
      bio: "This platform has transformed my practice. I can now reach seekers worldwide and manage everything efficiently. ",
      job: "Professional Astrologer",
    },
    {
      icon: asstes.ACrepair,
      title: "Sarah Mitchell",
      bio: "Found amazing guidance and clarity through the platform. The kundli reports are incredibly accurate!",
      job: "Spiritual Seeker",
    },
  ];
  return (
    <div className="CommunityCrousel ">
      <div className="CommunityCrousel-wrapper max-w-[1280px] m-auto">
        <h2 className="text-[#000000] text-center text-[31px] font-bold pt-[30px]">What Our Community Says</h2>
        <div className="slide-con mt-[70px]">
          <Slider {...settings}>
            {testimonial.map((profiles, index) => {
              return (
                <>
                  <div key={index} className=" flex bg-white p-[20px] rounded-[8px] gap-[25px] mx-[20px]">
                    <div className="profile-con rounded-[50px] bg-white h-fit p-[10px]">
                        <img src={profiles.icon} alt="profile" />
                    </div>
                    <div className="profile-content">
                        <p className="descri text-[12px] font-[500] text-[#000000]">{profiles.bio}</p>
                        <h3 className="text-[#000000] font-bold text-[12px] mt-[20px]">{profiles.title}</h3>
                        <h4 className="text-[#000000] font-[200] text-[12px]">{profiles.job}</h4>
                    </div>
                  </div>
                </>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default CommunityCrousel;
