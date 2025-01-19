import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Hero({ setSelectedHotelName }) {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchHotelNames = async () => {
      try {
        const response = await fetch(
          "https://www.gocomet.com/api/assignment/hotels-name"
        );
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Failed to fetch hotel names:", error);
      }
    };
    fetchHotelNames();
  }, [searchInput]);

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
    if (event.target.value.length > 0) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (hotelName) => {
    setSearchInput(hotelName);
    setSelectedHotelName(hotelName);
    setSuggestions([]);
  };

  const resetSearch = () => {
    setSearchInput("");
    setSelectedHotelName("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[450px]">
      <div className="text-center my-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
          Find the Perfect deal, always.
        </h1>
        <p className="hidden sm:block">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit...
        </p>
      </div>
      <div className="bg-white rounded-lg p-4">
        <div className="relative">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"
          />
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInput}
            placeholder="Type hotel name"
            className="w-full pl-10 pr-20 py-2 border-2 rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={resetSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md"
          >
            Reset Search
          </button>
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-[365px] md:w-96 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() => handleSelect(suggestion.name)}
                >
                  {suggestion.name} ({suggestion.city})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
Hero.propTypes = {
  setSelectedHotelName: PropTypes.func.isRequired,
};

export default Hero;
