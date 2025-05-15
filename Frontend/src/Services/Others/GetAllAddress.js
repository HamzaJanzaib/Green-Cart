import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';

export const getAddress = async () => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.GETUSERADDRESS, {
      method: 'GET',
      credentials: 'include', 
    });
    return data;
  } catch (error) {
    throw new Error('Failed to retrieve user address: ' + error.message);
  }
};
