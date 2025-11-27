import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Polyline,
} from "@react-google-maps/api";
import axios from "axios";
import { useParams } from "react-router-dom";
import { connectSocket, getSocket, disconnectSocket } from "../../socket";
import TechnicianWorkStatus from "../../components/TechnicianWorkStatus/TechnicianWorkStatus";
import RaiseIssue from "../../components/RaiseIssue/RaiseIssue";

const containerStyle = { width: "100%", height: "100%" };

const trimRoute = (currentPos, route) => {
  if (!window.google || !route.length) return route;

  let closestIndex = 0;
  let minDist = Infinity;

  route.forEach((point, index) => {
    const dist = window.google.maps.geometry.spherical.computeDistanceBetween(
      new window.google.maps.LatLng(currentPos.lat, currentPos.lng),
      new window.google.maps.LatLng(point.lat, point.lng)
    );

    if (dist < minDist) {
      minDist = dist;
      closestIndex = index;
    }
  });

  return route.slice(closestIndex);
};

const decodePolyline = (encoded) => {
  if (!window.google?.maps?.geometry) return [];
  return window.google.maps.geometry.encoding.decodePath(encoded).map((p) => ({
    lat: p.lat(),
    lng: p.lng(),
  }));
};

export default function TechCurrentOrder() {
  const { workId } = useParams();
  const apiUrl = "https://fastresponse.onrender.com";
  const token = localStorage.getItem("authToken");

  const [technicianPos, setTechnicianPos] = useState(null);
  const [clientPos, setClientPos] = useState(null);
  const [eta, setEta] = useState("");
  const [distance, setDistance] = useState("");
  const [message, setMessage] = useState("");
  const [workStatus, setWorkStatus] = useState("approved");
  const [polylinePath, setPolylinePath] = useState([]);
  const [toggleStopT, setToggleStopT] = useState(false);

  const watchRef = useRef(null);
  const stopRef = useRef(false);
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["geometry"],
  });

  // ---------------- SOCKET ----------------
  useEffect(() => {
    connectSocket(token);
    const socket = getSocket();

    // Listen for technician position updates
    socket?.on("technicianPositionUpdate", (data) => {
      if (data.workId === workId) {
        const newPos = { lat: data.lat, lng: data.lng };
        setTechnicianPos(newPos);
        setPolylinePath((prev) => [...prev, newPos]);
        mapRef.current?.panTo(newPos);
      }
    });

    return () => {
      stopRef.current = true;
      if (watchRef.current) navigator.geolocation.clearWatch(watchRef.current);
      disconnectSocket();
      socket?.off("technicianPositionUpdate");
    };
  }, [token, workId]);

  // ---------------- FETCH INITIAL DATA ----------------
  const fetchInitialData = useCallback(async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/track-technician/${workId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.data || !res.data.technician || !res.data.client) {
        setWorkStatus("no-order");
        setMessage("No active work assigned.");
        setTechnicianPos(null);
        setClientPos(null);
        setPolylinePath([]);
        return;
      }

      const tech = res.data.technician;
      const client = res.data.client;

      if (tech?.coordinates) setTechnicianPos(tech.coordinates);
      if (client?.coordinates) setClientPos(client.coordinates);

      if (res.data.eta) setEta(res.data.eta);
      if (res.data.distance) setDistance(res.data.distance);

      if (tech?.liveStatus) setWorkStatus(tech.liveStatus);

      if (res.data.routePolyline) {
        const decoded = decodePolyline(res.data.routePolyline);
        setPolylinePath(decoded);
      }
    } catch (err) {
      console.error("Tracking fetch error:", err);
      setMessage("Unable to load tracking data.");
    }
  }, [apiUrl, token, workId]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // ---------------- START TRACKING ----------------
  const updateLocation = useCallback(
    async (coords) => {
      try {
        await axios.patch(
          `${apiUrl}/api/work/update-location`,
          { workId, coordinates: coords },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("Update location error:", err);
      }
    },
    [apiUrl, token, workId]
  );

  const handleStartTracking = () => {
    if (!navigator.geolocation) return setMessage("Geolocation not supported.");

    setMessage("Starting tracking...");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const init = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        // ⛔ FIXED → correct payload
        const res = await axios.patch(
          `${apiUrl}/api/work/update-location`,
          { lat: init.lat, lng: init.lng },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data?.workStatus === "dispatch") {
          setWorkStatus("dispatch");
        }

        setTechnicianPos(init);
        setPolylinePath((prev) => [...prev, init]);
        mapRef.current?.panTo(init);

        const socket = getSocket();
        socket?.emit("technicianPosition", { workId, ...init });

        watchRef.current = navigator.geolocation.watchPosition(
          async (loc) => {
            const newPos = {
              lat: loc.coords.latitude,
              lng: loc.coords.longitude,
            };

            // API update
            await axios.patch(
              `${apiUrl}/api/work/update-location`,
              { lat: newPos.lat, lng: newPos.lng },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            setTechnicianPos(newPos);

            // 🟦 TRIM THE ROUTE POLYLINE
            setPolylinePath((prev) => trimRoute(newPos, prev));

            // Pan map
            mapRef.current?.panTo(newPos);

            // Send socket update
            const socket = getSocket();
            socket?.emit("technicianPosition", { workId, ...newPos });

            setMessage("Tracking live...");
          },
          (err) => console.error("Watch error:", err),
          { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
        );
      },
      () => setMessage("Failed to read GPS. Allow location permission."),
      { enableHighAccuracy: true }
    );
  };

  const stopTracking = () => {
    stopRef.current = true;
    if (watchRef.current) {
      navigator.geolocation.clearWatch(watchRef.current);
      watchRef.current = null;
    }
    setToggleStopT(false);
    setMessage("Tracking stopped.");
  };

  useEffect(() => {
    if (workStatus === "inprogress" || workStatus === "dispatch") {
      setToggleStopT(true);
    } else {
      setToggleStopT(false);
    }
  }, [workStatus]);

  // ---------------- UPLOAD IMAGES & PAYMENT ----------------
  const handleUploadImage = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append("workId", workId);
    form.append(workStatus === "dispatch" ? "beforephoto" : "afterphoto", file);

    const endpoint =
      type === "before"
        ? `${apiUrl}/api/work/start`
        : `${apiUrl}/api/work/complete`;

    try {
      await axios.post(endpoint, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (type === "before") setWorkStatus("inprogress");
      if (type === "after") setWorkStatus("completed");

      setMessage("Photo uploaded successfully.");
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("Image upload failed.");
    }
  };

  const handlePaymentReceived = async (method) => {
    try {
      await axios.post(
        `${apiUrl}/technicaian/payment`,
        { workId, paymentMethod: method },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setWorkStatus("confirm");
      setMessage("Payment confirmed successfully.");
    } catch (err) {
      console.error(err);
      setMessage("Payment update failed.");
    }
  };

  if (workStatus === "no-order") {
    return (
      <div className="TechCurrentOrder p-4 text-center mt-10">
        <h2 className="text-xl font-semibold text-[var(--primary-color)]">
          Current Work
        </h2>
        <p className="text-gray-600 mt-4">No active work assigned.</p>
      </div>
    );
  }

  return (
    <div className="TechCurrentOrder p-4 max-w-[1200px] mx-auto mt-6 shadow-lg rounded overflow-hidden min-h-[100vh]">
      <h2 className="text-xl font-semibold mb-4 text-center text-[var(--primary-color)]">
        Current Work
      </h2>

      <TechnicianWorkStatus workStatus={workStatus} />

      <div style={{ height: 400 }} className="mb-4">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={technicianPos || clientPos || { lat: 20.59, lng: 78.96 }}
            zoom={14}
            onLoad={(map) => (mapRef.current = map)}
          >
            {technicianPos && (
              <Marker
                position={technicianPos}
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                }}
              />
            )}
            {clientPos && (
              <Marker
                position={clientPos}
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                }}
              />
            )}
            {polylinePath.length > 0 && (
              <Polyline
                path={polylinePath}
                options={{
                  strokeColor: "#1E90FF",
                  strokeOpacity: 1,
                  strokeWeight: 5,
                }}
              />
            )}
          </GoogleMap>
        ) : (
          <p className="text-center my-[10px]">Loading map...</p>
        )}
      </div>

      <div className="flex gap-3 flex-wrap mb-4 justify-center">
        {workStatus === "approved" && (
          <button
            onClick={handleStartTracking}
            className="px-6 py-2 bg-[#b13d0b] text-white rounded"
          >
            Start Tracking
          </button>
        )}

        {workStatus === "dispatch" && (
          <section className="upload-workstart text-center my-[25px]">
            <label className="flex flex-col gap-1">
              <h3 className="text-xl font-semibold text-[var(--primary-color)]">
                Upload Before Photo:
              </h3>
              <div className="upload-image p-[7px] rounded-[5px] text-[var(--primary-color)] h-[45px] shadow">
                <input
                  type="file"
                  onChange={(e) => handleUploadImage(e, "before")}
                />
              </div>
            </label>
          </section>
        )}

        {workStatus === "inprogress" && (
          <section className="upload-after text-center">
            <label className="flex flex-col gap-1">
              <h3 className="text-xl font-semibold text-[var(--primary-color)] my-[20px]">
                Upload After Photo:
              </h3>
              <div className="upload-image p-[7px] rounded-[5px] text-[var(--primary-color)] h-[45px] shadow">
                <input
                  type="file"
                  onChange={(e) => handleUploadImage(e, "after")}
                />
              </div>
            </label>
          </section>
        )}

        {workStatus === "completed" && (
          <section className="upload-payment flex gap-3 justify-center">
            <button
              onClick={() => handlePaymentReceived("cash")}
              className="px-6 py-2 bg-[var(--primary-color)] text-white rounded"
            >
              Confirm Cash Payment
            </button>
            <button
              onClick={() => handlePaymentReceived("upi")}
              className="px-6 py-2 bg-[var(--primary-color)] text-white rounded"
            >
              Confirm UPI Payment
            </button>
          </section>
        )}

        {toggleStopT && (
          <div className="stop-tracking h-[100vh] w-full bg-[#fff] fixed top-0 left-0 z-40 flex justify-center items-center">
            <p
              onClick={() => setToggleStopT(false)}
              className="absolute right-[10px] top-[20px]"
            >
              X
            </p>
            <button
              onClick={stopTracking}
              className="px-6 py-2 bg-red-500 text-white rounded"
            >
              Stop Tracking
            </button>
          </div>
        )}
      </div>
      <RaiseIssue workId={workId} />

      {message && <p className="mt-2 text-green-600 text-center">{message}</p>}
    </div>
  );
}
