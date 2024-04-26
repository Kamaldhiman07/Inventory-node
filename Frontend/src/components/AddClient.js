import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import AuthContext from "../AuthContext";

export default function AddClient({
  addClientModalSetting,
  handlePageUpdate,
}) {
  const authContext = useContext(AuthContext);
  const [client, setClient] = useState({
    userId: authContext.user,
    name: "",
    contact: "",
    email: "",
    code: "",
    logo: "", // Assuming this will be an image URL
    phone: "",
    password: "",
  });

  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const handleInputChange = (key, value) => {
    setClient({ ...client, [key]: value });
  };

  // console.log(client);
  const addClient = () => {
    fetch("http://localhost:4000/api/client/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(client),
    })
      .then((result) => {
        console.log(result);
        alert("Client Added");
        handlePageUpdate();
        addClientModalSetting();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        {/* Dialog Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        {/* Dialog Content */}
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                {/* Dialog Title */}
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <PlusIcon
                        className="h-6 w-6 text-blue-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold leading-6 text-gray-900 "
                      >
                        Add Client
                      </Dialog.Title>
                      <form action="#">
                        {/* Form Fields */}
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="name"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Client Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              value={client.name}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              placeholder="Client Name"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="contact"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Client Contact
                            </label>
                            <input
                              type="text"
                              name="contact"
                              id="contact"
                              value={client.contact}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              placeholder="Client Contact"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Client Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              value={client.email}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              placeholder="Client Email"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="code"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Client Code
                            </label>
                            <input
                              type="text"
                              name="code"
                              id="code"
                              value={client.code}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              placeholder="Client Code"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="logo"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Company Logo (URL)
                            </label>
                            <input
                              type="text"
                              name="logo"
                              id="logo"
                              value={client.logo}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              placeholder="Company Logo (URL)"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="phone"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Client Phone
                            </label>
                            <input
                              type="text"
                              name="phone"
                              id="phone"
                              value={client.phone}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              placeholder="Client Phone"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="password"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              name="password"
                              id="password"
                              value={client.password}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              placeholder="Password"
                              required
                            />
                          </div>
                        </div>
                        {/* Form Buttons */}
                        <div className="flex items-center space-x-4">
                        <button
                            type="button"
                            className="text-black bg-success-500 hover:bg-success-600 focus:ring-4 focus:outline-none focus:ring-success-300 font-medium rounded-lg text-sm px-5 py-2.5"
                            onClick={addClient}
                          >
                            Add Client
                          </button>
                          <button
                            type="button"
                            className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                            onClick={() => addClientModalSetting()}
                            ref={cancelButtonRef}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
