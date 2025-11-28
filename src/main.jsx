import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MyProvider } from "./context/MyContext";
import { BookingProvider } from "./context/BookingContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MyProvider>
      <BookingProvider>
        <App />
      </BookingProvider>
    </MyProvider>
  </React.StrictMode>

  
);
