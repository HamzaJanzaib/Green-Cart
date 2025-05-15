import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';

export const updateCategoryAdmin = async (id, categoryData) => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.ADMINUPDATECATEGORY(id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body: JSON.stringify(categoryData),
    });

    return data;
  } catch (error) {
    throw new Error('Category update failed: ' + error.message);
  }
};
