import React, { useContext, useEffect, useRef, useState } from "react";
import asstes from "../../../public/assets/asstes";
import { Link } from "react-router-dom";
import MyContext from "../../context/MyContext";
import { useBooking } from "../../context/BookingContext";

function TopCategories() {
  const token = localStorage.getItem("authToken");
  const {serviceCardData} = useContext(MyContext);
  const { openBooking } = useBooking();

  const carouselRef = useRef(null);
  const leftBtnRef = useRef(null);
  const rightBtnRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

 

  useEffect(() => {
    const carousel = carouselRef.current;
    const leftBtn = leftBtnRef.current;
    const rightBtn = rightBtnRef.current;

    const updateCardWidth = () => {
      const card = carousel.querySelector(".carousel-card");
      if (card) {
        const gap = 20;
        setCardWidth(card.offsetWidth + gap);
      }
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);

    const oneSetWidth = () => carousel.scrollWidth / 2.69;

    carousel.scrollLeft = oneSetWidth();

    let isTeleporting = false;

    const handleScroll = () => {
      if (isTeleporting || cardWidth === 0) return;

      const middleStart = oneSetWidth();
      const leftEdge = middleStart - cardWidth * topServicesData.length;
      const rightEdge = middleStart + cardWidth * topServicesData.length;

      if (carousel.scrollLeft <= leftEdge) {
        isTeleporting = true;
        const diff = leftEdge - carousel.scrollLeft;
        carousel.style.scrollBehavior = "auto";
        carousel.scrollLeft = rightEdge - diff;
        requestAnimationFrame(() => {
          carousel.style.scrollBehavior = "smooth";
          isTeleporting = false;
        });
      } else if (carousel.scrollLeft >= rightEdge) {
        isTeleporting = true;
        const diff = carousel.scrollLeft - rightEdge;
        carousel.style.scrollBehavior = "auto";
        carousel.scrollLeft = leftEdge + diff;
        requestAnimationFrame(() => {
          carousel.style.scrollBehavior = "smooth";
          isTeleporting = false;
        });
      }
    };

    const scrollNext = () => {
      carousel.scrollBy({ left: cardWidth, behavior: "smooth" });
    };

    const scrollPrev = () => {
      carousel.scrollBy({ left: -cardWidth, behavior: "smooth" });
    };

    carousel.addEventListener("scroll", handleScroll);
    rightBtn.addEventListener("click", scrollNext);
    leftBtn.addEventListener("click", scrollPrev);

    return () => {
      carousel.removeEventListener("scroll", handleScroll);
      rightBtn.removeEventListener("click", scrollNext);
      leftBtn.removeEventListener("click", scrollPrev);
      window.removeEventListener("resize", updateCardWidth);
    };
  }, [cardWidth]);

  return (
    <div className="TopCategories max-w-[1280px] m-auto my-10">

      <div className="topcategories-header flex justify-between mt-[40px] p-[5px]">
        <div className="text">
          <h3 className="text-[26px] text-[#333333] font-semibold">
            Most Booked Services This Week
          </h3>
          <p className="text-[#959595] text-[14px] font-semibold">
            Top Rated Services loved by Our Customers
          </p>
        </div>
        <div className="nav-btn flex items-center">
          <button
            ref={leftBtnRef}
            className="bg-[#FFFFFF] text-gray-600 rounded-full mx-[5px] w-[35px] h-[35px] text-lg font-bold flex items-center justify-center hover:bg-gray-200 transition"
          >
            ‹
          </button>
          <button
            ref={rightBtnRef}
            className="bg-[#FFFFFF] text-gray-600 rounded-full mx-[5px] w-[35px] h-[35px] text-lg font-bold flex items-center justify-center hover:bg-gray-200 transition"
          >
            ›
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative mt-[20px] overflow-hidden">
        <div
          ref={carouselRef}
          className="TopCategories-wrapper flex overflow-x-auto no-scrollbar gap-[20px] scroll-smooth px-[10px] p-[10px]"
        >
          {serviceCardData.map((item, index) => (
            <div
              key={index}
              className="carousel-card topcategoris-item flex min-w-[408px] max-[750px]:min-w-[308px] shadow-[0px_1px_7px_var(--primary-color)] p-[25px] rounded-[20px] bg-white justify-between"
            >
              <div className="image-con mr-[15px]">
                <img
                  src={item.cardIcon}
                  alt={item.title}
                  className="h-[150px] w-[150px] object-cover rounded-[10px] "
                />
              </div>
              <div className="content-con flex flex-col justify-between">
                <div>
                  <h2 className="text-[18px] text-[#5C3A2E] font-semibold inline-block max-w-[12ch] whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.title}
                  </h2>
                  <h4 className="text-[14px] text-[#666]">{item.serviceType}</h4>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-[16px] font-semibold text-[#5C3A2E]">
                    {item.price}
                  </p>
                  {token ? (
                    <>
                      <button className="bg-[#5C3A2E] text-white rounded-[8px] px-[12px] py-[6px] mt-[8px] hover:bg-[#7b5242] transition" onClick={() => openBooking(item)}>
                        Book Now
                      </button>
                    </>
                  ) : (
                    <>
                    <Link to='/login'>
                     <button className="bg-[#5C3A2E] text-white rounded-[8px] px-[12px] py-[6px] mt-[8px] hover:bg-[#7b5242] transition">
                    Login
                  </button>
                    </Link></>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopCategories;
