import axios from "axios";
import React, { useEffect, useState } from "react";

function RaiseIssue({workId}) {
  const [toggleShow, setToggleShow] = useState(false);
  const [issueType, setIssueType] = useState("");
  const [formData, setFormData] = useState({
    specializationRequired: "",
    reason: "",
    remarks: "",
  });

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("authToken");

  
  const handleToggleissue = (e) => {
    const value = e.target.innerText;

    if (value === "Need Specialist ?") setIssueType("need_specialist");
    if (value === "Need Parts ?") setIssueType("need_parts");
    if (value === "Costomer Not Availble ?") setIssueType("customer_unavailable");

    setToggleShow(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitIssue = async (e) => {
    e.preventDefault();

    const payload = {
      workId,
      issueType,
      remarks:
        issueType === "need_parts" || issueType === "customer_unavailable"
          ? formData.remarks
          : "",
      specializationRequired:
        issueType === "need_specialist"
          ? formData.specializationRequired
          : "",
      reason: issueType === "need_specialist" ? formData.reason : "",
    };

    try {
      const res = await axios.post(
        `${apiUrl}/technicaian/issueraise`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Issue raised successfully");
      console.log(res.data);

      setIssueType("");
      setFormData({
        specializationRequired: "",
        reason: "",
        remarks: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to raise issue");
    }
  };

  return (
    <div className="RaiseIssue relative">
      <div className="raise-btn h-[70px] w-[70px] fixed right-[5%] bottom-[15%] rounded-[50%] bg-[var(--primary-color)] p-[5px] text-[#fff] ">
        <h2 className="text-[10px] text-center mt-[10px]">Got Issue</h2>

        <button
          onClick={() => setToggleShow((prev) => !prev)}
          className="mt-[5px] underline text-[12px] text-center block mx-auto"
        >
          click Here
        </button>
      </div>

      {toggleShow && (
        <ul className="fixed bottom-[27%] right-[5%] bg-white text-[var(--primary-color)] font-[--font-family] text-[15px] shadow-[-2px_0px_7px_0px_var(--primary-color)] rounded-[8px] cursor-pointer overflow-hidden">

          <li
            className="border-b-2 border-[var(--primary-color)] hover:text-[#fff] hover:bg-[var(--primary-color)] pt-[10px] px-[10px] pb-[5px]"
            onClick={handleToggleissue}
          >
            Need Specialist ?
          </li>

          <li
            className="border-b-2 py-[5px] border-[var(--primary-color)] hover:text-[#fff] hover:bg-[var(--primary-color)] px-[10px] pt-[5px]"
            onClick={handleToggleissue}
          >
            Need Parts ?
          </li>

          <li
            className="border-b-2 border-[var(--primary-color)] hover:text-[#fff] hover:bg-[var(--primary-color)] pb-[10px] px-[10px] pt-[5px]"
            onClick={handleToggleissue}
          >
            Costomer Not Availble ?
          </li>
        </ul>
      )}


      {issueType !== "" && (
        <form onSubmit={submitIssue}>
          {issueType === "need_specialist" && (
            <div className="needspecialist flex flex-col gap-1.5 shadow-2xl rounded-[8px] max-w-[300px] w-full fixed bottom-[27%] right-[5%] bg-[#fff] shadow-[-2px_0px_7px_0px_var(--primary-color)]">
              <input
                type="text"
                name="specializationRequired"
                placeholder="specilizaion"
                className="h-[40px] text-center border-2 border-[var(--primary-color)] rounded-[4px]"
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="reason"
                placeholder="Reason"
                onChange={handleChange}
                className="h-[40px] text-center border-2 border-[var(--primary-color)] rounded-[4px]"
                required
              />

              <button className="h-[40px] bg-[var(--primary-color)] text-white font-semibold">
                Submit
              </button>
            </div>
          )}

          {issueType === "need_parts" && (
            <div className="needsparts fixed bottom-[27%] right-[5%] flex flex-col max-w-[300px] shadow-xl p-3 bg-white rounded-lg gap-2">
              <input
                type="text"
                name="remarks"
                placeholder="Describe"
                onChange={handleChange}
                className="h-[40px] text-center border-2 border-[var(--primary-color)] rounded-[4px]"
                required
              />

              <button className="h-[40px] bg-[var(--primary-color)] text-white font-semibold">
                Submit
              </button>
            </div>
          )}

          {issueType === "customer_unavailable" && (
            <div className="costomernotavailble fixed bottom-[27%] right-[5%] flex flex-col max-w-[300px] shadow-xl p-3 bg-white rounded-lg gap-2">
              <input
                type="text"
                name="remarks"
                placeholder="Describe"
                onChange={handleChange}
                className="h-[40px] text-center border-2 border-[var(--primary-color)] rounded-[4px]"
                required
              />

              <button className="h-[40px] bg-[var(--primary-color)] text-white font-semibold">
                Submit
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

export default RaiseIssue;
