import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const BookingContext = createContext();
export const useBooking = () => useContext(BookingContext);

const API_BASE = "https://fastresponse.onrender.com/api/work";

export function BookingProvider({ children }) {
  const token = localStorage.getItem("authToken");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [technicians, setTechnicians] = useState([]);
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [createdWork, setCreatedWork] = useState(null);

  const openBooking = async (service, location = "Delhi") => {
    setSelectedService(service);
    setIsBookingOpen(true);
    setStep(0);
    setSelectedTechnician(null);
    setSelectedDate("");
    setSelectedSlot("");

    try {
      const res = await axios.post(
        `${API_BASE}/create`,
        {
          serviceType: service.serviceType,
          specialization: service.specialization.map((s) => s.toLowerCase()),
          location,
          description: `User wants ${service.title}`,
          serviceCharge: service.price,
          lat: 28.6139,
          lng: 77.209,
        },
        { headers }
      );

      setCreatedWork(res.data.work);

      setTechnicians(
        (res.data.matchingTechnicians || []).map((tech) => ({
          ...tech,
          availableSlots: tech.availableSlots || [
            "09:00 AM",
            "11:00 AM",
            "01:00 PM",
            "03:00 PM",
          ],
        }))
      );
    } catch (err) {
      console.error("Booking error:", err.message);
    }
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setStep(0);
    setSelectedService(null);
    setTechnicians([]);
    setSelectedTechnician(null);
    setSelectedDate("");
    setSelectedSlot("");
    setCreatedWork(null);
  };

  return (
    <BookingContext.Provider
      value={{
        isBookingOpen,
        openBooking,
        closeBooking,
        step,
        setStep,
        selectedService,
        technicians,
        selectedTechnician,
        setSelectedTechnician,
        selectedDate,
        setSelectedDate,
        selectedSlot,
        setSelectedSlot,
        createdWork,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export default BookingContext;
