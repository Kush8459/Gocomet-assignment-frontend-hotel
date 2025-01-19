import HotelDetails from "../components/HotelDetails";
import Navbar from "../components/Navbar";
import Rooms from "../components/Rooms";

const HotelPage = () => {
  return (
    <div>
      <Navbar />
      <HotelDetails />
      <Rooms details="Available rooms" />
    </div>
  );
};

export default HotelPage;
