import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminCounts from "../../components/AdminCounts/AdminCounts";

function FetchAllClients() {
  const [allClients, setAllClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/getclient`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setAllClients(res.data.client);
          localStorage.setItem("clientCount", res.data.count);
        }
      } catch (err) {
        console.error("Error fetching clients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [apiUrl, token]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading clients...</p>;
  }

  return (
    <div className="FetchAllClients">
      <AdminCounts />

      <div className="max-w-[1280px] mx-auto px-[20px] mt-[30px]">
        {allClients.map((client, index) => (
          <div
            key={client._id || index}
            className="shadow-[1px_18px_38px_-3px_rgba(0,_0,_0,_0.35)] 
              p-[20px] rounded-[10px] my-[15px] bg-[#EEF0FA] 
              relative flex flex-col"
          >
           
            <span className="absolute left-0 top-0 bottom-0 w-[8px] bg-[#6A9CFB]"></span>

         
            <div className="flex justify-between">
              <div className="flex flex-col gap-[12px] p-[8px]">
                <h2 className="text-[18px] font-semibold text-[#101828]">
                  {client.firstName} {client.lastName}
                </h2>

                <div>
                  <p className="text-[13px] text-[#6A7282] font-semibold">Email</p>
                  <p className="text-[15px] font-semibold text-[#364153]">
                    {client.email}
                  </p>
                </div>

                <div>
                  <p className="text-[13px] text-[#6A7282] font-semibold">Phone</p>
                  <p className="text-[15px] font-semibold text-[#364153]">
                    {client.phone}
                  </p>
                </div>

                <div>
                  <p className="text-[13px] text-[#6A7282] font-semibold">
                    Account Created
                  </p>
                  <p className="text-[15px] font-semibold text-[#364153]">
                    {new Date(client.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-start absolute top-0 right-0">
                <div className="mt-[10px] border px-[10px] py-[5px] border-gray-600 rounded-[4px]">
                  <i className="fa-solid fa-user text-blue-600 mr-[5px]"></i>
                  Client
                </div>
              </div>
            </div>

            {/* BOTTOM SECTION */}
            <div className="flex justify-between border-t-[2px] border-dashed border-[#6A7282] pt-[12px] mt-[12px] px-[5px]">
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

export default FetchAllClients;
