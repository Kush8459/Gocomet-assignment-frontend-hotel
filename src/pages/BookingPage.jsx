import BookingComponent from "../components/BookingComponent";
import Navbar from "../components/Navbar";
import Rooms from "../components/Rooms";
import FeedbackModal from "../components/FeedbackModal";
import { useState } from "react";

const BookingPage = () => {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState("success");

  return (
    <div>
      <Navbar />
      <BookingComponent
        setFeedbackMessage={setFeedbackMessage}
        setShowFeedback={setShowFeedback}
        setFeedbackType={setFeedbackType}
      />
      <Rooms details={"Explore Rooms"} />
      {showFeedback && (
        <FeedbackModal
          message={feedbackMessage}
          setShowFeedback={setShowFeedback}
          type={feedbackType}
        />
      )}
    </div>
  );
};

export default BookingPage;
