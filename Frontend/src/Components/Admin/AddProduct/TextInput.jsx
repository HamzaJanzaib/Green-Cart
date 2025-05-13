const TextInput = ({ id, label, value, onChange, type = "text", required = true }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="text-base font-medium">{label}</label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder="Type here"
      className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
      required={required}
    />
  </div>
);

export default TextInput;
