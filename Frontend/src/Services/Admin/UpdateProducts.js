import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';

export const updateProductAdmin = async (id, productData) => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.ADMINUPDATEPRODUCTS(id), {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body: JSON.stringify(productData),
    });

    return data; 
  } catch (error) {
    throw new Error('Product update failed: ' + error.message);
  }
};
