import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import Herosection from "../../components/Herosection/Herosection";
import SerchBar from "../../components/SerchBar/SerchBar";
import ChooseCategory from "../../components/ChooseCategory/ChooseCategory";
import TopCategories from "../../components/TopCategories/TopCategories";
import MostBooked from "../../components/MostBooked/MostBooked";
import Offer from "../../components/Offer/Offer";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import Footer from "../../components/Footer/Footer";
import NewsletterSection from "../../components/NewsletterSection/NewsletterSection";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <div className="herosection mb-[50px]">
       <Herosection />
      </div>
      
      <div className="most-booked bg-[#EAF1FB] py-[20px]">
        <ChooseCategory />
      </div>
      
      <div className="most-booked bg-[#FFDCDE] py-[20px]">
        <TopCategories />
      </div>
      
      <div className="most-booked bg-[#EAF1FB] py-[20px]">
        <MostBooked />
      </div>
      <div className="offer-section bg-[#FFDCDE] py-[20px]">
        <Offer />
      </div>
      <div className="offer-section bg-[#fff] py-[20px]">
        <HowItWorks />
      </div>
      <div className="offer-section bg-[#FFFFFF] py-[20px]">
        <WhyChooseUs />
      </div>
      <div className="newsletter bg-[#FFFFFF]">
         <NewsletterSection />
      </div>
      
    </div>
  );
}

export default Home;
