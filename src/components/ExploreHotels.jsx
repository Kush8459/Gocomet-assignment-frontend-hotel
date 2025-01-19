/* eslint-disable react-hooks/exhaustive-deps */
// ExploreHotels.jsx
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Filters from "./Filters";
import Pagination from "./Pagination";
import Sort from "./Sort";
import HotelCard from "./HotelCard";

function ExploreHotels({ selectedHotelName }) {
  const [allHotels, setAllHotels] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    cities: [],
    prices: [],
    ratings: [],
  });
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(
          `https://www.gocomet.com/api/assignment/hotels?page=1&size=1000` // Assuming you fetch all initially for simplicity
        );
        const data = await response.json();
        if (data.success && data.hotels) {
          let processedHotels = applyFiltersAndSort(data.hotels);
          setAllHotels(processedHotels); // Store all filtered and sorted data
          setTotalPages(Math.ceil(processedHotels.length / 6)); // Assume 6 hotels per page
          paginateHotels(processedHotels, 1); // Initial pagination to page 1
        }
      } catch (error) {
        console.error("Failed to fetch hotel details:", error);
      }
    };

    fetchHotelDetails();
  }, [filters, sortOption, selectedHotelName]);

  useEffect(() => {
    paginateHotels(allHotels, currentPage);
  }, [currentPage, allHotels]);

  const paginateHotels = (hotels, page) => {
    const startIndex = (page - 1) * 6; // 6 is the number of items per page
    const paginatedHotels = hotels.slice(startIndex, startIndex + 6);
    setHotelData(paginatedHotels);
  };

  const applyFiltersAndSort = (hotels) => {
    let filteredHotels = hotels;

    if (selectedHotelName) {
      filteredHotels = filteredHotels.filter(
        (hotel) => hotel.name.toLowerCase() === selectedHotelName.toLowerCase()
      );
    }

    // Update filters to handle multiple selections
    if (filters.cities.length > 0) {
      filteredHotels = filteredHotels.filter((hotel) =>
        filters.cities.includes(hotel.city)
      );
    }

    // Example assuming price is a range filter
    if (filters.prices.length > 0) {
      filteredHotels = filteredHotels.filter((hotel) =>
        filters.prices.some((price) =>
          hotel.rooms.some((room) => room.price <= parseInt(price, 10))
        )
      );
    }

    if (filters.ratings.length > 0) {
      filteredHotels = filteredHotels.filter((hotel) =>
        filters.ratings.includes(Math.round(hotel.rating))
      );
    }

    filteredHotels = applySort(filteredHotels, sortOption);
    return filteredHotels;
  };

  const applySort = (hotels, sortOption) => {
    switch (sortOption) {
      case "price_low_high":
        return hotels.sort((a, b) => a.rooms[0].price - b.rooms[0].price);
      case "price_high_low":
        return hotels.sort((a, b) => b.rooms[0].price - a.rooms[0].price);
      case "rating_low_high":
        return hotels.sort((a, b) => a.rating - b.rating);
      case "rating_high_low":
        return hotels.sort((a, b) => b.rating - a.rating);
      default:
        return hotels;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-10">
      <div>
        <h3 className="text-3xl font-medium text-center mb-4">
          Explore Hotels
        </h3>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-[290px] p-4">
          <Filters setFilters={setFilters} />
        </div>
        <div className="w-full">
          <Sort setSortOption={setSortOption} />
          {hotelData.length > 0 ? (
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
              {hotelData.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <h4 className="text-xl text-gray-500">No hotels available.</h4>
            </div>
          )}
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}

ExploreHotels.propTypes = {
  selectedHotelName: PropTypes.string,
};

export default ExploreHotels;
