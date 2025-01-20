import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { IoPersonAdd } from "react-icons/io5";
import FeedbackModal from "./FeedbackModal";

function Hero({ setSelectedHotelName }) {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [persons, setPersons] = useState(1);
  const [typedText, setTypedText] = useState(" ");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);

  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState("success");

  const navigate = useNavigate();

  const headings = useMemo(
    () => [
      "Find the Perfect Deal.....",
      "Find the Perfect Hotel.....",
      "Find the Comfort, Wherever You Go.....",
    ],
    []
  );
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const typeEffect = () => {
      const currentHeading = headings[currentHeadingIndex];

      if (!isDeleting) {
        // Typing
        if (typedText.length < currentHeading.length) {
          setTypedText((prev) => currentHeading.slice(0, prev.length + 1));
          setTypingSpeed(100); // Normal typing speed
        } else {
          // Pause before deleting
          setIsDeleting(true);
          setTypingSpeed(2000);
        }
      } else {
        // Deleting
        if (typedText.length > 8) {
          setTypedText((prev) => prev.slice(0, -1));
          setTypingSpeed(100); // Deleting speed
        } else {
          // Move to the next heading
          setIsDeleting(false);
          setCurrentHeadingIndex((prev) => (prev + 1) % headings.length);
          setTypingSpeed(300); // Pause before typing the next heading
        }
      }
    };

    const timeout = setTimeout(typeEffect, typingSpeed);
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentHeadingIndex, typingSpeed, headings]);

  useEffect(() => {
    const fetchHotelNames = async () => {
      try {
        const response = await fetch(
          "https://www.gocomet.com/api/assignment/hotels-name"
        );
        const data = await response.json();
        setHotels(
          data.map((item) => ({
            name: item.name,
            city: item.city,
            id: item.id,
          }))
        );
        setSuggestions(data.map((item) => `${item.name} (${item.city})`));
      } catch (error) {
        console.error("Failed to fetch hotel names:", error);
      }
    };
    fetchHotelNames();
  }, []);

  const handleSearchInput = (event) => {
    console.log(event.target.value);
    setSearchInput(event.target.value);
    if (event.target.value.length > 0) {
      const filtered = hotels.filter((hotel) =>
        `${hotel.name} (${hotel.city})`
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      );
      setSuggestions(filtered.map((hotel) => `${hotel.name} (${hotel.city})`));
    } else {
      setSuggestions(hotels.map((hotel) => `${hotel.name} (${hotel.city})`));
    }
  };

  const handleSearch = async () => {
    if (!checkIn || !checkOut || !persons) {
      setFeedbackMessage("Please fill in all fields correctly.");
      setFeedbackType("error");
      setShowFeedback(true);
      return;
    }
    const selectedHotel = hotels.find(
      (hotel) => hotel.name === searchInput.split(" (")[0]
    );

    if (selectedHotel) {
      const roomResponse = await fetch(
        `https://www.gocomet.com/api/assignment/hotels/${selectedHotel.id}`
      );
      const { hotel } = await roomResponse.json();
      if (hotel.rooms.length > 0) {
        navigate(
          `/hotels/${selectedHotel.id}/${hotel.rooms[0].name
            .replace(/\s+/g, "-")
            .toLowerCase()}`,
          {
            state: { checkIn, checkOut, persons },
          }
        );
      } else {
        alert("No rooms available for the selected hotel.");
      }
    } else {
      alert("Please select a valid hotel.");
    }
  };

  const resetSearch = () => {
    setSearchInput("");
    setSelectedHotelName("");
  };

  const handleSuggestion = (suggestion) => {
    setSelectedHotelName(suggestion.split(" (")[0]);
    setSearchInput(suggestion.split(" (")[0]);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[450px]">
        <div className="flex flex-col justify-center md:items-start items-center text-center my-14">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
            {typedText}
          </h1>
          <p className="w-full md:w-[80%] text-sm md:text-lg text-center md:text-start">
            Discover the perfect stay for every occasion—whether you are
            planning a romantic getaway, a family vacation, or a solo adventure,
            explore hotels that offer unparalleled comfort, exceptional
            amenities, and exclusive deals to make your journey unforgettable.
          </p>
        </div>

        <div className="bg-white rounded-lg md:h-80 h-[600px]">
          <div className="flex justify-center items-center md:justify-start gap-5 md:gap-0 flex-col md:flex-row">
            <div className="relative">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-3.5 text-blue-500"
              />
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchInput}
                placeholder="Type hotel name"
                className="md:w-60 w-80 pl-10 pr-20 py-2 border-2 rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={resetSearch}
                className="absolute right-14 md:right-2 top-2.5 bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded-md"
              >
                Reset
              </button>
            </div>
            <div className="relative block md:hidden z-10 md:mb-0 mb-5">
              <div>
                {suggestions.length > 0 && (
                  <ul className="w-80 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                        onClick={() => handleSuggestion(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div></div>
            </div>

            <div className="md:ml-5 flex justify-between w-80 md:w-[230px] md:justify-start items-center gap-2">
              <label className="font-bold" htmlFor="">
                Check In :{" "}
              </label>
              <input
                type="date"
                placeholder="Check-in"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="form-input p-1 ml-3 md:ml-0 border-2 border-black rounded"
              />
            </div>
            <div className="md:ml-5 flex justify-between w-80 md:w-[245px] md:justify-start items-center gap-2">
              <label className="font-bold" htmlFor="">
                Check Out :{" "}
              </label>
              <input
                type="date"
                placeholder="Check-out"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="form-input p-1 rounded border-2 border-black"
              />
            </div>
            <div className="flex justify-start w-80 md:w-[130px] items-center md:ml-5">
              <IoPersonAdd className="md:my-auto" />
              <input
                type="number"
                placeholder="Number of persons"
                value={persons}
                min={1}
                onChange={(e) => setPersons(e.target.value)}
                className="w-20 form-input p-1 ml-3 md:ml-2 border-2 border-black rounded m-1"
              />
            </div>

            <button
              onClick={handleSearch}
              className="right-3 top-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold md:ml-8 py-2 px-3 w-80 md:w-40 rounded-md"
            >
              Search
            </button>
          </div>
          <div className="hidden md:block z-10">
            <div>
              {suggestions.length > 0 && (
                <ul className="w-60 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                      onClick={() => handleSuggestion(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div></div>
          </div>
        </div>
      </div>
      {showFeedback && (
        <FeedbackModal
          message={feedbackMessage}
          setShowFeedback={setShowFeedback}
          type={feedbackType}
        />
      )}
    </>
  );
}
Hero.propTypes = {
  setSelectedHotelName: PropTypes.func.isRequired,
};

export default Hero;
