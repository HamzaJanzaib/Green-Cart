import { AddressModel } from "../models/Index.js"

// Controller For addAddress
export const addAddress = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { firstName, lastName, email, street, city, state, zipcode, country, phoneNumber } = req.body;

    // Validate the input data
    if (!userId || !firstName || !lastName || !email || !street || !city || !state || !zipcode || !country || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }

    const newAddress = new AddressModel({
      userId,
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipcode,
      country,
      phoneNumber,
    });

    const savedAddress = await newAddress.save();

    res.status(201).json({
      success: true,
      message: 'Address added successfully',
      data: savedAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add address',
      error: error.message,
    });
  }
};
//----------------------- Controller For addAddress end

// Controller For getAddress
export const getAddress = async (req, res) => {
  try {
    const userId = req.user?.id;
    const address = await AddressModel.findOne({ userId });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found for this user',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Address retrieved successfully',
      data: address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch address',
      error: error.message,
    });
  }
};

//----------------------- Controller For getAddress end

// Controller For updateAddress
export const updateAddress = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { addressId, firstName, lastName, email, street, city, state, zipcode, country, phoneNumber } = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: 'User ID and Address ID are required',
      });
    }

    // Find the address by userId and addressId
    const address = await AddressModel.findOne({ _id: addressId, userId });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found',
      });
    }
    address.firstName = firstName || address.firstName;
    address.lastName = lastName || address.lastName;
    address.email = email || address.email;
    address.street = street || address.street;
    address.city = city || address.city;
    address.state = state || address.state;
    address.zipcode = zipcode || address.zipcode;
    address.country = country || address.country;
    address.phoneNumber = phoneNumber || address.phoneNumber;

    const updatedAddress = await address.save();

    res.status(200).json({
      success: true,
      message: 'Address updated successfully',
      data: updatedAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update address',
      error: error.message,
    });
  }
};
//----------------------- Controller For updateAddress end

// Controller For deleteAddress
export const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const userId = req.user?.id;
    // Find and delete the address by userId and addressId
    const deletedAddress = await AddressModel.findOneAndDelete({ userId, _id: addressId });

    if (!deletedAddress) {
      return res.status(404).json({
        success: false,
        message: 'Address not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Address deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete address',
      error: error.message,
    });
  }
};
//----------------------- Controller For deleteAddress end