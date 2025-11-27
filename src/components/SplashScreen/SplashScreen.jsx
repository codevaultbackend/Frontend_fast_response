
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SplashScreen = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <>
          <div className="w-full bg-red-900 h-[100vh] absolute z-[999999999999] flex justify-center items-center">
            <h2 className="text-white text-center">vivek</h2>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
