import React, { useState } from 'react'
import { VerifactionMode } from '../Admin/index'
import toast from 'react-hot-toast';
import { deleteProduct } from '../../Services/Admin/Deleteproducts';
import { useAppContext } from '../../context/AppContext';

const AddressCard = ({ Details }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [AddressToDelete, setAddressToDelete] = useState(null);
    const { getUserAddress } = useAppContext();

    const handleDelete = async () => {
        if (!AddressToDelete) return;
        try {
            const data = await deleteProduct(AddressToDelete);
            if (data.success) {
                getUserAddress();
                toast.success(data.message || "Address deleted successfully!");
                setShowDeleteModal(false);
            } else {
                toast.error(data.message || "Failed to delete Address.");
            }
        } catch (error) {
            toast.error(error.message || "Failed to delete Address.");
        }
    };

    return (
        <div className='border border-gray-300 rounded p-4'>
            <h2 className='text-lg font-semibold'>Shipping Address</h2>
            <p className='text-gray-600'>{Details?.firstName || 'N/A'} {Details?.lastName || 'N/A'}</p>
            <p className='text-gray-600'>{Details?.street || 'N/A'}</p>
            <p className='text-gray-600'>{Details?.city || 'N/A'}, {Details?.state || 'N/A'} {Details?.zipcode || 'N/A'}</p>
            <p className='text-gray-600'>{Details?.country || 'N/A'}</p>
            <p className='text-gray-600'>{Details?.phoneNumber || 'N/A'}</p>

            <div className='flex justify-end mt-4'>
                <button onClick={() => {
                    setAddressToDelete(Details._id);
                    setShowDeleteModal(true);
                }} className='bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded'>Delete</button>
            </div>

            {
                showDeleteModal && (
                    <div className="fixed flex items-center justify-center inset-0 z-50" onClick={() => setShowDeleteModal(false)}>
                        <VerifactionMode
                            onCancel={() => setShowDeleteModal(false)}
                            onConfirm={handleDelete}
                        />
                    </div>
                )
            }
        </div >
    )
}

export default AddressCard
