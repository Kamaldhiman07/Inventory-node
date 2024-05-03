import React, { useState, useEffect, useContext } from "react";
import AddGrade from "../components/AddGrade";
import UpdateGrade from "../components/UpdateGrade";
import AuthContext from "../AuthContext";

function Inventory() {
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateGrade, setUpdateGrade] = useState([]);
  const [grades, setAllGrades] = useState([]); // Changed from 'models' to 'grades'
  const [searchTerm, setSearchTerm] = useState("");
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchGradeData();
  }, [updatePage]);

  const fetchGradeData = () => {
    fetch(`http://localhost:4000/api/grade/get/${authContext.user}`) // Changed from 'model' to 'grade'
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllGrades(data); // Changed from 'models' to 'grades'
      })
      .catch((err) => console.log(err));
  };

  const fetchSearchData = () => {
    fetch(`http://localhost:4000/api/grade/search?searchTerm=${searchTerm}`) // Changed from 'model' to 'grade'
      .then((response) => response.json())
      .then((data) => {
        setAllGrades(data); // Changed from 'models' to 'grades'
      })
      .catch((err) => console.log(err));
  };

  const addGradeModalSetting = () => {
    setShowGradeModal(!showGradeModal);
  };

  const updateGradeModalSetting = (selectedGradeData) => {
    setUpdateGrade(selectedGradeData);
    setShowUpdateModal(!showUpdateModal);
  };

  const deleteItem = (id) => {
    fetch(`http://localhost:4000/api/grade/delete/${id}`) // Changed from 'model' to 'grade'
      .then((response) => response.json())
      .then((data) => {
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
        {showGradeModal && (
          <AddGrade
            addGradeModalSetting={addGradeModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}
        {showUpdateModal && (
          <UpdateGrade
            updateGradeData={updateGrade}
            updateModalSetting={updateGradeModalSetting}
          />
        )}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Grade</span> {/* Changed from 'Model' to 'Grade' */}
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
                onClick={addGradeModalSetting}
              >
                Add Grade
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Grade {/* Changed from 'Model' to 'Grade' */}
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  More
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {grades.map((element, index) => {
                return (
                  <tr key={element._id}>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.gradeName} {/* Changed from 'modelName' to 'gradeName' */}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <span
                        className="text-green-700 cursor-pointer"
                        onClick={() => updateGradeModalSetting(element)}
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
