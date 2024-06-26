import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Inventory from "./pages/Inventory";
import NoPageFound from "./pages/NoPageFound";
import AuthContext from "./AuthContext";
import ProtectedWrapper from "./ProtectedWrapper";
import { useEffect, useState } from "react";
import Store from "./pages/Store";
import Sales from "./pages/Sales";
import PurchaseDetails from "./pages/PurchaseDetails";
import Devices from "./pages/Devices";
import UserRegistration from './pages/UserRegistration';
import Make from "./pages/Make";
import RecoveredMaterial from "./pages/RecoveredMaterial";
import UnrecoveredMaterial from "./pages/UnrecoveredMaterial";
import Model from "./pages/Model";
<<<<<<< HEAD
import Grade from "./pages/Grade";
import Condition from "./pages/Condition";
import CurrentLocation from "./pages/CurrentLocation";
=======
import OperatingSystem from "./pages/OperatingSystem";
>>>>>>> adadf325804e346de0edea52d090c17b6e170017

const App = () => {
  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(true);
  let myLoginUser = JSON.parse(localStorage.getItem("user"));
  // console.log("USER: ",user)

  useEffect(() => {
    if (myLoginUser) {
      setUser(myLoginUser._id);
      setLoader(false);
      // console.log("inside effect", myLoginUser)
    } else {
      setUser("");
      setLoader(false);
    }
  }, [myLoginUser]);

  const signin = (newUser, callback) => {
    setUser(newUser);
    callback();
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  let value = { user, signin, signout };

  if (loader)
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>LOADING...</h1>
      </div>
    );

  return (
    <AuthContext.Provider value={value}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route
            path="/"
            element={
              <ProtectedWrapper>
                <Layout />
              </ProtectedWrapper>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/collection" element={<Inventory />} />
            <Route path="/purchase-details" element={<PurchaseDetails />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/manage-store" element={<Store />} />
            <Route path="/user-register" element={<UserRegistration />} />
            <Route path="/device" element={<Devices />} />
            <Route path="/make" element={<Make />} />
            <Route path="/recovered-material" element={<RecoveredMaterial />} />
            <Route path="/unrecovered-material" element={<UnrecoveredMaterial />} />
            <Route path="/model" element={<Model />} />
<<<<<<< HEAD
            <Route path="/grade" element={<Grade />} />
            <Route path="/condition" element={<Condition />} />
            <Route path="/current-location" element={<CurrentLocation />} />
=======
            <Route path="/operatingsystem" element={<OperatingSystem />} />
            
>>>>>>> adadf325804e346de0edea52d090c17b6e170017
          </Route>
          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
