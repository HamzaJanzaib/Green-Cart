import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import ProductCard from '../Components/Client/ProductCard';

const ProductsCategory = () => {
    const { Products , Category } = useAppContext();
    const { category } = useParams();

    const SearchCategory = Category.find(
        (item) => item?.path?.toLowerCase() === category?.toLowerCase()
    );

    const filterProducts = Products.filter(
        (product) =>
            product?.category?.path?.toLowerCase() === category?.toLowerCase()
    );

    return (
        <div>
            {SearchCategory && (
                <div className="mt-16 flex flex-col container mx-auto px-4">
                    {/* Category Title */}
                    <div className="flex flex-col items-end w-max mb-8">
                        <p className="text-2xl font-medium uppercase md:font-bold">
                            {SearchCategory.text}
                        </p>
                        <div className="w-16 h-0.5 bg-primary rounded-full" />
                    </div>

                    {/* Product Grid */}
                    {filterProducts.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mt-6">
                            {filterProducts.map((product) => (
                                <ProductCard key={product._id} Product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-[60vh]">
                            <p className="text-2xl font-bold text-pretty">
                                No Products Found In this Category.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductsCategory;
