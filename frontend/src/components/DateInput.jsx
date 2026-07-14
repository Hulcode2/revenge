const DateInput = ({ label, name, onChange, value }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-lg">{label}</label>

      <input
        type="date"
        name={name}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="outline-none text-gray-500"
      />
    </div>
  );
};

export default DateInput;
