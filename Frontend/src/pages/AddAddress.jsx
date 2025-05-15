import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { InputFeild } from '../Components/Client/Index'
import toast from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';
import { addAddress } from '../Services/Others/AddAddress';

const AddAddress = () => {
    const [address, setAddress] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });
    const { navigate } = useAppContext();
    const [loading, setloading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value
        }))
    }

    const handleAddressSubmit = async (e) => {
        e.preventDefault();

        // Simple validation
        if (
            !address.firstName ||
            !address.lastName ||
            !address.email ||
            !address.street ||
            !address.city ||
            !address.state ||
            !address.zipcode ||
            !address.country ||
            !address.phone
        ) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            setloading(true);

            const AddressDetails = {
                firstName: address.firstName,
                lastName: address.lastName,
                email: address.email,
                street: address.street,
                city: address.city,
                state: address.state,
                zipcode: address.zipcode,
                country: address.country,
                phoneNumber: address.phone,
            };

            const data = await addAddress(AddressDetails);
            console.log(data);

            if (data.success) {
                toast.success(data.message || "Address saved successfully!");
                navigate("/profile");
            } else {
                toast.error(data?.message || "Address submission failed.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setloading(false);
        }
    };


    return (
        <div className='mt-16 pb-16'>
            <p className='text-2xl md:text-3xl text-gray-500'>
                Add Shipping <span className='text-primary font-semibold'>Address</span>
            </p>
            <div className='flex flex-col-reverse md:flex-row justify-between mt-20'>
                <form onSubmit={handleAddressSubmit} className='space-y-4 mt-6 text-sm w-full md:w-2/5'>
                    <div className='grid grid-cols-2 gap-4'>
                        <InputFeild handlechange={handleChange} address={address} name="firstName" type="text" placeholder="First Name" />
                        <InputFeild handlechange={handleChange} address={address} name="lastName" type="text" placeholder="Last Name" />
                    </div>
                    <InputFeild handlechange={handleChange} address={address} name="email" type="email" placeholder="Email" />
                    <InputFeild handlechange={handleChange} address={address} name="phone" type="text" placeholder="Phone Number" />
                    <InputFeild handlechange={handleChange} address={address} name="street" type="text" placeholder="Street Address" />
                    <div className='grid grid-cols-2 gap-4'>
                        <InputFeild handlechange={handleChange} address={address} name="city" type="text" placeholder="City" />
                        <InputFeild handlechange={handleChange} address={address} name="state" type="text" placeholder="State" />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <InputFeild handlechange={handleChange} address={address} name="zipcode" type="text" placeholder="Zip Code" />
                        <InputFeild handlechange={handleChange} address={address} name="country" type="text" placeholder="Country" />
                    </div>
                    <button type="submit" className='mt-4 bg-primary hover:bg-primary-dull text-white py-2 px-6 rounded'>
                        {
                            loading ? <>loading...</> : <>Save Address</>
                        }

                    </button>
                </form>

                <img src={assets.add_address_iamge} alt="Add-Address" className='md:mr-16 mb-16 md:mt-0 max-w-xs' />
            </div>
        </div>
    )
}

export default AddAddress
