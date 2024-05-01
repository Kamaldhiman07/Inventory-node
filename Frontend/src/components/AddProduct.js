import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import AuthContext from "../AuthContext";

export default function AddProduct({
  addProductModalSetting,
  handlePageUpdate,
}) {
  const authContext = useContext(AuthContext);
  const [product, setProduct] = useState({
    userId: authContext.user,
    name: "",
    manufacturer: "",
    description: "",
    image: "",
    client: "",
    collected_by: "",
  });
  console.log("----", product);
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const handleInputChange = (key, value) => {
    setProduct({ ...product, [key]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });
  };

  // const addProduct = () => {
  //   // Create a FormData object to append the image file
  //   const formData = new FormData();
  //   formData.append("file", product.image);
  //   formData.append("upload_preset", "inventoryapp");

  //   // Upload image to Cloudinary
  //   fetch("https://api.cloudinary.com/v1_1/ddhayhptm/image/upload", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // Update product data with the image URL from Cloudinary
  //       setProduct({ ...product, image: data.url });

  //       // Now you can proceed to add the product with the image URL
  //       fetch("http://localhost:4000/api/product/add", {
  //         method: "POST",
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //         body: JSON.stringify(product),
  //       })
  //         .then((result) => {
  //           alert("Product ADDED");
  //           handlePageUpdate();
  //           addProductModalSetting();
  //         })
  //         .catch((err) => console.log(err));
  //     })
  //     .catch((error) => console.log(error));
  // };
  const addProduct = () => {
    const formData = new FormData();
    formData.append("file", product.image);
    formData.append("upload_preset", "inventoryapp");
  
    fetch("https://api.cloudinary.com/v1_1/ddhayhptm/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        // Update product data with the image URL from Cloudinary
        const productDataWithImage = {
          ...product,
          image: data.url,
        };
  
        // Now you can proceed to add the product with the image URL
        fetch("http://localhost:4000/api/product/add", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(productDataWithImage),
        })
          .then((result) => {
            alert("Product ADDED");
            handlePageUpdate();
            addProductModalSetting();
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => console.log(error));
  };
  
  return (
    // Modal
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
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
                        Add Collections
                      </Dialog.Title>
                      <form action="#" >
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="name"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              value={product.name}
                              onChange={(e) =>
                                handleInputChange(
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="manufacturer"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Collections Date
                            </label>
                            <input
                              type="date"
                              name="manufacturer"
                              id="manufacturer"
                              value={product.manufacturer}
                              onChange={(e) =>
                                handleInputChange(
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="client"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Client Name
                            </label>
                            <input
                              type="text"
                              name="client"
                              id="client"
                              value={product.client}
                              onChange={(e) =>
                                handleInputChange(
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="collected_by"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Collection Image
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              name="image"
                              onChange={handleImageUpload}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="collected_by"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Collected by
                            </label>
                            <input
                              type="text"
                              name="collected_by"
                              id="collected_by"
                              value={product.collected_by}
                              onChange={(e) =>
                                handleInputChange(
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label
                              htmlFor="description"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Location
                            </label>
                            <textarea
                              id="description"
                              rows="5"
                              name="description"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              value={product.description}
                              onChange={(e) =>
                                handleInputChange(
                                  e.target.name,
                                  e.target.value
                                )
                              }
                            ></textarea>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                            onClick={addProduct}
                          >
                            Add Product
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onClick={() => addProductModalSetting()}
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
