import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import asstes from "../../../public/assets/asstes";

const BookingTracking = () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientOrders = async () => {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("You must be logged in to view bookings.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://fastresponse.onrender.com/api/getAllWork",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (
          response.data &&
          response.data.works &&
          response.data.works.length > 0
        ) {
          setOrders(response.data.works);
          console.log(response.data.works);
          
        } else {
          setOrders([]);
          setError("No bookings found.");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        if (err.response?.status === 404) {
          setError("Bookings endpoint not found. Please contact support.");
        } else if (err.response?.status === 401) {
          setError("Unauthorized. Please login again.");
        } else {
          setError("Failed to fetch bookings. Try again later.");
        }
      } finally {
        setLoading(false);
        console.log('my orders:',orders)
      }
    };

    fetchClientOrders();
  }, []);

  if (loading) return <p className="text-center mt-6">Loading bookings...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-[var(--text-color)]">
        My Bookings
      </h1>
      <hr className="max-w-[1280px] mb-[40px] mx-auto h-[4px] rounded-[8px] bg-[var(--primary-color)]" />

      {orders.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <div className="w-full border-collapse ">
          <div>
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between max-w-[1280px] mx-auto px-[20px] shadow-[-2px_5px_16px_-6px_var(--primary-color)] rounded-[7px] my-[40px] relative"
              >
                <div className="left-content flex items-center gap-1.5 ">
                  <div className="icon-con icon-con border-[2px]  border-[var(--primary-color)] rounded-[50%] p-[10px] w-[40px] ">
                   <i className="fa-solid fa-user "></i>
                  </div>
                  <div className="other-text flex flex-col ">
                    <div className="p-2 text-[var(--primary-color)] font-semibold">
                      {order.token}
                    </div>
                    <div className="p-2 text-[var(--text-color)]">
                      {order.serviceType}
                    </div>
                    <div className="p-2">
                      {new Date(order.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="left-right flex flex-col">
                  <div className="p-2 text-right w-fit bg-green-400 text-white font-semibold text-[10px] mt-[20px] mx-auto absolute bottom-0 right-0 rounded-[4px]">
                    {order.status}
                  </div>
                  <div className="p-2 text-center">
                    <button
                      onClick={() => navigate(`/TrackOrderRecords/${order.id}`)}
                      className="h-[45px] px-[10px] shadow-2xl shadow-gray-500 mt-[10px] bg-[var(--primary-color)] text-white text-[12px] font-semibold rounded-[8px]"
                    >
                      Explore Service
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingTracking;
