import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';


export const checkAuthUser = async () => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.CHECK_AUTH, {
      method: 'GET',
      credentials: 'include', 
    });

    return data; 
  } catch (error) {
    throw new Error('Authentication failed: ' + error.message);
  }
};
