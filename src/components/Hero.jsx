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
    <div className="max-w-7xl mx-auto px-4 min-h-[450px] sm:px-6 lg:px-8">
      <div className="mt-16 mb-8">
        <h1 className="text-4xl py-6 font-bold text-black">
          Find the Perfect deal, always.
        </h1>
        <p className="text-black">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit...
        </p>
      </div>
      <div className="flex items-center justify-center gap-14 bg-white rounded-lg">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInput}
            placeholder="Type city, place, or hotel name"
            className="w-[500px] border border-gray-300 pl-10 py-2 rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"
          />
          <button
            onClick={resetSearch}
            className="bg-blue-500 ml-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Reset Search
          </button>
          <ul className="hiddden absolute z-10 left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto w-[500px]">
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
        </div>
      </div>
    </div>
  );
}
Hero.propTypes = {
  setSelectedHotelName: PropTypes.func.isRequired,
};

export default Hero;
