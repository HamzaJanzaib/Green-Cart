import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { changeProductStockAdmin } from '../../Services/Admin/ChangeStock';
import toast from 'react-hot-toast';
import { VerifactionMode } from '../../Components/Admin';
import { deleteProduct } from '../../Services/Admin/Deleteproducts';

const Products = () => {
  const { Products, currency, getAllProducts } = useAppContext();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const itemsPerPage = 10;

  const toggleStock = async (id, inStock) => {
    try {
      const data = await changeProductStockAdmin(id, inStock);
      if (data.success) {
        getAllProducts();
        toast.success(data.message || "Stock updated successfully!");
      } else {
        toast.error(data.message || "Failed to update stock.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update stock.");
    }
  }
  console.log(productToDelete);

  const handleDelete = async () => {
    if (!productToDelete) return;
    console.log(productToDelete);
    try {
      const data = await deleteProduct(productToDelete);
      if (data.success) {
        getAllProducts();
        toast.success(data.message || "Product deleted successfully!");
        setShowDeleteModal(false);
      } else {
        toast.error(data.message || "Failed to delete product.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete product.");
    }
  };

  // Get unique categories from populated category objects
  const uniqueCategories = [
    ...new Map(
      Products.map(p => [p.category?._id, p.category])
    ).values()
  ];

  // Filter products based on search, selected category (_id), and stock status
  const filteredProducts = Products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory ? product.category?._id === selectedCategory : true) &&
    (!inStockOnly || product.inStock)
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
      <div className="no-scrolbar py-10 flex-1 h-[95vh] flex overflow-y-scroll flex-col justify-between bg-[#F9FAFB]">
        <div className="flex-1 flex flex-col bg-[#F9FAFB]">
          <div className="w-full md:p-10 p-4">
            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 flex-wrap">
              <div>
                <p className="text-xl md:text-2xl font-semibold uppercase">All Products</p>
                <div className="w-16 h-0.5 bg-primary rounded-full mt-1" />
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="border p-2 rounded-md w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />

                <select
                  className="border p-2 rounded-md"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">All Categories</option>
                  {uniqueCategories.map((category) => (
                    <option key={category?._id} value={category?._id}>
                      {category?.text}
                    </option>
                  ))}
                </select>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => {
                      setInStockOnly(e.target.checked);
                      setCurrentPage(1);
                    }}
                  />
                  In Stock Only
                </label>
              </div>
            </div>

            {/* Table with scrollable container */}
            <div className="w-full overflow-auto rounded-md border border-gray-300 bg-[#F9FAFB] max-h-[60vh]">
              <table className="w-full table-auto min-w-[600px]">
                <thead className="text-gray-900 text-sm bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Product</th>
                    <th className="px-4 py-3 text-left font-semibold">Category</th>
                    <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">Selling Price</th>
                    <th className="px-4 py-3 text-left font-semibold">In Stock</th>
                    <th className="px-4 py-3 text-left font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700 divide-y divide-gray-200">
                  {currentProducts.length ? currentProducts.map((product, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 flex items-center gap-3">
                        <div className="relative group w-14 h-14 flex-shrink-0 border border-gray-300 rounded overflow-hidden">
                          <img
                            src={product.image[0]}
                            alt="Product"
                            className="w-full h-full object-cover"
                          />
                          <div
                            className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer"
                            onClick={() => navigate(`/products/${product.category?.text.toLowerCase()}/${product._id}`)}
                          >
                            <FaEye className="text-[#F9FAFB] text-lg" />
                          </div>
                        </div>
                        <span className="truncate max-w-[120px] md:max-w-none">{product.name}</span>
                      </td>
                      <td className="px-4 py-3 truncate max-w-[100px]">{product.category?.text || 'Uncategorized'}</td>
                      <td className="px-4 py-3 hidden md:table-cell">{currency}{product.offerPrice}</td>
                      <td className="px-4 py-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={product.inStock} onChange={() => toggleStock(product._id, !product.inStock)} />
                          <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-primary transition" />
                          <span className="dot absolute left-1 top-1 w-5 h-5 bg-[#F9FAFB] rounded-full transition-transform peer-checked:translate-x-5" />
                        </label>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-4">
                          <span className="text-green-600 hover:text-green-800 cursor-pointer text-[18px]">
                            <FaEdit />
                          </span>
                          <span onClick={() => {
                            setProductToDelete(product._id);
                            setShowDeleteModal(true);
                          }}
                            className=" text-red-500 hover:text-red-700 cursor-pointer text-[18px]">
                            <FaTrash />
                          </span>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="px-4 py-5 text-center text-gray-400">
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 text-gray-500 mt-6 flex-wrap">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="mr-4 flex items-center gap-1 disabled:opacity-50"
                >
                  <svg width="23" height="23" fill="none" viewBox="0 0 23 23">
                    <path d="M5.75 12.5h11.5m-11.5 0 4.792-4.791M5.75 12.5l4.792 4.792" stroke="#4fbf8b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Previous</span>
                </button>

                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i + 1)}
                      className={`w-9 h-9 md:w-12 md:h-12 rounded-md ${currentPage === i + 1
                        ? 'bg-primary text-[#F9FAFB]'
                        : 'hover:bg-gray-200'
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="ml-4 flex items-center gap-1 disabled:opacity-50"
                >
                  <span>Next</span>
                  <svg width="23" height="23" fill="none" viewBox="0 0 23 23">
                    <path d="M17.25 11.5H5.75m11.5 0-4.792-4.79m4.792 4.79-4.792 4.792" stroke="#4fbf8b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed flex items-center justify-center inset-0 z-50"  onClick={() => setShowDeleteModal(false)}>
          <VerifactionMode
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
          />
        </div>
      )}
    </>
  );
};

export default Products;
