import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HotelsPage from "./pages/HotelsPage";
import HotelPage from "./pages/HotelPage";
import BookingPage from "./pages/BookingPage";
import useScrollToTop from "./components/useScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/hotels/:id" element={<HotelPage />} />
        <Route path="/hotels/:id/:roomName" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
function ScrollToTop() {
  useScrollToTop();
  return null;
}

export default App;
