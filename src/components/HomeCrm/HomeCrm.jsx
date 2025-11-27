import axios from "axios";
import React, { useEffect, useState } from "react";
import asstes from "../../../public/assets/asstes";
import { Link } from "react-router-dom";

function HomeCrm() {
  const [showCallOptions, setShowCallOptions] = useState(false);

  const callNumber = (number) => {
    window.location.href = `tel:${number}`;
    setShowCallOptions(false);
  };

  const [toggleShow, setToggleShow] = useState(false);
  const [issueType, setIssueType] = useState("");
  const [formData, setFormData] = useState({
    specializationRequired: "",
    reason: "",
    remarks: "",
  });
  function openWhatsApp(phone, message) {
    const encodedMsg = encodeURIComponent(message);
    window.location.href = `https://wa.me/${phone}?text=${encodedMsg}`;
    setToggleShow(false);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="RaiseIssue relative">
      <div
        className="raise-btn h-[70px] w-[70px] fixed right-[3%] bottom-[10%] rounded-[50%]  p-[5px] text-[#fff] z-[9999999] shadow-[1px_2px_20px_-1px_#9EB9F7]"
       
      >
        {!toggleShow ? (
          <>
            <img
              src={asstes.homeCrm}
              alt="contact"
              className="h-[60px] w-full object-cover rounded-[50%] border-4 border-[#FFBBED] p-[6px]"
              onClick={() => setToggleShow((prev) => !prev)}
            />
          </>
        ) : (
          <>
            <p
              onClick={() => setToggleShow(false)}
              className="text-black text-center pt-[17px] font-semibold"
            >
              x
            </p>
          </>
        )}
      </div>

      {toggleShow && (
        <ul className="fixed bottom-[20%] right-[3%]  cursor-pointer overflow-hidden w-auto p-[10px] z-[999999999999]">
          <Link to="/TrackBooking">
            <li className="pt-[10px] px-[10px] pb-[5px] z-[999999999999] bg-white p-[10px] flex items-center gap-2.5 rounded-[50px] shadow-[1px_0px_5px_-1px_#222] mt-[10px] w-fit">
              <div className="left">
                <img
                  src={asstes.locationicon}
                  className="h-[20px] object-cover"
                  alt="fastresponce"
                />
              </div>
              <div className="right">
                <h3 className="text-[#000000] text-[12px] font-semibold">
                  Technician Tracking
                </h3>
                <p className="text-[#464646] text-[10px] font-semibold">
                  Track your service
                </p>
              </div>
            </li>
          </Link>

          <li
            className="pt-[10px] pb-[5px] z-[99999999] bg-white p-[10px] flex items-center gap-2.5 rounded-[50px] shadow-[1px_0px_5px_-1px_#222] mt-[10px] w-fit pr-[30px]"
            onClick={() =>
              openWhatsApp(
                "8287356303",
                "hii i need help to book your services"
              )
            }
          >
            <div className="left">
              <img
                src={asstes.WhatsApp}
                className="h-[20px] object-cover"
                alt="fastresponse"
              />
            </div>
            <div className="right">
              <h3 className="text-[#000000] text-[12px] font-semibold">
                Instant Chat
              </h3>
              <p className="text-[#464646] text-[10px] font-semibold">
                Team supports
              </p>
            </div>
          </li>

          <li
            className="pt-[10px] px-[10px] pb-[5px] z-[99999999] bg-white p-[10px] flex items-center gap-2.5 rounded-[50px] shadow-[1px_0px_5px_-1px_#222] mt-[10px] w-fit"
            onClick={() => setShowCallOptions(true)}
          >
            <div className="left">
              <img
                src={asstes.call}
                className="h-[20px] object-cover"
                alt="fastresponse"
              />
            </div>
            <div className="right">
              <h3 className="text-[#000000] text-[12px] font-semibold">
                Calling on
              </h3>
              <p className="text-[#464646] text-[10px] font-semibold">
                Fast Response
              </p>
            </div>
          </li>

          {showCallOptions && (
            <div className="fixed bottom-[28%] right-[3%] bg-[#fff]   p-4 rounded-xl shadow-xl z-[999999999] w-[180px]">
              <p className="text-[12px] font-semibold mb-2 text-center text-[var(--primary-color)] text-[15px] underline pb-[5px]">
                Choose Number
              </p>

              <button
                className="w-full bg-[#fff] text-[var(--primary-color)] py-2 rounded mb-2 text-[12px] font-extrabold shadow-[1px_1px_9px_0px_#222] rounded-[10px]"
                onClick={() => callNumber("898989984")}
              >
                Number1
              </button>

              <button
                className="w-full bg-[#fff] text-[var(--primary-color)] py-2 rounded mb-2 text-[12px] font-extrabold shadow-[1px_1px_9px_0px_#222] rounded-[10px]"
                onClick={() => callNumber("898989985")}
              >
                Number2
              </button>

              <button
                className=" shadow-[1px_1px_9px_0px_#222] text-[#d24c4c] py-1 mt-2 rounded text-[11px] w-[40px] font-extrabold"
                onClick={() => setShowCallOptions(false)}
              >
                X
              </button>
            </div>
          )}
        </ul>
      )}
    </div>
  );
}

export default HomeCrm;
