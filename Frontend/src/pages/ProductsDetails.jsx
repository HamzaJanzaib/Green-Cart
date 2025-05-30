import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../Components/Client/ProductCard';

const ProductsDetails = () => {
    const {
        Products,
        currency,
        addToCart,
        navigate
    } = useAppContext();

    const { id } = useParams();
    const [RelatedProducts, setRelatedProducts] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);

    const product = Products.find((item) => item._id === id);

    useEffect(() => {
        if (product && Products.length > 0) {
            const productsCopy = Products.filter(
                (item) => item.category._id === product.category._id && item._id !== product._id
            );
            setRelatedProducts(productsCopy.slice(0, 5));
        }
    }, [Products, product]);

    useEffect(() => {
        setThumbnail(product?.image?.[0] || null);
    }, [product]);

    return product && (
        <>
            <div className="mt-12">
                <p className="text-sm text-gray-600">
                    <Link to={"/"}>Home</Link> /
                    <Link to={"/products"}> Products</Link> /
                    <Link to={`/products/${product.category.path.toLowerCase()}`}> {product.category.text}</Link> /
                    <span className="text-primary"> {product.name}</span>
                </p>

                <div className="flex flex-col md:flex-row gap-16 mt-4">
                    {/* Images */}
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-3">
                            {product.image.map((image, index) => (
                                <div
                                    key={index}
                                    onClick={() => setThumbnail(image)}
                                    className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                                >
                                    <img src={image} alt={`Thumbnail ${index + 1}`} />
                                </div>
                            ))}
                        </div>

                        <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                            <img src={thumbnail} alt="Selected product" />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="text-sm w-full md:w-1/2">
                        <h1 className="text-3xl font-medium">{product.name}</h1>

                        <div className="flex items-center gap-0.5 mt-1">
                            {Array(5).fill('').map((_, i) => (
                                <img
                                    key={i}
                                    className="md:w-3.5 w-3"
                                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                                    alt={`star-${i}`}
                                />
                            ))}
                            <p>(4)</p>
                        </div>

                        <div className="mt-6">
                            <p className="text-gray-500/70 line-through">MRP: {currency}{product.price}</p>
                            <p className="text-2xl font-medium">MRP: {currency}{product.offerPrice}</p>
                            <span className="text-gray-500/70">(inclusive of all taxes)</span>
                        </div>

                        <p className="text-base font-medium mt-6">About product</p>
                        <ul className="list-disc ml-4 text-gray-500/70">
                            {product.description.map((desc, index) => (
                                <li key={index}>{desc}</li>
                            ))}
                        </ul>

                        <div className="flex items-center mt-10 gap-4 text-base">
                            <button
                                onClick={() => addToCart(product._id)}
                                className="w-full py-3.5 font-medium bg-gray-100 text-primary hover:bg-gray-200 transition"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={() => {
                                    addToCart(product._id);
                                    navigate("/cart");
                                }}
                                className="w-full py-3.5 font-medium bg-primary text-white hover:bg-primary-dull transition"
                            >
                                Buy now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {RelatedProducts.length > 0 && (
                    <div className="mt-20">
                        <div className="flex flex-col items-center mb-8">
                            <h2 className="text-2xl font-bold uppercase">More in {product.category.text}</h2>
                            <div className="w-20 h-0.5 bg-primary rounded-full mt-2" />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                            {RelatedProducts.filter(prod => prod.inStock).map((prod) => (
                                <ProductCard key={prod._id} Product={prod} />
                            ))}
                        </div>

                        <div className="flex justify-center mt-8">
                            <button
                                onClick={() => navigate(`/products/${product.category.text.toLowerCase()}`)}
                                className="px-8 py-2.5 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
                            >
                                View All {product.category.text}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductsDetails;
