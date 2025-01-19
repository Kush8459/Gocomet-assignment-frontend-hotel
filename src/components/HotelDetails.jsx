import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function HotelDetails() {
  const { id } = useParams();
  const [hotelDetails, setHotelDetails] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(
          `https://www.gocomet.com/api/assignment/hotels/${id}`
        );
        const data = await response.json();
        if (data.success) {
          setHotelDetails(data.hotel);
        }
      } catch (error) {
        console.error("Failed to fetch hotel details:", error);
      }
    };

    fetchHotelDetails();
  }, [id]);

  if (!hotelDetails) {
    return <div></div>;
  }

  return (
    <div
      className="relative text-white flex flex-col justify-center items-center h-[350px] bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${hotelDetails.image_url})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>{" "}
      <div className="z-10 flex flex-col items-center justify-center">
        <div>
          <h1 className="text-4xl ml-2 font-semibold">{hotelDetails.name}</h1>
        </div>
        <div className="flex items-center justify-center gap-5 mt-3">
          <p className="text-lg font-md">📍 {hotelDetails.city}, India</p>
          <p className="text-lg font-md">{hotelDetails.rating} ★</p>
        </div>
      </div>
    </div>
  );
}

export default HotelDetails;
