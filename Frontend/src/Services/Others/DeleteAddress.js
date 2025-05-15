import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';

export const deleteAddress = async (addressId) => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.DELETEADDRESS(addressId), {
      method: 'DELETE',
      credentials: 'include',
    });

    return data;
  } catch (error) {
    throw new Error('Address deletion failed: ' + error.message);
  }
};
