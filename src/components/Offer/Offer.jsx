import React, { useEffect, useRef, useState } from "react";
import asstes from "../../../public/assets/asstes";
import { Link } from "react-router-dom";

function Offer() {
  const token = localStorage.getItem("authToken");
  const offerData = [
    {
      img: asstes.offerimage1,
      title: "Home Maintenance Package",
      categories: ["Plumbing", "Electrical", "Painting"],
      price: "$262",
      subOffer: "$350",
    },
    {
      img: asstes.offerimage2,
      title: "AC Complete Care",
      categories: ["ACService", "Gas Refill", "Deep Cleaning"],
      price: "$262",
      subOffer: "$350",
    },
    {
      img: asstes.offerimage3,
      title: "Kitchen Renovation",
      categories: ["Plumbing", "Electrical", "Modular Kitchen"],
      price: "$262",
      subOffer: "$350",
    },
    {
      img: asstes.offerimage3,
      title: "Home Maintenance Package",
      categories: ["Plumbing", "Electrical", "Painting"],
      price: "$262",
      subOffer: "$350",
    },
    {
      img: asstes.offerimage1,
      title: "AC Complete Care",
      categories: ["ACService", "Gas Refill", "Deep Cleaning"],
      price: "$262",
      subOffer: "$350",
    },
    {
      img: asstes.offerimage2,
      title: "Kitchen Renovation",
      categories: ["Plumbing", "Electrical", "Modular Kitchen"],
      price: "$262",
      subOffer: "$350",
    },
  ];

  const carouselRef = useRef(null);
  const leftBtnRef = useRef(null);
  const rightBtnRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  // REPLICATE DATA FOR INFINITE LOOP
  const data = [...offerData, ...offerData, ...offerData];

  useEffect(() => {
    const carousel = carouselRef.current;
    const leftBtn = leftBtnRef.current;
    const rightBtn = rightBtnRef.current;

    const updateCardWidth = () => {
      const card = carousel.querySelector(".offer-card");
      if (card) {
        const gap = 16;
        setCardWidth(card.offsetWidth + gap);
      }
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);

    const oneSetWidth = () => carousel.scrollWidth / 3;
    carousel.scrollLeft = oneSetWidth();

    let isTeleporting = false;

    const handleScroll = () => {
      if (isTeleporting || cardWidth === 0) return;

      const middleStart = oneSetWidth();
      const leftEdge = middleStart - cardWidth * offerData.length;
      const rightEdge = middleStart + cardWidth * offerData.length;

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
    <div className="Offer max-w-[1280px] m-auto my-10" id="Offer">
      <div className="offer-wrapper-header text-center mb-8">
        <span className="font-semibold text-[11px] text-[#891C1C] bg-[#FB8F8F] rounded-[4px] px-3 py-1 my-[10px] inline-block">
          % LIMITED TIME OFFERS
        </span>
        <h3 className="text-[28px] text-black font-semibold">
          Exclusive Combo Offers
        </h3>
        <p className="text-[12px] font-semibold text-[#464646] leading-[30px]">
          Save big with our exclusive combo packages designed for your
          convenience
        </p>
      </div>

      <div className="flex justify-end mb-4">
        <button
          ref={leftBtnRef}
          className="bg-white rounded-full mx-1 w-[35px] h-[35px] text-[#4a5565] text-lg font-bold flex items-center justify-center hover:bg-gray-500 hover:text-[#fff] transition"
        >
          ‹
        </button>
        <button
          ref={rightBtnRef}
          className="bg-white rounded-full mx-1 w-[35px] h-[35px] text-[#4a5565] text-lg font-bold flex items-center justify-center hover:bg-gray-500 hover:text-[#fff] transition"
        >
          ›
        </button>
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={carouselRef}
          className="
            flex 
            overflow-x-auto 
            no-scrollbar 
            gap-4 
            scroll-smooth 
            snap-x 
            snap-mandatory
          "
        >
          {data.map((offer, index) => (
            <div
              key={index}
              className="
                offer-card 
                flex-shrink-0 
                bg-white 
                border-0 
                rounded-[20px] 
                shadow-md 
                p-4 
                relative
                snap-center
                w-[90%]
                sm:w-[300px] 
                md:w-[350px] 
                lg:w-[380px] 
                xl:w-[400px]
              "
            >
              <img
                src={offer.img}
                alt={offer.title}
                className="h-[130px] w-[130px] object-cover rounded-md mb-4"
              />

              <h3 className="font-semibold text-lg mb-2 text-left">
                {offer.title}
              </h3>

              <div className="flex flex-wrap justify-start gap-2 mb-3">
                {offer.categories.map((cat, i) => (
                  <span
                    key={i}
                    className="text-sm bg-[#5463FF33] px-2 py-1 rounded text-[#5463FF] rounded-[22px] text-[9px]"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <div className="price flex justify-start items-left gap-2 mb-2 !my-[27px]">
                <p className="text-lg font-bold text-[#000000]">
                  {offer.price}
                </p>
                <span className="line-through text-[#000000]">
                  {offer.subOffer}
                </span>
              </div>

              {offer ? (
                <>
                  <button className="bg-gradient-to-br from-[#5463FF] to-[#793299] text-white py-2 px-4 rounded transition ml-0">
                    Claim Offer
                  </button>
                </>
              ) : (
                <>
                  <Link to="/Login">
                    <button className="bg-gradient-to-br from-[#5463FF] to-[#793299] text-white py-2 px-4 rounded transition ml-0">
                      Login
                    </button>
                  </Link>
                </>
              )}

              <span className="block text-white bg-[#FE6868] text-sm font-semibold text-[9px] mt-2 absolute top-[10px] p-[5px] rounded-[17px] right-[60px] px-[20px]">
                25% off
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Offer;
