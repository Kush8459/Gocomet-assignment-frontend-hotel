import { useState } from "react";
import ExploreHotels from "../components/ExploreHotels";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import FeedbackModal from "../components/FeedbackModal";

function Home() {
  const [selectedHotelName, setSelectedHotelName] = useState("");

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState("success");

  return (
    <div>
      <Navbar />
      <Hero
        setSelectedHotelName={setSelectedHotelName}
        setFeedbackMessage={setFeedbackMessage}
        setShowFeedback={setShowFeedback}
        setFeedbackType={setFeedbackType}
        showFeedback={showFeedback}
      />{" "}
      <div className="">
        <ExploreHotels selectedHotelName={selectedHotelName} />
      </div>
      {showFeedback && (
        <FeedbackModal
          message={feedbackMessage}
          setShowFeedback={setShowFeedback}
          type={feedbackType}
        />
      )}
    </div>
  );
}

export default Home;
