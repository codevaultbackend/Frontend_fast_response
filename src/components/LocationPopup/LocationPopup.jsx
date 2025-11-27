import React, { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

function LocationPopup({
  setStep,
  selectedTechnician,
  createdWork,
  selectedDate,
  selectedSlot,
  selectedService,
  setShowPopup,
}) {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingBook, setLoadingBook] = useState(false);
  const [status, setStatus] = useState("");


  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      return alert("Geolocation is not supported by your browser.");
    }

    setStatus("Fetching your live location...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latitude = pos.coords.latitude.toFixed(6);
        const longitude = pos.coords.longitude.toFixed(6);

        setLat(latitude);
        setLng(longitude);
        setStatus(`Location detected! (${latitude}, ${longitude})`);
        console.log("Detected coordinates:", latitude, longitude);
      },
      (err) => {
        console.error("Geolocation error:", err);
        setStatus("Failed to retrieve location. Please allow location access.");
        alert("Failed to get location. Make sure GPS/location permission is enabled.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };


  const saveLocation = async (coords) => {
    const latitude = coords?.latitude ?? lat;
    const longitude = coords?.longitude ?? lng;

    if (!latitude || !longitude) {
      return alert("Please detect your location first.");
    }

    const token = localStorage.getItem("authToken");
    if (!token) return alert("You must be logged in.");

    try {
      setLoadingSave(true);

      await axios.post(
        `${API_BASE}/api/savelocation`,
        { lat: latitude, lng: longitude },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStatus("Location saved successfully!");
      console.log("Saved coordinates:", latitude, longitude);
    } catch (err) {
      console.error("Save location error:", err);
      alert("Failed to save location");
    } finally {
      setLoadingSave(false);
    }
  };


  const handleConfirmBooking = async () => {
    if (!createdWork?._id) return alert("Work was not created yet.");
    if (!selectedTechnician?._id) return alert("No technician selected.");
    if (!selectedDate || !selectedSlot) return alert("Please select date and time.");

    const token = localStorage.getItem("authToken");
    if (!token) return alert("You must be logged in.");

    const payload = {
      workId: createdWork._id,
      technicianId: selectedTechnician._id,
      serviceType: selectedService?.serviceType,
      serviceCharge: selectedService?.price,
      description: `Booking for ${selectedService?.title}`,
      date: selectedDate,
      time: selectedSlot,
      lat,
      lng,
    };

    try {
      setLoadingBook(true);

      await axios.post(`${API_BASE}/api/work/book-technician`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Technician booked successfully!");
      setShowPopup(false);
    } catch (err) {
      console.error("Booking Error:", err);
    } finally {
      setLoadingBook(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-xl relative">
        <button
          onClick={() => setStep(1)}
          className="border border-gray-400 py-2 px-4 rounded-md"
        >
          Back
        </button>

        <h2 className="text-xl font-bold text-center mb-4">Share Your Location</h2>
        <p className="text-sm text-gray-600 text-center mb-4">
          We require your live location to assign the nearest technician.
        </p>

        <div className="flex flex-col gap-3 mb-4">
          <button
            onClick={getCurrentLocation}
            className="bg-[#473BF0] text-white py-2 rounded-md"
          >
            Detect My Location
          </button>
        </div>

        {status && (
          <p className="text-center text-gray-500 text-sm mb-3">{status}</p>
        )}

        <button
          onClick={() => saveLocation()}
          disabled={loadingSave || !lat || !lng}
          className="w-full bg-blue-500 text-white py-2 rounded-md disabled:opacity-50"
        >
          {loadingSave ? "Saving..." : "Save Location"}
        </button>

        <button
          onClick={handleConfirmBooking}
          disabled={loadingBook}
          className="w-full bg-[var(--primary-color)] text-white py-2 mt-4 rounded-md disabled:opacity-50"
        >
          {loadingBook ? "Booking..." : "Confirm & Book"}
        </button>
      </div>
    </div>
  );
}

export default LocationPopup;
