import { useEffect, useState } from "react";
import "./App.css";
import AllRoutes from "./components/AllRoutes";

let token = JSON.parse(localStorage.getItem("user"));

function App() {
  return (
    <div className="App">
      <AllRoutes />
    </div>
  );
}

export default App;
