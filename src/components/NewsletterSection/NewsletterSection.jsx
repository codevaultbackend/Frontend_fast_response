import React, { useState } from "react";
import assets from "../../../public/assets/asstes";
import axios from "axios";

function NewsletterSection() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const updateNewsletter = async () => {
    setError("");
    setSuccess("");

    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${apiUrl}/api/subcribe`, { email });

      if (res.data.success) {
        setSuccess("Subscribed successfully!");
        setEmail("");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to subscribe. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="NewsletterSection  max-[768px]:min-h-fit relative bg-[#fff] min-[900px]:mt-[480px]">
      <div className="NewsletterSection-wrapper bg-[#5463FF] h-[47vh] absolute bottom-0 w-full max-[768px]:h-auto">
        <div className="NewsletterSection-left pl-[100px] pt-[40px] max-[768px]:pl-0 max-[768px]:text-center">
          <h2 className="playfarel text-[60px] max-[900px]:text-[32px] text-[#FFFFFF] leading-[55px]">
            Unlock Exclusive Fast <br /> Responses Insights!
          </h2>

          <div className="input-box mt-[20px] flex pl-[10px] relative w-fit max-[768px]:mx-auto my-4.5">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[55px] rounded-[40px] bg-[#FFFFFF] w-[270px] pl-[20px] placeholder:text-[14px] outline-0 placeholder:font-semibold"
            />

            {/* Submit Icon */}
            <img
              src={assets.telegramicon}
              className="object-cover w-[35px] h-[35px] absolute right-[10px] top-[20%] cursor-pointer"
              onClick={updateNewsletter}
              alt="telegramicon"
            />
          </div>

          {/* Status Message */}
          {loading && <p className="text-white">Loading...</p>}
          {error && <p className="text-red-300">{error}</p>}
          {success && <p className="text-green-300">{success}</p>}
        </div>

        <div className="right relative top-[-80%] h-auto">
          <img
            src={assets.subscribemask2}
            className="absolute right-[9.4%] top-[-200px] w-[380px] rounded-[50%]"
            alt="subscribemask"
          />
          <img
            src={assets.subscribemask}
            className="absolute right-[7.4%] top-[-230px] w-[450px] rounded-[50%]"
            alt="subscribemask"
          />
          <img
            src={assets.subscribenewsletter}
            alt="newsletterimage"
            className="w-[300px] absolute right-[12%] top-[-163px] rounded-[50%] max-[900px]:hidden"
          />
        </div>
      </div>
    </div>
  );
}

export default NewsletterSection;
