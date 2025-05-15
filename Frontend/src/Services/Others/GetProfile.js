import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';

export const getProfile = async () => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.GETPROFILE, {
      method: 'GET', 
      credentials: 'include', 
    });

    return data;
  } catch (error) {
    throw new Error('Failed to retrieve user orders: ' + error.message);
  }
};
