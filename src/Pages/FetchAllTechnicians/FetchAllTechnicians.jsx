import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminCounts from "../../components/AdminCounts/AdminCounts";
import { Link } from "react-router-dom";

function FetchAllTechnicians() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("authToken");

  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/gettechnican`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setTechnicians(response.data.technicians);
          localStorage.setItem("technicianCount", response.data.count);
        }
      } catch (err) {
        console.error("Failed to fetch technicians:", err);
        setError("Failed to fetch technicians");
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, [apiUrl, token]);

  if (loading) return <p>Loading technicians...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const filteredResults = technicians.filter((tech) => {
    const fullName = `${tech.firstName} ${tech.lastName}`.toLowerCase();
    const term = searchTerm.toLowerCase();

    return (
      fullName.includes(term) ||
      tech.email?.toLowerCase().includes(term) ||
      tech.phone?.toLowerCase().includes(term) ||
      tech.specialization?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="FetchAllTechnicians">
      <AdminCounts />

      <div className="max-w-[1280px] mx-auto px-[20px] mt-[20px] mb-[25px] flex justify-between items-center flex-wrap gap-[12px]">

        <Link to="/adminDashboard/adminRegister">
          <button
            className=" text-white px-[10px] py-[5px] rounded-[3px]
                     shadow bg-green-700 transition"
          >
            + Add New Technician
          </button>
        </Link>
      </div>

      <div className="max-w-[1280px] mx-auto px-[20px]">
        {filteredResults.length === 0 && (
          <p className="text-center text-gray-600 mt-10">
            No technicians found.
          </p>
        )}

        {filteredResults.map((tech) => (
          <div
            key={tech._id}
            className="shadow-[1px_18px_38px_-3px_rgba(0,_0,_0,_0.35)]
              p-[20px] rounded-[10px] my-[15px] bg-[#EEF0FA]
              relative flex flex-col"
          >
            <span className="absolute left-0 top-0 bottom-0 w-[8px] bg-[#7BF1A8]"></span>

            <div className="flex justify-between">
              <div className="flex flex-col gap-[12px] p-[8px]">
                <h2 className="text-[18px] font-semibold text-[#101828]">
                  {tech.firstName} {tech.lastName}
                </h2>

                <div>
                  <p className="text-[13px] text-[#6A7282] font-semibold">
                    Email
                  </p>
                  <p className="text-[15px] font-semibold text-[#364153]">
                    {tech.email}
                  </p>
                </div>

                <div>
                  <p className="text-[13px] text-[#6A7282] font-semibold">
                    Phone
                  </p>
                  <p className="text-[15px] font-semibold text-[#364153]">
                    {tech.phone}
                  </p>
                </div>

                <div>
                  <p className="text-[13px] text-[#6A7282] font-semibold">
                    Specialization
                  </p>
                  <p className="text-[15px] font-semibold text-[#364153]">
                    {tech.specialization || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-start">
                <div className="mt-[10px] border px-[10px] py-[5px] border-gray-600 rounded-[4px] absolute top-0 right-0">
                  <i className="fa-solid fa-user text-green-600 mr-[5px]"></i>
                  Technician
                </div>
              </div>
            </div>

   
            <div
              className="flex justify-between border-t-[2px] border-dashed border-[#6A7282] 
                        pt-[12px] mt-[12px] px-[5px]"
            >
              <div className="left flex gap-[20px]">
                <div className="bg-white p-[7px] px-[15px] rounded-[4px] text-[var(--primary-color)] cursor-pointer">
                  <i className="fa-regular fa-envelope"></i>
                </div>
                <div className="bg-white p-[7px] px-[15px] rounded-[4px] text-[var(--primary-color)] cursor-pointer">
                  <i className="fa-solid fa-phone"></i>
                </div>
              </div>

              <button className="text-[var(--primary-color)] flex items-center gap-[6px]">
                View Profile
                <i className="fa-solid fa-arrow-right-long text-[12px]"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FetchAllTechnicians;
