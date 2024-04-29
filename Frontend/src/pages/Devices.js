import React, { useState, useEffect, useContext } from "react";
import AddClient from "../components/AddDevices"; // Adjust import path as needed
import UpdateClient from "../components/UpdateClient"; // Adjust import path as needed
import AuthContext from "../AuthContext";

function Devices() {
  const [showClientModal, setShowClientModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateClient, setUpdateClient] = useState({});
  const [clients, setAllClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchClientsData();
  }, [updatePage]);

  // const fetchClientsData = () => {
  //   fetch(`http://localhost:4000/api/device/getAll/${authContext.user}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ userId: authContext.user }),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setAllClients(data);
  //     })
  //     .catch((err) => console.error('Error fetching clients:', err));
  // };
  const fetchClientsData = () => {
    fetch(`http://localhost:4000/api/device/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllClients(data);
      })
      .catch((err) => console.log(err));
  };

  const fetchSearchData = (searchTerm) => {
    fetch(`http://localhost:4000/api/searchUser?searchTerm=${searchTerm}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setAllClients(data);
      })
      .catch((err) => console.error('Error fetching search data:', err));
  };
  

  const addClientModalSetting = () => {
    setShowClientModal(!showClientModal);
  };

  const updateClientModalSetting = (selectedClientData) => {
    setUpdateClient(selectedClientData);
    setShowUpdateModal(!showUpdateModal);
  };

  const deleteClient = (id) => {
    fetch(`http://localhost:4000/api/clients/delete/${id}`, {
      method: "DELETE",
    })
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
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">

        {showClientModal && (
          <AddClient
            addClientModalSetting={addClientModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}
        {showUpdateModal && (
          <UpdateClient
            updateClientData={updateClient}
            updateModalSetting={updateClientModalSetting}
          />
        )}

        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Devices</span>
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
                onClick={addClientModalSetting}
              >
                Add Devices
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Devices
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Action
                </th>
                {/* <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Email
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Code
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Logo
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Phone
                </th>                 */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {clients.map((client) => (
                <tr key={client.id}>
                  <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                    {client.devicename}
                  </td>
                  
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <span
                      className="text-green-700 cursor-pointer"
                      onClick={() => updateClientModalSetting(client)}
                    >
                      Edit
                    </span>
                    <span
                      className="text-red-600 px-2 cursor-pointer"
                      onClick={() => deleteClient(client.id)}
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

export default Devices;