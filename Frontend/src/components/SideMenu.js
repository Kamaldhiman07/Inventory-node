import React from "react";
import { Link } from "react-router-dom";

function SideMenu() {
  const localStorageData = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="h-full flex-col justify-between  bg-white hidden lg:flex ">
      <div className="px-4 py-6">
        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700"
          >
            <img
              alt="dashboard-icon"
              src={require("../assets/dashboard-icon.png")}
            />
            <span className="text-sm font-medium"> Dashboard </span>
          </Link>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/inventory">
                <div className="flex items-center gap-2">
                  <img
                    alt="inventory-icon"
                    src={require("../assets/supplier-icon.png")}
                  />
                  <span className="text-sm font-medium"> Client </span>
                </div>
              </Link>
            </summary>
          </details>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/inventory">
                <div className="flex items-center gap-2">
                  <img
                    alt="inventory-icon"
                    src={require("../assets/supplier-icon.png")}
                  />
                  <span className="text-sm font-medium"> Calendar </span>
                </div>
              </Link>
            </summary>
          </details>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/inventory">
                <div className="flex items-center gap-2">
                  <img
                    alt="inventory-icon"
                    src={require("../assets/supplier-icon.png")}
                  />
                  <span className="text-sm font-medium"> Collections </span>
                </div>
              </Link>
            </summary>
          </details>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/inventory">
                <div className="flex items-center gap-2">
                  <img
                    alt="inventory-icon"
                    src={require("../assets/inventory-icon.png")}
                  />
                  <span className="text-sm font-medium"> Inventory </span>
                </div>
              </Link>
            </summary>
          </details>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/user-register">
                <div className="flex items-center gap-2">
                  <img
                    alt="inventory-icon"
                    src={require("../assets/supplier-icon.png")}
                  />
                  <span className="text-sm font-medium"> Users </span>
                </div>
              </Link>
            </summary>
          </details>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <div className="flex items-center gap-2">
                <img
                  alt="inventory-icon"
                  src={require("../assets/inventory-icon.png")}
                />
                <span className="text-sm font-medium"> Settings </span>
              </div>
            </summary>
            <nav className="ml-4 mt-2 flex flex-col space-y-1">
              <Link
                to="/menu1"
                className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                <span className="text-sm font-medium">Devices</span>
              </Link>
              <Link
                to="/menu2"
                className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                <span className="text-sm font-medium">Make</span>
              </Link>
              <Link
                to="/menu2"
                className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                <span className="text-sm font-medium">Recovered Material</span>
              </Link>
              <Link
                to="/menu2"
                className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                <span className="text-sm font-medium">Unrecovered Material</span>
              </Link>
              <Link
                to="/menu2"
                className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                <span className="text-sm font-medium">Model</span>
              </Link>
              <Link
                to="/menu2"
                className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                <span className="text-sm font-medium">Operating System</span>
              </Link>
              <Link
                to="/menu2"
                className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                <span className="text-sm font-medium">Grade</span>
              </Link>
              <Link
                to="/menu2"
                className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                <span className="text-sm font-medium">Condition</span>
              </Link>
              <Link
                to="/menu2"
                className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                <span className="text-sm font-medium">Current Loaction</span>
              </Link>
            </nav>
          </details>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <div className="flex items-center gap-2">
                <img
                  alt="inventory-icon"
                  src={require("../assets/inventory-icon.png")}
                />
                <span className="text-sm font-medium"> Certificates </span>
              </div>
            </summary>
            <nav className="ml-4 mt-2 flex flex-col space-y-1">
              <Link
                to="/menu1"
                className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                <span className="text-sm font-medium">View Certificates</span>
              </Link>
              <Link
                to="/menu2"
                className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                <span className="text-sm font-medium">Generate Certificates</span>
              </Link>
              <Link
                to="/menu2"
                className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                <span className="text-sm font-medium">Manage Certificates</span>
              </Link>
            </nav>
          </details>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <div className="flex items-center gap-2">
                <img
                  alt="inventory-icon"
                  src={require("../assets/inventory-icon.png")}
                />
                <span className="text-sm font-medium"> Report </span>
              </div>
            </summary>
            <nav className="ml-4 mt-2 flex flex-col space-y-1">
              <Link
                to="/menu1"
                className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                <span className="text-sm font-medium">Client Report</span>
              </Link>
              <Link
                to="/menu2"
                className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                <span className="text-sm font-medium">Weight Report</span>
              </Link>
            </nav>
          </details>

          {/* <Link
            to="/purchase-details"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <img
              alt="purchase-icon"
              src={require("../assets/supplier-icon.png")}
            />
            <span className="text-sm font-medium"> Purchase Details</span>
          </Link>
          <Link
            to="/sales"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <img alt="sale-icon" src={require("../assets/supplier-icon.png")} />
            <span className="text-sm font-medium"> Sales</span>
          </Link> */}

          {/* <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/manage-store">
                <div className="flex items-center gap-2">
                  <img
                    alt="store-icon"
                    src={require("../assets/order-icon.png")}
                  />
                  <span className="text-sm font-medium"> Manage Store </span>
                </div>
              </Link>
            </summary>
          </details> */}
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <div className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
          <img
            alt="Profile"
            src={localStorageData.imageUrl}
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <p className="text-xs">
              <strong className="block font-medium">
                {localStorageData.firstName + " " + localStorageData.lastName}
              </strong>

              <span> {localStorageData.email} </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
