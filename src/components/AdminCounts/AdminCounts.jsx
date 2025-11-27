import React, { useEffect, useState } from "react";
import asstes from "../../../public/assets/asstes";

function AdminCounts() {
  const [tTechnicians, setTechnicians] = useState(0);
  const [tClients, setClients] = useState(0);

  useEffect(() => {
    setTechnicians(Number(localStorage.getItem("technicianCount")) || 0);
    setClients(Number(localStorage.getItem("clientCount")) || 0);
  }, []);

  const CountCards = [
    {
      title: "Totle Technicians",
      counts: tTechnicians,
      icon: asstes.open,
      chart: "1200",
    },
    {
      title: "Totle Clients",
      counts: tClients,
      icon: asstes.open,
      chart: "1200",
    },
    {
      title: "Issues",
      counts: "10",
      icon: asstes.open,
      chart: "1200",
    },
    {
      title: "Totle Jobs",
      counts: "10",
      icon: asstes.open,
      chart: "1200",
    },
  ];
  return (
    <div className="AdminCounts">
      <div className="top-main-wrapper bg-[#F4F6FF] rounded-lg py-[10px]  shadow-md ">
        <div className="technician-counts  p-6   gap-4 flex justify-center flex-wrap px-[10px] py-[40px] max-[870px]:grid  max-[870px]:grid-cols-2 ">
          {CountCards.map((data, index) => (
            <div
              key={index}
              className=" technicians-count-card p-4 border rounded-lg shadow-[0_10px_36px_0_rgba(0,0,0,0.16),_0_0_0_1px_rgba(0,0,0,0.06)] flex items-center justify-between max-w-[270px] w-full bg-white"
            >
              <div>
                <h2 className="text-[#64748B] text-[15px] font-medium">
                  {data.title}
                </h2>
                <h3 className="text-[#020817] text-[22px] font-semibold">
                  {data.counts}
                </h3>
                <p className="text-[#22C55E] text-[14px]">{data.chart}</p>
              </div>
              <img src={data.icon} alt="fastresponce" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminCounts;
