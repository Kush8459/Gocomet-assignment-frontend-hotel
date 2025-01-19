import PropTypes from "prop-types";

// Pagination Component
function Pagination({ currentPage, setCurrentPage, totalPages }) {
  return (
    <div className="w-60 flex justify-center space-x-2  items-center mt-7 m-auto">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="p-2 bg-gray-300 border-black border rounded-md"
      >
        Prev
      </button>
      {Array.from({ length: 4 }, (_, i) => (
        <button
          key={i}
          className={`px-3 py-2 bg-gray-400 border rounded-md ${currentPage === i + 1 ? "text-white border-2 border-black bg-blue-200" : ""}`}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="p-2 bg-gray-300 border border-black rounded-md"
      >
        Next
      </button>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default Pagination;
