import { useEffect, useState, useRef, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";

const MAP_LIBRARIES = ["geometry"];

const containerStyle = { width: "100%", height: "400px" };

// FIXED — EXACT SAME decode logic as TechCurrentOrder
const decodePolyline = (encoded) => {
  if (!window.google?.maps?.geometry?.encoding) return [];
  try {
    return window.google.maps.geometry.encoding
      .decodePath(encoded)
      .map((p) => ({ lat: p.lat(), lng: p.lng() }));
  } catch (err) {
    console.error("Polyline decode failed:", err);
    return [];
  }
};

export default function UserMapContainer({ id }) {
  const [technician, setTechnician] = useState(null);
  const [clientCoords, setClientCoords] = useState(null);
  const [eta, setEta] = useState("Loading...");
  const [distance, setDistance] = useState("Loading...");
  const [routePath, setRoutePath] = useState([]);

  const token = localStorage.getItem("authToken");
  const mapRef = useRef(null);

  const apiUrl =
    import.meta.env.VITE_API_URL ;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: MAP_LIBRARIES,
  });

  /* ------------------------- FETCH TRACKING DATA ------------------------- */
  const fetchTrackingData = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const res = await fetch(`${apiUrl}/api/track-technician/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Tracking fetch failed");

      const data = await res.json();

      // Technician location
      if (data.technician?.coordinates) {
        const pos = data.technician.coordinates;
        setTechnician(pos);

        if (mapRef.current) mapRef.current.panTo(pos);
      }

      // Client location
      if (data.client?.coordinates) {
        setClientCoords(data.client.coordinates);
      }

      // ETA & distance
      setEta(data.eta || "N/A");
      setDistance(data.distance || "N/A");

      // POLYLINE FIXED — SAME CODE AS TechCurrentOrder
      if (data.routePolyline && window.google?.maps?.geometry) {
        const decoded = decodePolyline(data.routePolyline);
        setRoutePath(decoded);
      }
    } catch (err) {
      console.error("TRACK ERROR:", err);
    }
  }, [apiUrl, id, token, isLoaded]);


  useEffect(() => {
    if (!id || !isLoaded) return;

    fetchTrackingData();
    const interval = setInterval(fetchTrackingData, 1000);

    return () => clearInterval(interval);
  }, [id, isLoaded, fetchTrackingData]);

  if (!isLoaded) return <p className="text-center p-4">Loading map…</p>;

  return (
    <div className="UserTrackStatus my-6">
      <h1 className="text-center text-xl font-semibold mb-4 text-[30px] text-[var(--text-color)]">
        Technician Live Tracking
      </h1>
      <hr className="max-w-[370px] mb-[40px] mx-auto h-[4px] rounded-[8px] bg-[var(--primary-color)]" />

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={technician || clientCoords || { lat: 20.5937, lng: 78.9629 }}
        zoom={14}
        onLoad={(map) => (mapRef.current = map)}
      >
   
        {technician && (
          <Marker
            position={technician}
            icon={{ url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
          />
        )}

        {/* Client Marker */}
        {clientCoords && (
          <Marker
            position={clientCoords}
            icon={{ url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png" }}
          />
        )}

       
        {routePath.length > 0 && (
          <Polyline
            path={routePath}
            options={{
              strokeColor: "#1E90FF",
              strokeOpacity: 1,
              strokeWeight: 5,
            }}
          />
        )}
      </GoogleMap>

      <div className="mt-[20px] rounded-[6px] text-[var(--primary-color)] text-center max-w-[288px] shadow-[6px_4px_39px_0px_rgba(17,_12,_46,_0.15)] p-2 bg-white mx-auto ">
        <p className="shadow-[6px_4px_39px_0px_rgba(17,_12,_46,_0.15)] bg-transparent"><strong>ETA:</strong> {eta}</p>
        <p className="bg-transparent shadow-[6px_4px_39px_0px_rgba(17,_12,_46,_0.15)] "><strong>Distance:</strong> {distance}</p>
      </div>
    </div>
  );
}
