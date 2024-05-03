import React, { useState, useEffect, useContext } from "react";
import AddCurrentLocation from "../components/AddCurrentLocation";
import UpdateCurrentLocation from "../components/UpdateCurrentLocation";
import AuthContext from "../AuthContext";

function Inventory() {
  const [showCurrentLocationModal, setShowCurrentLocationModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateCurrentLocation, setUpdateCurrentLocation] = useState({});
  const [currentLocations, setAllCurrentLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchCurrentLocationData();
  }, [updatePage]);

  const fetchCurrentLocationData = () => {
    fetch(`http://localhost:4000/api/currentlocation/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllCurrentLocations(data);
      })
      .catch((err) => console.log(err));
  };

  const fetchSearchData = () => {
    fetch(`http://localhost:4000/api/currentlocation/search?searchTerm=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setAllCurrentLocations(data);
      })
      .catch((err) => console.log(err));
  };

  const addCurrentLocationModalSetting = () => {
    setShowCurrentLocationModal(!showCurrentLocationModal);
  };

  const updateCurrentLocationModalSetting = (selectedCurrentLocationData) => {
    setUpdateCurrentLocation(selectedCurrentLocationData);
    setShowUpdateModal(!showUpdateModal);
  };

  const deleteCurrentLocation = (id) => {
    fetch(`http://localhost:4000/api/currentlocation/delete/${id}`)
      .then((response) => response.json())
      .then(() => {
        setUpdatePage(!updatePage);
      })
      .catch((err) => console.log(err));
  };

  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    fetchSearchData();
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        {showCurrentLocationModal && (
          <AddCurrentLocation
            addCurrentLocationModalSetting={addCurrentLocationModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}
        {showUpdateModal && (
          <UpdateCurrentLocation
            updateCurrentLocationData={updateCurrentLocation}
            updateModalSetting={updateCurrentLocationModalSetting}
          />
        )}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Current Location</span>
              <div className="flex justify-center items-center px-2 border-2 rounded-md ">
                <img
                  alt="search-icon"
                  className="w-5 h-5"
                  src={require("../assets/search-icon.png")}
                />
                <input
                  className="border-none outline-none focus:border-none text-xs"
                  type="text"
                  placeholder="Search here"
                  value={searchTerm}
                  onChange={handleSearchTerm}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addCurrentLocationModalSetting}
              >
                Add Current Location
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Current Location
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  More
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentLocations.map((element) => (
                <tr key={element._id}>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.currentLocationName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <span
                      className="text-green-700 cursor-pointer"
                      onClick={() => updateCurrentLocationModalSetting(element)}
                    >
                      Edit
                    </span>
                    <span
                      className="text-red-600 px-2 cursor-pointer"
                      onClick={() => deleteCurrentLocation(element._id)}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
