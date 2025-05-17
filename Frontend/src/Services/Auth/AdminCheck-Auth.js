import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';

export const checkAuthAdmin = async () => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.ADMINCHECK_AUTH, {
      method: 'GET',
      credentials: "include",
    });

    return data;
  } catch (error) {
    throw new Error('Admin authentication failed: ' + error.message);
  }
};
