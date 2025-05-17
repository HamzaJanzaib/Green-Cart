import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';

export const placeOrderByCOD = async (orderData) => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.PLACEORDERBYCOD, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body: JSON.stringify(orderData), 
    });

    return data; // returns success message or the order details
  } catch (error) {
    throw new Error('Order placement failed: ' + error.message);
  }
};
