import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import asstes from "../../../public/assets/asstes";

const slides = [
  {
    image: asstes.onboardingscreen1,
    title: "Find Trusted Technicians",
    description:
      "Instant support, reliable service. We connect you with verified professionals — fast, easy, and on time.",
  },
  {
    image: asstes.onboardingscreen2,
    title: "Real Time Tracking ",
    description:
      "Track your technician in Real-time and stay updatedThroughout the service",
  },
  {
    image: asstes.onboardingscreen3,
    title: "Book In a minutes",
    description:
      "Instant support, reliable service. We connect you with verified professionals — fast, easy, and on time.",
  },
  {
    image: asstes.onboardingscreen4,
    title: "Save & Secure Payments",
    description:
      "All professional are verified Multiple & backround checked for your safety & payment optionswith secure checkout and instant confirmation.",
  },
];

function OnboardingPage() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");

    if (hasSeenOnboarding) {
      navigate("/");
    }
  }, [navigate]);

  const handleNext = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
     
      localStorage.setItem("hasSeenOnboarding", "true");
      navigate("/login");
    }
  };

  const handleSkip = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-blue-100   overflow-hidden ">
      <div className="min-h-[100vh] relative  text-center bg-[#69A2FF] m-auto max-w-[600px] w-full
       ">
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 text-[#fff] font-medium hover:text-gray-900"
        >
          Skip
        </button>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <img
              src={slides[index].image}
              alt={slides[index].title}
              className="w-78 h-78 object-contain mx-auto mb-[0px] mt-11"
            />
            <h2 className='text-[30px] font-bold text-[#fff] mb-4 playfair'>
              {slides[index].title}
            </h2>
            <p className='text-[#fff] text-base mb-8 px-4 playfair w-[80%]'>
              {slides[index].description}
            </p>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={handleNext}
          className="w-full bg-[#C0D8FF] text-[#1651b0] py-3  font-bold text-[14px] hover:bg-[#3B82F6] hover:text-[#C0D8FF] transition-all cursor-pointer outline-0"
        >
          {index === slides.length - 1 ? "Get Started" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default OnboardingPage;
