import { useState } from "react";
import ExploreHotels from "../components/ExploreHotels";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

function Home() {
  const [selectedHotelName, setSelectedHotelName] = useState("");

  return (
    <div>
      <Navbar />
      <Hero setSelectedHotelName={setSelectedHotelName} />{" "}
      <div className="">
        <ExploreHotels selectedHotelName={selectedHotelName} />
      </div>
    </div>
  );
}

export default Home;
