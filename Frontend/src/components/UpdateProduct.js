import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function UpdateProduct({
  updateProductData,
  updateModalSetting,
}) {
  const { _id, name, manufacturer, description, client, collected_by, image, images } = updateProductData;
  const [product, setProduct] = useState({
    productID: _id,
    name: name,
    manufacturer: manufacturer,
    description: description,
    client: client,
    image: image,
    collected_by: collected_by,
    images: images,
  });
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const handleInputChange = (key, value) => {
    setProduct({ ...product, [key]: value });
  };

  const handleImageUpload = (event) => {
    setProduct({ ...product, image: event.target.files[0] });
  };

  const handleImageUpload_sec = (e) => {
    const files = e.target.files;
    const imagesArray = Array.from(files);

    const uploadPromises = imagesArray.map((image) => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "inventoryapp");

      return fetch("https://api.cloudinary.com/v1_1/ddhayhptm/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => data.url);
    });

    Promise.all(uploadPromises)
      .then((imageUrls) => {
        setProduct({ ...product, images: imageUrls });
      })
      .catch((error) => console.log(error));
  };

  const updateProduct = () => {
    const formData = new FormData();

    if (product.image) {
      formData.append("file", product.image);
    }

    formData.append("upload_preset", "inventoryapp");

    fetch("https://api.cloudinary.com/v1_1/ddhayhptm/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const mainImageURL = data.url;
        const collectionImageURLs = product.images ? product.images : [];

        const productDataWithImages = {
          ...product,
          image: mainImageURL,
          images: collectionImageURLs,
        };
          // console.log(productDataWithImages);
        fetch("http://localhost:4000/api/product/update", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(productDataWithImages),
        })
          .then((result) => {
            alert("Collection Updated");
            window.location.reload()
            setOpen(false);
         
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => console.log(error));
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
        initialFocus={cancelButtonRef}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <PlusIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Update Product
                    </Dialog.Title>
                    <div className="mt-2">
                      <form>
                        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                          <div className="sm:col-span-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                              Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              value={product.name}
                              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              placeholder="Product Name"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700">
                              Manufacturer
                            </label>
                            <input
                              type="text"
                              name="manufacturer"
                              id="manufacturer"
                              value={product.manufacturer}
                              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              placeholder="Manufacturer"
                            />
                          </div>


                          <div className="sm:col-span-2">
                            <label htmlFor="client" className="block text-sm font-medium text-gray-700">
                              Client
                            </label>
                            <input
                              type="text"
                              name="client"
                              id="client"
                              value={product.client}
                              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              placeholder="Client"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label htmlFor="collected_by" className="block text-sm font-medium text-gray-700">
                              Collected By
                            </label>
                            <input
                              type="text"
                              name="collected_by"
                              id="collected_by"
                              value={product.collected_by}
                              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              placeholder="Collected By"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                              Image
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              name="image"
                              id="image"
                              onChange={handleImageUpload}
                              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                         <input type="hidden" value={product.image} id="hiddenImageInput" />


                          </div>
                          <div className="sm:col-span-2">
                            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                            Collection Images
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              name="images"
                              multiple
                              id="images"
                              onChange={handleImageUpload_sec}
                              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
<div className="flex flex-wrap justify-center gap-4">
                            {images.map((imageUrl, index) => (
                              <div key={index}>
                                <img
                                  src={imageUrl}
                                  alt={`Image ${index}`}
                                  className="max-w-xs max-h-48 object-cover rounded-lg shadow-md"
                                />
                                <input
                                  key={`input-${index}`}
                                  type="hidden"
                                  className="collections_imagess"
                                  name="collections_imagess[]"
                                  value={imageUrl}
                                />
                              </div>
                            ))}
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
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setOpen(false);
                    updateProduct();
                  }} style={{color: "black" }}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}