import React, { useState, useEffect, useContext } from "react";
import AddCondition from "../components/AddCondition";
import UpdateCondition from "../components/UpdateCondition";
import AuthContext from "../AuthContext";

function Inventory() {
  const [showConditionModal, setShowConditionModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateCondition, setUpdateCondition] = useState({});
  const [conditions, setAllConditions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchConditionData();
  }, [updatePage]);

  const fetchConditionData = () => {
    fetch(`http://localhost:4000/api/condition/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllConditions(data);
      })
      .catch((err) => console.log(err));
  };

  const fetchSearchData = () => {
    fetch(`http://localhost:4000/api/condition/search?searchTerm=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setAllConditions(data);
      })
      .catch((err) => console.log(err));
  };

  const addConditionModalSetting = () => {
    setShowConditionModal(!showConditionModal);
  };

  const updateConditionModalSetting = (selectedConditionData) => {
    setUpdateCondition(selectedConditionData);
    setShowUpdateModal(!showUpdateModal);
  };

  const deleteCondition = (id) => {
    fetch(`http://localhost:4000/api/condition/delete/${id}`)
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
        {showConditionModal && (
          <AddCondition
            addConditionModalSetting={addConditionModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}
        {showUpdateModal && (
          <UpdateCondition
            updateConditionData={updateCondition}
            updateModalSetting={updateConditionModalSetting}
          />
        )}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Condition</span>
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
                onClick={addConditionModalSetting}
              >
                Add Condition
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Condition
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  More
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {conditions.map((element) => (
                <tr key={element._id}>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.conditionName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <span
                      className="text-green-700 cursor-pointer"
                      onClick={() => updateConditionModalSetting(element)}
                    >
                      Edit
                    </span>
                    <span
                      className="text-red-600 px-2 cursor-pointer"
                      onClick={() => deleteCondition(element._id)}
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
