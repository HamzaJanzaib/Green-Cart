import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';

export const deleteCategoryAdmin = async (id) => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.ADMINDELETECATEGORY(id), {
      method: 'DELETE',
      credentials: 'include', 
    });

    return data;
  } catch (error) {
    throw new Error('Category deletion failed: ' + error.message);
  }
};
