import React, { useState, useEffect, useContext } from "react";
import AddClient from "../components/AddClient"; // Adjust import path as needed
import UpdateClient from "../components/UpdateClient"; // Adjust import path as needed
import AuthContext from "../AuthContext";

function Inventory() {
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

  const fetchClientsData = () => {
    fetch(`http://localhost:4000/api/getAll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: authContext.user }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setAllClients(data);
      })
      .catch((err) => console.error('Error fetching clients:', err));
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
    fetch(`http://localhost:4000/api/deleteClient/${id}`, {
      method: "DELETE", // Change method to DELETE
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
    fetchSearchData(e.target.value);
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
              <span className="font-bold">Clients</span>
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
                Add Client
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Contact
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
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
                </th>                
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {clients.map((client) => (
                <tr key={client.id}>
                  <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                    {client.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {client.contact}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {client.email}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {client.code}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {client.logo && (
                    <img src={client.logo} alt="Company Logo" style={{ width: '70px' }} />
                  )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {client.phone}
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
                      onClick={() => deleteClient(client._id)}
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
