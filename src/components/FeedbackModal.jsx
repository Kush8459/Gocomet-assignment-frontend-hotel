import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function FeedbackModal({ message, setShowFeedback, type }) {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handler = () => {
    setIsVisible(false);
    setTimeout(setShowFeedback(false), 300);
    if (type === "success") {
      navigate(`/`);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full border border-gray-200 transform transition-all duration-300">
        <h2
          className={`text-lg font-bold mb-4 ${
            type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {type === "success" ? "Success!" : "Error!"}
        </h2>
        <p className="mb-4 text-gray-700">{message}</p>
        <button
          onClick={handler}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
}

FeedbackModal.propTypes = {
  message: PropTypes.string.isRequired,
  setShowFeedback: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["success", "error"]),
};

export default FeedbackModal;
