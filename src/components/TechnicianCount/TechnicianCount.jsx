import React, { useState, useEffect } from "react";
import axios from "axios";
import asstes from "../../../public/assets/asstes";
import TechnicianProgressBar from "../TechnicianProgressBar/TechnicianProgressBar";

function TechnicianCount({works}) {
  const apiUrl = import.meta.env.VITE_API_URL
  const [summary, setSummary] = useState({
    TotalOrders: 0,
    Active: 0,
    Completed: 0,
    Canceled: 0,
  });

  const [loading, setLoading] = useState(true);

  const CountDataSet = [
    {
      title: "Total Orders",
      value: works.length,
      icon: asstes.totleBooking,
      chart: "1200",
    },
    {
      title: "Active",
      value: summary.activeCount,
      icon: asstes.Eactive,
      chart: "1200",
    },
    {
      title: "Completed",
      value: summary.completedCount,
      icon: asstes.done,
      chart: "1200",
    },
    {
      title: "Canceled",
      value: summary.rejectedCount,
      icon: asstes.open,
      chart: "1200",
    },
  ];

  const fetchCounts = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.get(
        `${apiUrl}/technicaian/summary-count-1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.summary) {
        setSummary(res.data.summary);
      }
    } catch (error) {
      console.error(
        "Error fetching technician counts:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  if (loading) {
    return <div className="p-4 text-gray-600">Loading summary...</div>;
  }

  return (
    <div className="top-main-wrapper bg-[#F4F6FF] rounded-lg py-[10px]  shadow-md ">
    <div className="technician-counts  p-6   gap-4 flex justify-center flex-wrap px-[10px] py-[40px] max-[870px]:grid  max-[870px]:grid-cols-2 ">
      {CountDataSet.map((data, index) => (
        <div
          key={index}
          className=" technicians-count-card p-4 border rounded-lg shadow-[0_10px_36px_0_rgba(0,0,0,0.16),_0_0_0_1px_rgba(0,0,0,0.06)] flex items-center justify-between max-w-[270px] w-full bg-white"
        >
          <div>
            <h2 className="text-[#64748B] text-[15px] font-medium">
              {data.title}
            </h2>
            <h3 className="text-[#020817] text-[22px] font-semibold">
              {data.value}
            </h3>
            <p className="text-[#22C55E] text-[14px]">{data.chart}</p>
          </div>
          <img src={data.icon} alt="fastresponce" />
        </div>
      ))}
          </div>
      <TechnicianProgressBar summary={summary} works={works} />
    </div>

  );
}

export default TechnicianCount;
