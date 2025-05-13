const SelectInput = ({ id, label, value, onChange, options = [] }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-base font-medium">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="border rounded border-gray-400/80 p-3 bg-white focus:outline-none"
      >
        <option value="">Select a {label}</option>
        {console.log(options)}
        {options.length > 0 ? (
          options.map((option, index) => (
            <option key={index} value={option}>
              {option} {/* or change to option.text if the structure differs */}
            </option>
          ))
        ) : (
          <option disabled>No options available</option>
        )}
      </select>
    </div>
  );
};

export default SelectInput;
