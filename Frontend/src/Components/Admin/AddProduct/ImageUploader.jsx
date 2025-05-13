const ImageUploader = ({ images, setImages }) => {
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updated = [...images];
      updated[index] = {
        file,
        preview: URL.createObjectURL(file),
      };
      setImages(updated);
    }
  };

  const removeImage = (index) => {
    const updated = [...images];
    updated[index] = null;
    setImages(updated);
  };

  return (
    <div>
      <p className="text-base font-medium">Product Images</p>
      <div className="flex flex-wrap items-center gap-3 mt-2">
        {images.map((img, index) => (
          <label key={index} htmlFor={`image${index}`} className="relative group">
            <input
              type="file"
              accept="image/*"
              id={`image${index}`}
              hidden
              onChange={(e) => handleImageChange(e, index)}
            />
            <img
              src={
                img?.preview ||
                "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
              }
              className="w-24 h-24 object-cover border rounded cursor-pointer"
              alt="upload"
            />
            {img && (
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-black bg-opacity-60 text-white text-xs px-1 rounded opacity-0 group-hover:opacity-100"
              >
                ✕
              </button>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
