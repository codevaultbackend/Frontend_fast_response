import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Technician from "../Technician/Technician";
import TechnicianCount from "../../components/TechnicianCount/TechnicianCount";

function TechnicianOrder() {
  const [works, setWorks] = useState([]);
  const [categorized, setCategorized] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const currentWorkId = localStorage.getItem("currentWorkId");
  const [currentStatus, setCurrentStatus] = useState()
  const apiUrl = import.meta.env.VITE_API_URL

  const [toggleFilter, setToggleFilter] = useState("Total Orders");

  const navigate = useNavigate();

  const filtertitles = [
    { title: "Total Orders" },
    { title: "Active" },
    { title: "Completed" },
    { title: "Canceled" },
  ];

  const handleAcceptWork = async (workId) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        `${apiUrl}/technicaian/approve-job`,
        { workId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Work accepted successfully!");

        setWorks((prev) =>
          prev.map((work) =>
            work._id === workId ? { ...work, status: "accepted" } : work
          )
        );

        localStorage.setItem("currentWorkId", workId);
        navigate(`/TechnicianView/techOrders/current-work/${workId}`);
      }
    } catch (error) {
      console.error("Error accepting work:", error);
      alert(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const fetchTechnicianWorks = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");

        const response = await axios.get(
          `${apiUrl}/technicaian/summary`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setWorks(response.data.works);
         
          
          console.log(response.data.works);
          setCategorized(response.data.categorized);
        } else {
          setError(response.data.message || "Failed to fetch works");
        }
      } catch (err) {
        console.error("Error fetching works:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicianWorks();
  }, []);

  if (loading) return <div>Loading works...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;


  const filterWorks = (work) => {
    if (toggleFilter === "Total Orders") return true;

    if (toggleFilter === "Active")
      return ["accepted", "dispatch", "inprogress"].includes(work.status);

    if (toggleFilter === "Completed") return work.status === "confirm";

    if (toggleFilter === "Canceled") return work.status === "canceled";

    return true;
  };

  const filteredWorks = works.filter(filterWorks);

  return (
    <div className="mb-[120px]">
      <TechnicianCount works={works} />

      <div className="filter-bar max-w-[1180px] mx-auto">
        <ul className="flex justify-between my-[20px] bg-[#E5E7EB] rounded-[12px] p-[14px]">
          {filtertitles.map((filters, index) => (
            <li
              key={index}
              className={`h-[60px] rounded-[9px] max-w-[240px] w-full flex items-center justify-center cursor-pointer
                ${toggleFilter === filters.title ? "bg-white shadow-md" : ""}`}
              onClick={() => setToggleFilter(filters.title)}
            >
              <h3 className="max-[870px]:text-[10px] font-semibold">{filters.title}</h3>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full border-collapse max-w-[1280px] mx-auto max-[870px]:max-w-[95%] max-[870px]:mx-auto px-[20px]">
        <div>
          {filteredWorks.map((work) => (
            <div
              key={work._id}
              className="shadow-[1px_18px_38px_-3px_rgba(0,_0,_0,_0.35)] flex justify-between p-[10px] px-[20px] rounded-[8px] my-[10px] bg-[#EEF0FA] relative overflow-hidden flex-col"
            >
              <div className="flex justify-between">
                <span className={`side top-0 inline-block h-full w-[8px] ${ work.status === 'inprogress' || 'completed' || 'confirm' || 'dispatch' ? 'bg-[#7BF1A8]' : 'bg-[#6A7282]'}  absolute left-0 flex justify-between`}></span>
                <div className="fist-row flex flex-col gap-[2px] p-[8px]  pt-[0]">
                  <div className="left-side">
                    <div className="text-[16px] text-[#101828] font-semibold  ">
                      <h2 className="mb-[18px]">{work.serviceType}</h2>
                    </div>
                    <div className="button-wrapper flex my-[10px] max-[870px]:flex-col max-[870px]:gap-[10px]">
                      <div className="wrapper mr-[10px] flex gap-[20px] p-[10px] bg-[#fff] items-center rounded-[8px]">
                        <div className="icon text-[var(--primary-color)]">
                          <i class="fa-regular fa-calendar"></i>
                        </div>
                        <div className="">
                          <p className="text-[10px] font-semibold text-[#6A7282]">
                            Due Date
                          </p>
                          <p className="text-[13px] font-semibold">
                            Today • 9:00 AM
                          </p>
                        </div>
                      </div>
                      <div className="wrapper flex gap-[20px] p-[10px] bg-[#fff] items-center mr-[10px] rounded-[8px]">
                        <div className="icon text-[var(--primary-color)]">
                          <i class="fa-regular fa-clock"></i>
                        </div>
                        <div className="">
                          <p className="text-[10px] text-[#6A7282] font-semibold">
                            Assigned by
                          </p>
                          <p className="text-[13px] font-semibold">{work.client.firstName}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-[10px]">
                    <i class="fa-solid fa-location-dot mt-[2px]"></i>{" "}
                    <div className="flex flex-col">
                      <h3 className="addresslabel text-[14px] text-[#6A7282] font-[400]">
                        Address
                      </h3>
                      <p className="text-[16px] text-[#364153]">
                        {work.location}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="last-row flex flex-col justify-between">
                  <div className=" mt-[10px] border-gray-600 border-[1px] rounded-[4px] p-[5px] px-[10px]">{work.status === 'inprogress' || 'completed' || 'open' || 'taken' ? <i class="fa-regular fa-clock mr-[10px] text-green-500"></i> : <i class="fa-solid fa-check bg-green-500 rounded-[50%] text-[12px] h-[20px] w-[20px] p-[2.6px] text-[#fff]   mr-[5px]  max-[870px]:!text-[9px] max-[870px]:!h-[15px] max-[870px]:!w-[15px]"></i>}{work.status === 'confirm'?'complete':work.status}</div>
                </div>

              </div>
              <div className="bootom-row flex max-w-[97.4%] mx-auto w-full justify-between border-t-[2px] border-dashed border-[#6A7282] my-[5px] pt-[10px] ">
                <div className="left flex gap-[20px] gap-[10px]  p-[10px] bg-transparent">
                  <div className=" gap-[10px] mx-[10px] bg-[#fff] p-[7px] px-[15px] text-[var(--primary-color)] rounded-[4px]">
                    <i class="fa-regular fa-envelope"></i>
                  </div>
                  <div className=" mx-[10px] gap-[10px]  bg-[#fff] p-[7px] px-[15px] text-[var(--primary-color)] rounded-[4px]">
                    <i class="fa-solid fa-phone"></i>
                  </div>
                </div>

                <div className="right mt-[10px]">
                  {![
                    "dispatch",
                    "inprogress",
                    "completed",
                    "confirm",
                    "accepted",
                  ].includes(work.status) ? (
                    <button
                      className="h-[35px] max-[870px]:text-[13px] px-[10px] bg-[var(--primary-color)] text-white rounded"
                      onClick={() => handleAcceptWork(work._id)}
                    >
                      Accept Work
                    </button>
                  ) : (
                    <Link
                      to={`/TechnicianView/techOrders/current-work/${currentWorkId}`}
                    >
                      <button className=" text-[var(--primary-color)]">
                        Track Work{" "}
                        <i class="fa-solid fa-arrow-right-long text-[var(--primary-color)] text-[10px] ml-[2px]"></i>
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TechnicianOrder;
