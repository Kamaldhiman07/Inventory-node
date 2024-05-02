import React, { useState, useEffect, useContext } from "react";
import AddModel from "../components/AddModel"; // Correct import statement
import UpdateModel from "../components/UpdateModel"; // Correct import statement
import AuthContext from "../AuthContext";

function Inventory() {
  const [showModelModal, setShowModelModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateModel, setUpdateModel] = useState([]);
  const [Models, setAllModel] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchModelData();
  }, [updatePage]);

  const fetchModelData = () => {
    fetch(`http://localhost:4000/api/model/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllModel(data);
      })
      .catch((err) => console.log(err));
  };

  const fetchSearchData = () => {
    fetch(`http://localhost:4000/api/model/search?searchTerm=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setAllModel(data);
      })
      .catch((err) => console.log(err));
  };

  const addModelModalSetting = () => {
    setShowModelModal(!showModelModal);
  };

  const updateModelModalSetting = (selectedModelData) => {
    setUpdateModel(selectedModelData);
    setShowUpdateModal(!showUpdateModal);
  };

  const deleteItem = (id) => {
    fetch(`http://localhost:4000/api/model/delete/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUpdatePage(!updatePage);
      });
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
        {showModelModal && (
          <AddModel
            addModelModalSetting={addModelModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}
        {showUpdateModal && (
          <UpdateModel
            updateModelData={updateModel}
            updateModalSetting={updateModelModalSetting}
          />
        )}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Model</span>
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
                onClick={addModelModalSetting}
              >
                Add Model
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Model
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  More
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Models.map((element, index) => {
                return (
                  <tr key={element._id}>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <span
                        className="text-green-700 cursor-pointer"
                        onClick={() => updateModelModalSetting(element)}
                      >
                        Edit
                      </span>
                      <span
                        className="text-red-600 px-2 cursor-pointer"
                        onClick={() => deleteItem(element._id)}
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
