import React, { useState } from 'react'
import InputFeild from './InputFeild';

const ModifymodifyAddress = ({ onCancel, onConfirm , Details }) => {
    const [modifyAddress, setModifyAddress] = useState({
        firstName: Details?.firstName || "",
        lastName: Details?.lastName || "",
        email: Details?.email || "",
        street: Details?.street || "",
        city: Details?.city || "",
        state: Details?.state || "",
        zipcode: Details?.zipcode || "",
        country: Details?.country || "",
        phone: Details?.phoneNumber || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setModifyAddress((prevModifyAddress) => ({
            ...prevModifyAddress,
            [name]: value
        }))
    }

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center bg-white shadow-md rounded-xl py-8 px-6 md:w-[460px] w-[370px] border border-gray-300"
        >
            <h1 className="text-lg font-semibold mb-5 text-primary">Modify modifyAddress</h1>
            <form className="w-full flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <InputFeild handlechange={handleChange} details={modifyAddress.firstName} name="firstName" type="text" placeholder="First Name" />
                    <InputFeild handlechange={handleChange} details={modifyAddress.lastName} name="lastName" type="text" placeholder="Last Name" />
                </div>
                <InputFeild handlechange={handleChange} details={modifyAddress.email} name="email" type="email" placeholder="Email" />
                <InputFeild handlechange={handleChange} details={modifyAddress.phone} name="phone" type="text" placeholder="Phone Number" />
                <InputFeild handlechange={handleChange} details={modifyAddress.street} name="street" type="text" placeholder="Street modifyAddress" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputFeild handlechange={handleChange} details={modifyAddress.city} name="city" type="text" placeholder="City" />
                    <InputFeild handlechange={handleChange} details={modifyAddress.state} name="state" type="text" placeholder="State" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputFeild handlechange={handleChange} details={modifyAddress.zipcode} name="zipcode" type="text" placeholder="Zip Code" />
                    <InputFeild handlechange={handleChange} details={modifyAddress.country} name="country" type="text" placeholder="Country" />
                </div>
            </form>
            <div className="flex items-center justify-center gap-4 mt-6 w-full">
                <button
                    type="button"
                    className=" cursor-pointer w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className=" cursor-pointer w-full md:w-36 h-10 rounded-md text-white bg-primary hover:bg-primary-dull font-medium text-sm  active:scale-95 transition"
                    onClick={onConfirm}
                >
                    Modify modifyAddress
                </button>
            </div>
        </div>
    )
}

export default ModifymodifyAddress