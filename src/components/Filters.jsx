import PropTypes from "prop-types";
import { useState } from "react";

function Filters({ setFilters }) {
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const cities = [
    "Mumbai",
    "Delhi",
    "Bengaluru",
    "Kolkata",
    "Chennai",
    "Goa",
    "Jaipur",
    "Agra",
    "Pune",
    "Ahmedabad",
  ];
  const priceRanges = [
    { label: "Under ₹1,000", value: "1000" },
    { label: "₹1,000 to ₹2,000", value: "2000" },
    { label: "₹2,000 to ₹3,000", value: "3000" },
    { label: "₹3,000 to ₹4,000", value: "4000" },
    { label: "₹4,000 to ₹5,000", value: "5000" },
    { label: "Over ₹5,000", value: "5500" },
  ];
  const ratings = [1, 2, 3, 4, 5];

  const handleCitySelection = (city) => {
    const newCities = selectedCities.includes(city)
      ? selectedCities.filter((c) => c !== city)
      : [...selectedCities, city];
    setSelectedCities(newCities);
    setFilters((filters) => ({ ...filters, cities: newCities }));
  };

  const handlePriceSelection = (price) => {
    const newPrices = selectedPrices.includes(price)
      ? selectedPrices.filter((p) => p !== price)
      : [...selectedPrices, price];
    setSelectedPrices(newPrices);
    setFilters((filters) => ({ ...filters, prices: newPrices }));
  };

  const handleRatingSelection = (rating) => {
    const newRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter((r) => r !== rating)
      : [...selectedRatings, rating];
    setSelectedRatings(newRatings);
    setFilters((filters) => ({ ...filters, ratings: newRatings }));
  };

  const resetFilters = () => {
    setSelectedCities([]);
    setSelectedPrices([]);
    setSelectedRatings([]);
    setFilters({ cities: [], prices: [], ratings: [] });
  };

  return (
    <div>
      <button
        onClick={toggleFilters}
        className="sm:hidden bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      <div
        className={`p-4 bg-white rounded shadow w-full ${
          showFilters ? "block" : "hidden sm:block"
        }`}
      >
        <h4 className="font-bold mb-2">Filters</h4>
        <div className="mb-4">
          <label className="block mb-1">City:</label>
          {cities.map((city) => (
            <div key={city}>
              <input
                type="checkbox"
                id={city}
                checked={selectedCities.includes(city)}
                onChange={() => handleCitySelection(city)}
              />
              <label className="ml-2" htmlFor={city}>
                {city}
              </label>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Price Range:</label>
          {priceRanges.map((range) => (
            <div key={range.value}>
              <input
                type="checkbox"
                id={range.value}
                checked={selectedPrices.includes(range.value)}
                onChange={() => handlePriceSelection(range.value)}
              />
              <label className="ml-2" htmlFor={range.value}>
                {range.label}
              </label>
            </div>
          ))}
        </div>
        <div>
          <label className="block mb-1">Rating:</label>
          {ratings.map((rating) => (
            <div key={rating}>
              <input
                type="checkbox"
                id={`rating-${rating}`}
                checked={selectedRatings.includes(rating)}
                onChange={() => handleRatingSelection(rating)}
              />
              <label className="ml-2" htmlFor={`rating-${rating}`}>
                {rating} Star{rating > 1 ? "s" : ""}
              </label>
            </div>
          ))}
        </div>
        <button
          onClick={resetFilters}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}

Filters.propTypes = {
  setFilters: PropTypes.func.isRequired,
};

export default Filters;
