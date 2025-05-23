import { useState } from "react";
import {
  ImageUploader,
  TextInput,
  SelectInput,
} from "./index";
import { addProduct } from "../../../Services/Admin/Addproducts";
import toast from "react-hot-toast";
import { useAppContext } from "../../../context/AppContext";

const MainProducts = () => {
  const [files, setFiles] = useState([null, null, null, null]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stockStatus: "true", 
    price: "",
    offerPrice: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [Loading, setLoading] = useState(false);

  const { Category } = useAppContext();
  const categoryOptions = Category.map(cat => cat.path);


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let formErrors = {};
    if (!formData.name) formErrors.name = "Product name is required";
    if (!formData.price) formErrors.price = "Price is required";
    if (!files.some((file) => file !== null)) formErrors.images = "At least one image is required";
    if (!formData.category) formErrors.category = "Category is required";

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      setLoading(false); // 🛠 Stop loading if validation fails
      return;
    }

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("category", formData.category);
    payload.append("inStock", formData.stockStatus === "true");
    payload.append("price", formData.price);
    payload.append("offerPrice", formData.offerPrice || "");
    payload.append("description", formData.description);

    // Append only valid File objects
    files.forEach((fileObj) => {
      if (fileObj && fileObj.file instanceof File) {
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
    } finally {
      setLoading(false); // ✅ Always stop loading at the end
    }
  };


  return (
    <div className="no-scrollbar py-10 flex-1 md:flex-row h-[90vh] flex overflow-y-scroll flex-col justify-between bg-[#F9FAFB]">
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
          options={categoryOptions}
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
          className="px-8 py-2.5 bg-primary hover:bg-primary-dull text-[#F9FAFB] font-medium rounded cursor-pointer"
        >
          {
            Loading ?
              <>loading....</> :
              <>  Add Product</>
          }
        </button>
      </form>

      <div className="w-[30%] mt-10 p-4 h-[80%] border rounded bg-white shadow-sm">
        <h2 className="text-xl text-primary font-semibold mb-4">Product Preview</h2>

        {/* Product Card Preview */}
        <div className="group cursor-pointer flex flex-col gap-2">
          {/* Image */}
          <div className="flex gap-2 flex-wrap items-center justify-center px-2">
            <img
              className="group-hover:scale-105 transition max-w-18 md:max-w-18 h-25 object-contain rounded"
              src={
                files[0]?.file instanceof File
                  ? URL.createObjectURL(files[0].file)
                  : "https://via.placeholder.com/150"
              }
            />
            <img
              className="group-hover:scale-105 transition max-w-18 md:max-w-18 h-25 object-contain rounded"
              src={
                files[1]?.file instanceof File
                  ? URL.createObjectURL(files[1].file)
                  : "https://via.placeholder.com/150"
              }
            />
            <img
              className="group-hover:scale-105 transition max-w-18 md:max-w-18 h-25 object-contain rounded"
              src={
                files[2]?.file instanceof File
                  ? URL.createObjectURL(files[2].file)
                  : "https://via.placeholder.com/150"
              }
            />
            <img
              className="group-hover:scale-105 transition max-w-18 md:max-w-18 h-25 object-contain rounded"
              src={
                files[3]?.file instanceof File
                  ? URL.createObjectURL(files[3].file)
                  : "https://via.placeholder.com/150"
              }
            />
          </div>

          {/* Product Info */}
          <div className="text-gray-500/60 text-sm text-left">
            <p>{formData.category || "Category"}</p>

            <p className="text-gray-700 font-medium text-lg truncate w-full">
              {formData.name || "Product Name"}
            </p>

            {/* Mock Star Rating */}
            <div className="flex items-center gap-1 my-1">
              {Array(5).fill("").map((_, i) => (
                <img
                  key={i}
                  className="w-3.5 h-3.5"
                  src={i < 4
                    ? "https://upload.wikimedia.org/wikipedia/commons/4/44/Plain_Yellow_Star.png"
                    : "https://upload.wikimedia.org/wikipedia/commons/1/18/Five-pointed_star.svg"}
                  alt="star"
                />
              ))}
              <p className="ml-1 text-xs">(4)</p>
            </div>

            {/* Price */}
            <div className="flex items-end justify-between mt-3">
              <p className="md:text-xl text-base font-medium text-primary">
                ${formData.offerPrice || "00.00"}{" "}
                <span className="text-gray-500/60 md:text-sm text-xs line-through">
                  ${formData.price || "00.00"}
                </span>
              </p>
            </div>

            {/* Description */}
            <p className="text-sm mt-2 line-clamp-3">
              {formData.description || "Product description goes here..."}
            </p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default MainProducts;