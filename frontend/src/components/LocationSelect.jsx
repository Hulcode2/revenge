const LocationSelect = ({ location, setLocation }) => {
  return (
    <div className="flex flex-col gap-2 min-w-[220px]">
      <label className="font-semibold text-lg flex items-center gap-1">
        Pickup Location
      </label>

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="outline-none text-gray-500 bg-transparent cursor-pointer"
      >
        <option value="">Please select location</option>
        <option value="Cairo">Cairo</option>
        <option value="Alexandria">Alexandria</option>
        <option value="Giza">Giza</option>
        <option value="Mansoura">Mansoura</option>
        <option value="Tanta">Tanta</option>
      </select>
    </div>
  );
};

export default LocationSelect;
