import { useState } from "react";
import {
  ImageUploader,
  TextInput,
  SelectInput,
} from "./index";
import { addProduct } from "../../../Services/Admin/Addproducts";
import toast from "react-hot-toast";

const MainProducts = () => {
  const [files, setFiles] = useState([null, null, null, null]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stockStatus: "true", // "true" = In Stock, "false" = Out of Stock
    price: "",
    offerPrice: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};
    if (!formData.name) formErrors.name = "Product name is required";
    if (!formData.price) formErrors.price = "Price is required";
    if (!files.some((file) => file !== null)) formErrors.images = "At least one image is required";
    if (!formData.category) formErrors.category = "Category is required";

    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("category", formData.category);
    payload.append("inStock", formData.stockStatus === "true");
    payload.append("price", formData.price);
    payload.append("offerPrice", formData.offerPrice || "");
    payload.append("description", formData.description);

    // Append only valid File objects
    files.forEach((fileObj, index) => {
      if (fileObj && fileObj.file instanceof File) {
        console.log(`File ${index}:`, fileObj.file.name);
        payload.append("files", fileObj.file);
      }
    });

    try {
      const data = await addProduct(payload);

      if (data.success) {
        toast.success("Product added successfully!");
        setFormData({
          name: "",
          category: "",
          stockStatus: "true",
          price: "",
          offerPrice: "",
          description: "",
        });
        setFiles([null, null, null, null]);
      } else {
        toast.error(data.message || "Failed to add product.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the product.");
    }
  };

  return (
    <div className="no-scrollbar py-10 flex-1 h-[90vh] flex overflow-y-scroll flex-col justify-between bg-[#F9FAFB]">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-xl">
        {/* Image Upload */}
        <ImageUploader images={files} setImages={setFiles} />
        {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}

        {/* Product Name */}
        <TextInput
          id="name"
          label="Product Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        {/* Category */}
        <SelectInput
          id="category"
          label="Category"
          value={formData.category}
          onChange={handleChange}
          options={["Vegetables", "Instant", "Fruits", "Dairy", "Bakery", "Grains"]}
        />
        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

        {/* Stock Status */}
        <SelectInput
          id="stockStatus"
          label="Stock Status"
          value={formData.stockStatus}
          onChange={handleChange}
          options={[
            { label: "In Stock", value: "true" },
            { label: "Out of Stock", value: "false" },
          ]}
        />

        {/* Price and Offer Price */}
        <div className="flex items-center gap-5 flex-wrap">
          <TextInput
            id="price"
            label="Product Price"
            value={formData.price}
            onChange={handleChange}
            type="number"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}

          <TextInput
            id="offerPrice"
            label="Offer Price (optional)"
            value={formData.offerPrice}
            onChange={handleChange}
            type="number"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-base font-medium">Product Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="border rounded p-3 border-gray-400/80 bg-[#F9FAFB] min-h-[150px] focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-8 py-2.5 bg-primary hover:bg-primary-dull text-[#F9FAFB] font-medium rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default MainProducts;
