import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';


export const registerUser = async (userData) => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // for cookie/session-based auth
      body: JSON.stringify(userData),
    });

    return data;
  } catch (error) {
    throw new Error('Registration failed: ' + error.message);
  }
};