import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AllWorkAdmin() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("authToken");
  const [allWorks, setAllWorks] = useState([]);
  const [filteredWorks, setFilteredWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllWork = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/getAllWorkadmin`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          console.log("Fetched works:", res.data.work);
          setAllWorks(res.data.work || []);
          setFilteredWorks(res.data.work || []);
        }
      } catch (err) {
        console.error("Error fetching works:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllWork();
  }, [apiUrl, token]);

  const handleDateFilter = () => {
    console.log(allWorks);
    if (!selectedDate) return setFilteredWorks(allWorks);

    const filtered = allWorks.filter((work) => {
      const workDate = new Date(work.createdAt).toISOString().split("T")[0];
      return workDate === selectedDate;
    });

    setFilteredWorks(filtered);
  };

  useEffect(() => {
    handleDateFilter();
  }, [selectedDate, allWorks]);

  if (loading)
    return (
      <div className="text-center min-h-[100vh] flex items-center justify-center text-gray-600">
        Loading works...
      </div>
    );

  if (allWorks.length === 0)
    return (
      <div className="text-center min-h-[100vh] flex items-center justify-center text-gray-600">
        No works available.
      </div>
    );

  return (
    <div className="AllWorkAdmin max-w-[1280px] mx-auto px-[20px] py-[20px]">
      <div className="flex flex-wrap justify-start gap-[10px] mb-[20px]">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-[8px] border border-gray-300 rounded-md"
        />
        <button
          onClick={handleDateFilter}
          className="bg-[var(--primary-color)] text-white px-[15px] py-[8px] rounded-md"
        >
          Filter
        </button>
        <button
          onClick={() => {
            setSelectedDate("");
            setFilteredWorks(allWorks);
          }}
          className="bg-gray-300 text-gray-800 px-[15px] py-[8px] rounded-md"
        >
          Reset
        </button>
      </div>

      {filteredWorks.length === 0 && (
        <p className="text-center text-gray-600 mt-10">
          No works found for the selected date.
        </p>
      )}

      {filteredWorks.map((work) => (
        <div
          key={work.workId}
          className="relative bg-[#EEF0FA] shadow-[1px_18px_38px_-3px_rgba(0,_0,_0,_0.35)]
            rounded-[10px] my-[15px] p-[20px] flex flex-col"
        >
          <h2>{work.workId}</h2>
          <span className="absolute left-0 top-0 bottom-0 w-[8px] bg-[#7BF1A8] rounded-l-[10px]"></span>

          <div className="flex flex-col md:flex-row justify-between gap-[20px]">
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-[16px] font-semibold text-[#101828]">
                Client
              </h3>
              <p className="text-[14px] text-[#6A7282]">
                <strong>Name:</strong> {work.client?.firstName}{" "}
                {work.client?.lastName || ""}
              </p>
              <p className="text-[14px] text-[#6A7282]">
                <strong>Email:</strong> {work.client?.email || "N/A"}
              </p>
              <p className="text-[14px] text-[#6A7282]">
                <strong>Phone:</strong> {work.client?.phone || "N/A"}
              </p>
              <p className="text-[14px] text-[#6A7282]">
                <strong>Address:</strong> {work.client?.location || "N/A"}
              </p>
              <p className="text-[14px] text-[#6A7282]">
                <strong>Created At:</strong>{" "}
                {work.createdAt
                  ? new Date(work.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "N/A"}
              </p>
            </div>

            {/* Technician Info */}
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-[16px] font-semibold text-[#101828]">
                Technician
              </h3>
              <p className="text-[14px] text-[#6A7282]">
                <strong>Name:</strong>{" "}
                {work.assignedTechnician?.firstName || "N/A"}
              </p>
              <p className="text-[14px] text-[#6A7282]">
                <strong>Email:</strong>{" "}
                {work.assignedTechnician?.email || "N/A"}
              </p>
              <p className="text-[14px] text-[#6A7282]">
                <strong>Phone:</strong>{" "}
                {work.assignedTechnician?.phone || "N/A"}
              </p>

              {/* Work Info */}
              <div className="flex flex-col gap-[8px] mt-[8px]">
                <h3 className="text-[16px] font-semibold text-[#101828]">
                  Work
                </h3>
                <p className="text-[14px] text-[#6A7282]">
                  <strong>Service Type:</strong> {work.serviceType || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between border-t-[2px] border-dashed border-[#6A7282] mt-[12px] pt-[12px] ">
            <div className="flex gap-[15px]">
              <div className="bg-white p-[7px] px-[15px] rounded-[4px] text-[var(--primary-color)] cursor-pointer">
                <i className="fa-regular fa-envelope"></i>
              </div>
              <div className="bg-white p-[7px] px-[15px] rounded-[4px] text-[var(--primary-color)] cursor-pointer">
                <i className="fa-solid fa-phone"></i>
              </div>
            </div>

            <button
              onClick={() =>
                navigate(`/adminDashboard/AllWorkDescrip/${work._id}`)
              }
              className="bg-[var(--primary-color)] text-white px-4 py-2 rounded"
            >
              Explore Work
            </button>

            <div className="top-[10px] right-0 text-[14px] bg-green-600 px-[10px] py-[5px] text-white rounded absolute  ">
              {work.status || "Pending"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllWorkAdmin;
