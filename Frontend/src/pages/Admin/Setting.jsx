import { useState } from "react";
import { useAppContext } from "../../context/AppContext";

const Setting = () => {
  const { AdminDetails } = useAppContext();
  const [admin, setAdmin] = useState({
    name: AdminDetails?.fullname,
    phone: AdminDetails?.phone,
    email: AdminDetails?.email,
  });

  const [websiteSettings, setWebsiteSettings] = useState({
    currency: "USD",
    controlEmail: "",
  });

  const handleAdminChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleWebsiteChange = (e) => {
    setWebsiteSettings({ ...websiteSettings, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
 
  };

  return (
    <div className="max-w-4xl h-screen mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-primary">E-commerce Settings</h1>

      {/* Admin Section */}
      <div className="bg-white p-6 rounded shadow mb-8 border">
        <h2 className="text-xl font-semibold mb-4">Admin Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            type="text"
            value={admin.name}
            onChange={handleAdminChange}
            placeholder="Admin Name"
            className="p-3 border-gray-400 border rounded w-full"
          />
          <input
            name="phone"
            type="text"
            value={admin.phone}
            onChange={handleAdminChange}
            placeholder="Phone Number"
            className="p-3 border border-gray-400 rounded w-full"
          />
          <input
            name="email"
            type="email"
            value={admin.email}
            onChange={handleAdminChange}
            placeholder="Admin Email"
            className="p-3 border border-gray-400 rounded w-full md:col-span-2"
          />
        </div>
      </div>

      {/* Website Settings */}
      <div className="bg-white p-6 rounded shadow border">
        <h2 className="text-xl font-semibold mb-4">Website Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="currency"
            value={websiteSettings.currency}
            onChange={handleWebsiteChange}
            className="p-3 border border-gray-400 rounded w-full"
          >
            <option value="PKR">RS (Rupees)</option>
            <option value="$">USD (Dollars)</option>
            <option value="£">GBP (Pound)</option>
            <option value="€">EUR (Euro)</option>
          </select>

          <input
            name="controlEmail"
            type="email"
            value={websiteSettings.controlEmail}
            onChange={handleWebsiteChange}
            placeholder="Controller Email"
            className="p-3 border border-gray-400 rounded w-full"
          />


        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 text-right">
        <button
          onClick={handleSave}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Setting;
