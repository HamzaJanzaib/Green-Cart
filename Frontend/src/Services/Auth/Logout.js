import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';

export const logoutUser = async () => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.LOGOUT, {
      method: 'POST',
      credentials: 'include', // important for cookie-based auth
    });

    return data;
  } catch (error) {
    throw new Error('Logout failed: ' + error.message);
  }
};