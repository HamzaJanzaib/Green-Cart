import { UserModel } from "../models/Index.js";

// contoller for updatecart
export const UpdateCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { cartItems } = req.body;


    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { cartItems },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      cartItems: user.cartItems,
    });
  } catch (error) {
    console.error("UpdateCart Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};