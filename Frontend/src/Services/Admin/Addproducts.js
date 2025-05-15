import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';

export const addProduct = async (productData) => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.ADMINADDPRODUCTS, {
      method: 'POST',
      credentials: 'include', 
      body: productData, 
    });
    return data; 
  } catch (error) {
    throw new Error('Product addition failed: ' + error.message);
  }
};

