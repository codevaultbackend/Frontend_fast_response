import React from "react";
import LocationPopup from "../../components/LocationPopup/LocationPopup";
import MetchTechnicians from "../../components/MetchTechnicians/MetchTechnicians";
import UserSelectDateTime from "../../components/UserSelectDate&Time/UserSelectDateTime";
import { useBooking } from "../../context/BookingContext";

export default function BookingPopup() {
  const {
    isBookingOpen,
    closeBooking,
    step,
    setStep,
    technicians,
    selectedTechnician,
    setSelectedTechnician,
    selectedDate,
    setSelectedDate,
    selectedSlot,
    setSelectedSlot,
    createdWork,
    selectedService,
  } = useBooking();

  if (!isBookingOpen) return null;

  const timeSlots = selectedTechnician?.availableSlots || [];

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] sm:w-[400px] relative">
        <button
          className="absolute top-3 right-3 text-gray-500"
          onClick={closeBooking}
        >
          ✕
        </button>

        {step === 0 && (
          <MetchTechnicians
            technicians={technicians}
            selectedTechnician={selectedTechnician}
            setSelectedTechnician={setSelectedTechnician}
            setStep={setStep}
          />
        )}

        {step === 1 && (
          <UserSelectDateTime
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
            timeSlots={timeSlots}
            setStep={setStep}
          />
        )}

        {step === 2 && (
          <LocationPopup
            selectedTechnician={selectedTechnician}
            createdWork={createdWork}
            selectedService={selectedService}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            setStep={setStep}
          />
        )}
      </div>
    </div>
  );
}
