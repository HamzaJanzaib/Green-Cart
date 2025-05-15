import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';

export const logoutAdmin = async () => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.ADMINLOGOUT, {
      method: 'GET',
      credentials: 'include', // ensures cookie is sent for session logout
    });

    return data;
  } catch (error) {
    throw new Error('Admin logout failed: ' + error.message);
  }
};
