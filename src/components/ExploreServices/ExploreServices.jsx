import React, { useContext, useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MyContext from "../../context/MyContext";
import { useBooking } from "../../context/BookingContext";

function ExploreServices() {
  const { searchQuery, serviceCardData } = useContext(MyContext);
  const { openBooking } = useBooking();

  const token = localStorage.getItem("authToken");

  const sectionRef = useRef(null);
  const [showAll, setShowAll] = useState(false);

  const filteredServices = useMemo(() => {
    if (!searchQuery) return serviceCardData;
    return serviceCardData.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [serviceCardData, searchQuery]);

  const visibleCards = showAll
    ? filteredServices
    : filteredServices.slice(0, 6);

  useEffect(() => {
    const handleScrollToSection = () => {
      if (window.location.hash === "#ExploreServices" && sectionRef.current) {
        setTimeout(() => {
          sectionRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 400);
      }
    };
    handleScrollToSection();
    window.addEventListener("hashchange", handleScrollToSection);
    return () =>
      window.removeEventListener("hashchange", handleScrollToSection);
  }, []);

  return (
    <div
      className="explore-all-services min-h-[100vh] pb-10 pt-0 px-4"
      id="ExploreServices"
      ref={sectionRef}
    >
      <h2 className="text-center text-[#161C2D] text-[28px] sm:text-[32px] font-bold">
        Explore All Services
      </h2>

      <div className="flex flex-wrap justify-center gap-[20px] sm:gap-[30px] p-[15px] my-[30px]">
        {visibleCards.length > 0 ? (
          visibleCards.map((serviceCard, index) => (
            <div
              key={index}
              className="w-[90%] sm:w-[280px] md:w-[300px] px-[10px] cursor-pointer hover:scale-[1.03] transition-transform duration-300 relative mt-[40px] group"
            >
              <div className="bg-[#F4F7FA] p-[10px] rounded-xl shadow-sm hover:shadow-md relative h-[250px] pt-[40px]">
                <img
                  src={serviceCard.cardIcon}
                  className="mx-auto w-[100px] sm:w-[130px]"
                  alt={serviceCard.title}
                />

                {token ? (
                  <button
                    onClick={() => openBooking(serviceCard)}
                    className="absolute bottom-[7%] left-[34%] h-[40px] text-center text-white font-bold bg-[#473BF0] p-[6px] rounded-[6px] text-[12px] px-[20px] hidden group-hover:block"
                  >
                    Book Now
                  </button>
                ) : (
                  <Link to="/login">
                    <button className="absolute bottom-[7%] left-[34%] h-[40px] text-center text-white font-bold bg-[#473BF0] p-[6px] group-hover:block rounded-[6px] text-[12px] px-[20px]">
                      Book Now
                    </button>
                  </Link>
                )}
              </div>

              <div className="text-center mt-3">
                <h4 className="text-[#2E7D32] text-lg font-semibold">
                  ${serviceCard.price}
                </h4>
                <h1 className="text-[#161C2D] text-xl font-bold mb-1">
                  {serviceCard.title}
                </h1>
                <img
                  src={serviceCard.ratting}
                  alt={serviceCard.title}
                  className="mx-auto"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-6">No services found.</p>
        )}
      </div>

      {filteredServices.length > 6 && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-white text-[var(--primary-color)] font-semibold px-6 py-2 rounded-lg shadow-md border-2 border-[var(--primary-color)] transition-all duration-300"
          >
            {showAll ? "Show Less" : "Check all Services"}
          </button>
        </div>
      )}
    </div>
  );
}

export default ExploreServices;
