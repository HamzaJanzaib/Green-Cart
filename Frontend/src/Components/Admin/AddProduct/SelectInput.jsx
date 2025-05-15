const SelectInput = ({ id, label, value, onChange, options = [] }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-base font-medium">{label}</label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="border rounded p-3 border-gray-400/80 bg-[#F9FAFB] focus:outline-none"
      >
        <option value="" disabled>Select {label}</option>
        {options.map((option, index) => {
          if (typeof option === "string") {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          } else {
            return (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
};

export default SelectInput;
