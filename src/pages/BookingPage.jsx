import BookingComponent from "../components/BookingComponent";
import Navbar from "../components/Navbar";
import Rooms from "../components/Rooms";

const BookingPage = () => {
  return (
    <div>
      <Navbar />
      <BookingComponent />
      <Rooms details={"Explore Rooms"}/>
    </div>
  );
};

export default BookingPage;
