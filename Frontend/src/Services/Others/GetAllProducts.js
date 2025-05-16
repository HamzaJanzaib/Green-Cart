import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';

export const getallproducts = async () => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.PRODUCTS, {
      method: 'GET',
      credentials: 'include', 
    });
    return data;
  } catch (error) {
    throw new Error('Failed to retrieve user address: ' + error.message);
  }
};
