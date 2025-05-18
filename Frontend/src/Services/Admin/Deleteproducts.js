import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';

export const deleteProduct = async (id) => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.ADMINDELETEPRODUCTS(id), {
      method: 'DELETE', 
      credentials: 'include', 
    });

    return data; 
  } catch (error) {
    throw new Error('Product deletion failed: ' + error.message);
  }
};
