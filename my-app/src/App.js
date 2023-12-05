import React, { useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Header from "./Components/Header";
import CrispChat from "./Components/Online chat service";
import MapPage from "./Components/body";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Footer from "./Components/footer";

function App() {
  const [displayName, setDisplayName] = useState(
    "لطفا وارد حساب کاربری تان شوید!"
  );
  return (
    <BrowserRouter>
      <Header setDisplayName={setDisplayName} displayName={displayName} />
      <Routes>
        <Route exact path="/" element={<MapPage />} />

        <Route
          path="/register"
          element={
            <Register
              setDisplayName={setDisplayName}
              displayName={displayName}
            />
          }
        />

        <Route
          path="/login"
          element={
            <Login setDisplayName={setDisplayName} displayName={displayName} />
          }
        />
      </Routes>
      <CrispChat />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
