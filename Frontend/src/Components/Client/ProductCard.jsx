import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const ProductCard = ({ Product }) => {
    const {
        currency,
        addToCart,
        removeFromCart,
        CartItems,
        navigate
    } = useAppContext();

    return Product && (
        <div
            onClick={() => {
                navigate(`/products/${Product.category.text.toLowerCase()}/${Product._id}`);
                scrollTo(0, 0);
            }}
            className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full"
        >
            <div className="group cursor-pointer flex items-center justify-center px-2">
                <img
                    className="group-hover:scale-105 transition max-w-26 md:max-w-36"
                    src={Product.image[0]}
                    alt={Product.name}
                />
            </div>

            <div className="text-gray-500/60 text-sm">
                <p>{Product.category.text}</p> {/* ✅ Fixed: category was an object */}
                <p className="text-gray-700 font-medium text-lg truncate w-full">{Product.name}</p>

                <div className="flex items-center gap-0.5">
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

                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-primary">
                        {currency}{Product.offerPrice}{" "}
                        <span className="text-gray-500/60 md:text-sm text-xs line-through">
                            {currency}{Product.price}
                        </span>
                    </p>

                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="text-primary"
                    >
                        {!CartItems[Product._id] ? (
                            <button
                                className="flex items-center justify-center gap-1 cursor-pointer bg-primary/10 border border-primary/40 md:w-[80px] w-[64px] h-[34px] rounded text-primary font-medium"
                                onClick={() => addToCart(Product._id)}
                            >
                                <img src={assets.cart_icon} alt="cart" />
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                                <button
                                    onClick={() => removeFromCart(Product._id)}
                                    className="cursor-pointer text-md px-2 h-full"
                                >
                                    -
                                </button>
                                <span className="w-5 text-center">{CartItems[Product._id]}</span>
                                <button
                                    onClick={() => addToCart(Product._id)}
                                    className="cursor-pointer text-md px-2 h-full"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
