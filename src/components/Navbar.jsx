import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          {/* Hamburger Menu for Mobile */}
          <button
            onClick={toggleSidebar}
            className="sm:hidden text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 mr-2"
          >
            <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
              />
            </svg>
          </button>
          <Link to="/">
            <img
              className="h-8 w-auto"
              src="https://raw.githubusercontent.com/gocomet-india/frontend-hotel-assignment/286ebfc6c07d6a38969da05b673b21be6e89eab3/book-my-hotel-logo.svg"
              alt="BookMyHotel Logo"
            />
          </Link>
        </div>
        <div
          className={`fixed inset-0 bg-white bg-opacity-75 z-50 p-5 transform ease-in-out duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:relative sm:translate-x-0 sm:bg-transparent sm:p-0`}
        >
          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row items-center sm:justify-center text-center sm:text-left">
            <Link
              to="/"
              className="text-gray-900 px-3 py-2 sm:px-10 text-lg font-medium hover:text-gray-400"
              onClick={() => setIsSidebarOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/hotels"
              className="text-gray-900 px-3 py-2 sm:px-10 text-lg font-medium hover:text-gray-400"
              onClick={() => setIsSidebarOpen(false)}
            >
              Hotels
            </Link>
            <Link
              to="/places"
              className="text-gray-900 px-3 py-2 sm:px-10 text-lg font-medium hover:text-gray-400"
              onClick={() => setIsSidebarOpen(false)}
            >
              Places
            </Link>
            <Link
              to="/signin"
              className="mt-4 sm:mt-0 sm:ml-4 bg-blue-400 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsSidebarOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
        {/* Close Menu Button on Mobile */}
        <button
          onClick={toggleSidebar}
          className={`absolute top-5 right-5 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 z-50 ${
            isSidebarOpen ? "block" : "hidden"
          } sm:hidden`}
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
