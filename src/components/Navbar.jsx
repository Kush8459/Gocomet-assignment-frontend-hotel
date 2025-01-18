import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img
                className="h-8 w-auto"
                src="https://raw.githubusercontent.com/gocomet-india/frontend-hotel-assignment/286ebfc6c07d6a38969da05b673b21be6e89eab3/book-my-hotel-logo.svg"
                alt="BookMyHotel Logo"
              />
            </Link>
          </div>
          <div className="flex items-center justify-center ml-10 p-5">
            <Link
              to="/"
              className="text-gray-900 px-10 text-lg font-medium hover:text-gray-400"
            >
              Home
            </Link>
            <Link
              to="/hotels"
              className="text-gray-900 px-10 text-lg font-medium hover:text-gray-400"
            >
              Hotels
            </Link>
            <Link
              to="/places"
              className="text-gray-900 px-10 text-lg font-medium hover:text-gray-400"
            >
              Places
            </Link>
          </div>
        </div>
        <div className="flex items-center">
          <Link
            to="/signin"
            className="text-gray-900 px-6 text-lg py-1 font-bold border bg-blue-300  rounded-md"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
