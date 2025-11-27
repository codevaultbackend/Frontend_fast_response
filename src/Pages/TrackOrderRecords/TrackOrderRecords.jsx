import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserMapContainer from "../../components/UserMapContainer/UserMapContainer";
import Technician from "../Technician/Technician";
import TechnicianOrder from "../TechnicianOrder/TechnicianOrder";
import TechnicianWorkStatus from "../../components/TechnicianWorkStatus/TechnicianWorkStatus";

const TrackOrderRecords = () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [workStatus, setWorkStatus] = useState();

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("You must be logged in to view this order.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${apiUrl}/api/client-work/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrder(response.data.workStatus);
        setWorkStatus(response.data.workStatus);
      } catch (err) {
        setError("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading order...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <UserMapContainer id={id} />
      <hr className="max-w-[1280px] mb-[40px] mx-auto h-[4px] rounded-[8px] bg-[var(--primary-color)]" />
      <h1 className="text-2xl font-bold mb-4 text-center text-[28px] text-[var(--primary-color)]">Order Details</h1>
      {order && (
        <div className="p-4 rounded shadow-[6px_4px_0px_8px_rgba(59,_130,_246,_0.5)] flex justify-between max-w-[1280px] mx-auto px-[20px] text-[#222]">
          <div className="row1">
            <p className="font-semibold text-[var(--primary-color)]">
               {order.token}
            </p>
            <p className="text-[14px] mt-[10px]">
               {order.description}
            </p>
            <p className="text-[13px]">
               {order.serviceType}
            </p>

          </div>
          <div className="row2">
            <p className="text-right bg-green-400 p-[5px] w-fit text-white text-[10px] font-semibold mb-[20px]">
               {order.status}
            </p>
             <p>
             
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default TrackOrderRecords;
