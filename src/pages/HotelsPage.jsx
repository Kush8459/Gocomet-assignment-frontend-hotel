import Navbar from "../components/Navbar";
import ExploreHotels from "../components/ExploreHotels";

const HotelsPage = () => {
  return (
    <div>
      <Navbar />
      <ExploreHotels selectedHotelName={""} />
    </div>
  );
};

export default HotelsPage;
