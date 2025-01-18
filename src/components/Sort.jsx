import PropTypes from "prop-types";

function Sort({ setSortOption }) {
  return (
    <div className="p-4">
      <select
        className="border border-gray-300 rounded-lg p-2"
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="">Sort by </option>
        <option value="price_low_high">Price: Low to High</option>
        <option value="price_high_low">Price: High to Low</option>
        <option value="rating_low_high">Rating: Low to High</option>
        <option value="rating_high_low">Rating: High to Low</option>
      </select>
    </div>
  );
}

Sort.propTypes = {
  setSortOption: PropTypes.func.isRequired,
};

export default Sort;
