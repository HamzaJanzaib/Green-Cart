import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';

export const updateProduct = async ({id, payload}) => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.ADMINUPDATEPRODUCTS(id), {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body: JSON.stringify(payload),
    });

    return data; 
  } catch (error) {
    throw new Error('Product update failed: ' + error.message);
  }
};
