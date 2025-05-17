import { OrderModel, ProductModel } from "../models/Index.js";


// Controller For placeOrderCod
export const placeOrderCod = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { items, address , GrandTotal  } = req.body;

    if (!address || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid data',
      });
    }

    // Calculate total amount
    let amount = 0;

    for (const item of items) {
      const product = await ProductModel.findById(item.product);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.product}`,
        });
      }
      amount += product.offerPrice * item.quantity;
    }

    // Add 2% tax or charges
    const tax = Math.floor(amount * 0.02);
    const totalAmount = amount + tax;

    // Create order
    await OrderModel.create({
      userId,
      items,
      amount: totalAmount,
      address,
      paymentType: 'cod',
      isPaid: false,
      GrandTotal,
    });

    return res.status(200).json({
      success: true,
      message: 'Order Placed Successfully',
    });

  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to place order',
      error: error.message,
    });
  }
};
//------------------------------ Controller For placeOrderCod end

// Controller For getUserOrders
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    const orders = await OrderModel.find({ userId })
      .populate('items.product')
      .populate('address')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message,
    });
  }
};
//------------------------------ Controller For getUserOrders end

// Controller For getAllOrders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate('userId', 'fullname email')
      .populate('items.product', 'name offerPrice')
      .populate('address')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch all orders',
      error: error.message,
    });
  }
};
//------------------------------ Controller For getAllOrders end
