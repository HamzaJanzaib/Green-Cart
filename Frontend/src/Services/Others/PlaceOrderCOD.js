import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';

export const placeOrderByCOD = async (orderData) => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.PLACEORDERBYCOD, {
      method: 'POST', // Use POST for placing a new order
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // ensures cookies are sent for session validation
      body: JSON.stringify(orderData), // include the order data (items, address, etc.)
    });

    return data; // returns success message or the order details
  } catch (error) {
    throw new Error('Order placement failed: ' + error.message);
  }
};
