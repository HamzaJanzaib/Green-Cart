import {  useState } from "react";
import {
  ImageUploader,
  TextInput,
  SelectInput,
} from "./index";


const MainProducts = () => {
  const [images, setImages] = useState([null, null, null, null]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stockStatus: "In Stock",
    price: "",
    offerPrice: "",
    description: "",
    specifications: "",
  });
  const [errors, setErrors] = useState({}); // For form validation

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    let formErrors = {};
    if (!formData.name) formErrors.name = "Product name is required";
    if (!formData.price) formErrors.price = "Price is required";
    if (!formData.offerPrice) formErrors.offerPrice = "Offer price is required";
    if (!images.some((img) => img !== null)) formErrors.images = "At least one image is required";

    setErrors(formErrors);

    // If there are no errors, proceed with form submission
    if (Object.keys(formErrors).length === 0) {
      console.log("Product:", formData);
      console.log("Images:", images);
      alert("Product submitted (see console)");
    }

    setFormData({
      name: "",
      category: "",
      stockStatus: "In Stock",
      price: "",
      offerPrice: "",
      description: "",
      specifications: "",
    })
    setImages([null, null, null, null])
  };

  return (
    <div className="no-scrolbar py-10 flex-1 h-[90vh] flex overflow-y-scroll flex-col justify-between bg-[#F9FAFB]">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-xl">

        {/* Image Upload Section */}
        <ImageUploader images={images} setImages={setImages} />
        {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}

        {/* Product Name */}
        <TextInput
          id="name"
          label="Product Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        {/* Category Select */}
        <SelectInput
          id="category"
          label="Category"
          value={formData.category}
          onChange={handleChange}
        options={["Vegetables", "Instant", "Fruits", "Dairy", "Bakery", "Grains"]}

        />

        {/* Stock Status Select */}
        <SelectInput
          id="stockStatus"
          label="Stock Status"
          value={formData.stockStatus}
          onChange={handleChange}
          options={["In Stock", "Out of Stock"]}
        />

        <div className="flex items-center gap-5 flex-wrap">
          {/* Price */}
          <TextInput
            id="price"
            label="Product Price"
            value={formData.price}
            onChange={handleChange}
            type="number"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}

          {/* Offer Price */}
          <TextInput
            id="offerPrice"
            label="Offer Price"
            value={formData.offerPrice}
            onChange={handleChange}
            type="number"
          />
          {errors.offerPrice && <p className="text-red-500 text-sm">{errors.offerPrice}</p>}
        </div>

        {/* Description Textarea */}
        <div className="flex flex-col gap-2">
          <label className="text-base font-medium">Product Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="border rounded p-3 border-gray-400/80 bg-[#F9FAFB] min-h-[150px] focus:outline-none"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
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
