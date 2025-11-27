import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MyContext from "../../context/MyContext";
import { useBooking } from "../../context/BookingContext";

function MostBooked() {
  const token = localStorage.getItem("authToken");
  const { serviceCardData } = useContext(MyContext);

  const { openBooking } = useBooking();

  const carouselRef = useRef(null);
  const leftBtnRef = useRef(null);
  const rightBtnRef = useRef(null);

  const [cardWidth, setCardWidth] = useState(0);

 
  const mostBooked = serviceCardData.filter(
    (item) => item.cateogory === "MostBooked"
  );


  const data = [...mostBooked, ...mostBooked, ...mostBooked];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || mostBooked.length === 0) return;

    const leftBtn = leftBtnRef.current;
    const rightBtn = rightBtnRef.current;

    const updateCardWidth = () => {
      const card = carousel.querySelector(".carousel-card");
      if (card) {
        setCardWidth(card.offsetWidth + 20); 
      }
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);

    const setWidth = () => carousel.scrollWidth / 3;

    // Start at middle set
    carousel.scrollLeft = setWidth();

    let isJumping = false;

    const handleScroll = () => {
      if (isJumping || !cardWidth) return;

      const fullWidth = carousel.scrollWidth;
      const middleStart = setWidth();

      const leftBoundary = middleStart - cardWidth * mostBooked.length;
      const rightBoundary = middleStart + cardWidth * mostBooked.length;

      // Jump left
      if (carousel.scrollLeft <= leftBoundary) {
        isJumping = true;
        const diff = leftBoundary - carousel.scrollLeft;
        carousel.style.scrollBehavior = "auto";
        carousel.scrollLeft = rightBoundary - diff;

        requestAnimationFrame(() => {
          carousel.style.scrollBehavior = "smooth";
          isJumping = false;
        });
      }

      // Jump right
      if (carousel.scrollLeft >= rightBoundary) {
        isJumping = true;
        const diff = carousel.scrollLeft - rightBoundary;
        carousel.style.scrollBehavior = "auto";
        carousel.scrollLeft = leftBoundary + diff;

        requestAnimationFrame(() => {
          carousel.style.scrollBehavior = "smooth";
          isJumping = false;
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
    leftBtn.addEventListener("click", scrollPrev);
    rightBtn.addEventListener("click", scrollNext);

    return () => {
      carousel.removeEventListener("scroll", handleScroll);
      leftBtn.removeEventListener("click", scrollPrev);
      rightBtn.removeEventListener("click", scrollNext);
      window.removeEventListener("resize", updateCardWidth);
    };
  }, [cardWidth, mostBooked]);

  return (
    <div className="MostBooked max-w-[1280px] m-auto my-10 px-3">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-3 mt-[40px]">
        <div>
          <h3 className="text-[26px] text-[#333333] font-semibold">
            Most Booked Services
          </h3>
          <p className="text-[#959595] text-[14px] font-semibold">
            Trusted by thousands of happy clients every day.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center">
          <button
            ref={leftBtnRef}
            className="bg-white text-[19px] text-[#4a5565] rounded-full mx-[5px] w-[35px] h-[35px] flex items-center justify-center hover:bg-gray-200 transition"
          >
            ‹
          </button>
          <button
            ref={rightBtnRef}
            className="bg-white text-[19px] text-[#4a5565] rounded-full mx-[5px] w-[35px] h-[35px] flex items-center justify-center hover:bg-gray-200 transition"
          >
            ›
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative mt-[25px] overflow-hidden">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto no-scrollbar gap-[20px] scroll-smooth"
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="carousel-card group flex-shrink-0 w-[100%] sm:w-[50%] lg:w-[32%] bg-[#F8F8F8] shadow-md p-[20px] rounded-[20px]"
            >
              <div className="bg-white rounded-[18px] relative overflow-hidden">
                <img
                  src={item.cardIcon}
                  alt={item.cardTitle}
                  className="h-[160px] w-auto mx-auto object-cover rounded-[10px]"
                />

                <h2 className="text-[#333333] font-semibold text-center text-[16px] mt-[10px] ">
                  {item.title}
                </h2>

                <p className="absolute top-0 left-[13%] px-[10px] hidden bg-white rounded-bl-[8px] rounded-br-[8px] text-[12px] text-[#5C3A2E] font-semibold shadow group-hover:block">
                  ☆ 5.0
                </p>

                <p className="absolute top-0 right-[13%] px-[10px] hidden bg-white rounded-bl-[8px] rounded-br-[8px] text-[12px] text-[#5C3A2E] font-semibold shadow group-hover:block">
                  👁 234k
                </p>
              </div>

              <div className="flex justify-between items-center mt-[20px]">
                <p className="text-[18px] font-semibold text-[#5C3A2E]  flex items-center group-hover:text-[var(--primary-color)]">
                  <span className="inline-block h-[25px] w-[26px] bg-[#D1D4F8] rounded-[5px] mr-[5px] text-center">
                    ₹
                  </span>
                  {item.price}
                </p>

                {token ? (
                  <button
                    className="text-white rounded-[8px] px-[12px] py-[6px] bg-[#5C3A2E] group-hover:bg-[var(--primary-color)] transition"
                    onClick={() => openBooking(item)} 
                  >
                    Book Now
                  </button>
                ) : (
                  <Link to="/login">
                    <button className="bg-[var(--primary-color)] text-white rounded-[8px] px-[12px] py-[6px] hover:bg-indigo-600 transition">
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MostBooked;
