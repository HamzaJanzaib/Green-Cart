import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';

export const addCategoryAdmin = async (categoryData) => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.ADMINADDCATEGORY, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(categoryData),
    });

    return data;
  } catch (error) {
    throw new Error('Category addition failed: ' + error.message);
  }
};
