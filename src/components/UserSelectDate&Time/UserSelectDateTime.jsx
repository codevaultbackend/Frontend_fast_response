import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function UserSelectDateTime({
  selectedDate,
  setSelectedDate,
  selectedSlot,
  setSelectedSlot,
  timeSlots = [], 
  setStep,
}) {
  
  const getDateObject = (dateStr) => {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split("-");
    return new Date(year, month - 1, day);
  };

  
  const formatDate = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="UserSelectDateTime p-4">
      <h3 className="text-xl font-bold mb-4 text-center">
        Select Date & Time
      </h3>

      <div className="datepicker w-fit mx-auto mb-4">
        <DatePicker
          selected={getDateObject(selectedDate)}
          onChange={(date) => {
            setSelectedDate(formatDate(date));
            setSelectedSlot(""); 
          }}
          inline
          minDate={new Date()}
          className="border-0 shadow-2xl"
        />
      </div>

      {/* Time Slots */}
      {selectedDate && timeSlots.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 mb-4 mt-4">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`p-2 rounded-md transition border ${
                selectedSlot === slot
                  ? "bg-blue-500 text-white border-blue-600"
                  : "bg-white hover:bg-gray-200 text-[var(--primary-color)]"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      ) : selectedDate ? (
        <p className="text-center text-gray-500 mb-4">
          No available slots for this date.
        </p>
      ) : null}

      {/* Navigation Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setStep(0)}
          className="flex-1 border border-gray-400 py-2 rounded-md"
        >
          Back
        </button>
        <button
          disabled={!selectedSlot || !selectedDate}
          onClick={() => setStep(2)}
          className="flex-1 bg-[#473BF0] text-white py-2 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Display selected date and slot */}
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>Selected Date: {selectedDate || "None"}</p>
        <p>Selected Slot: {selectedSlot || "None"}</p>
      </div>
    </div>
  );
}

export default UserSelectDateTime;
