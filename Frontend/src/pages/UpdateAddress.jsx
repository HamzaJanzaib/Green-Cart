import AddressCard from '../Components/Client/AddressCard'
import { useAppContext } from './../context/AppContext';

const UpdateAddress = () => {
    const { userAddress } = useAppContext();
    console.log(userAddress);

    return (
        <div className='p-4'>
            <h1 className='text-lg font-semibold'>Update Address</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2'>
                {userAddress.map((address, index) => (
                    <AddressCard key={index} Details={address} />
                ))}
            </div>
        </div>
    )
}

export default UpdateAddress