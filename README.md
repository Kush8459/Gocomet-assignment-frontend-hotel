# Hotel Booking Platform

A modern and responsive hotel booking web application where users can search for hotels, view details of available rooms, and make bookings. The platform includes features like search suggestions, filters, live typing headings, and dynamic redirection to booking modals.

---

## Features

- **Hero Section**:

  - Live typing animation for the main heading.
  - Search bar with autocomplete suggestions for hotel names.
  - Inputs for check-in, check-out dates, and number of guests.
  - Redirects to booking pages based on user input.

- **Explore Hotels Page**:

  - Filters for cities, price ranges, and ratings.
  - Sort options for price and rating.
  - Pagination for hotel listings.

- **Booking Page**:

  - Displays hotel and room details.
  - Validations for booking inputs (e.g., guest details, check-in/check-out dates).
  - Feedback modal for successful bookings.
  - Add or remove guest options dynamically.

- **Responsive Design**:
  - Optimized for mobile, tablet, and desktop devices.

---

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Routing**: React Router
- **Backend API**: Mock API endpoints for hotel and room details

---

## Installation and Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Kush8459/hotel-booking-platform.git
   cd hotel-booking-platform
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start the Development Server**:

   ```bash
   npm start
   ```

   The application will run on `http://localhost:5173`.

4. **Build for Production**:

   ```bash
   npm run build
   ```

   This will create a `build` folder with the production-ready files.

---

## File Structure

```
.
├── public
│   ├── index.html
│   └── ...
├── src
│   ├── components
│   │   ├── Hero.jsx
│   │   ├── ExploreHotels.jsx
│   │   ├── Filters.jsx
│   │   ├── RoomCard.jsx
│   │   ├── BookingComponent.jsx
│   │   ├── FeedbackModal.jsx
│   │   ├── Navbar.jsx
│   │   ├── Pagination.jsx
│   │   └── Sort.jsx
│   ├── App.jsx
│   ├── index.js
│   └── styles
│       ├── tailwind.css
│       └── ...
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── ...
```

---

## Key Functionalities

### Hero Section

- **Dynamic Heading**: Displays live typing animation with messages like `"Find the Perfect Deal..."`.
- **Search Suggestions**: Autocomplete for hotel names fetched from the backend API.
- **Redirection**: Redirects users to the booking page with selected hotel and room details.

### Explore Hotels Page

- **Filters**: Multi-select filters for cities, price ranges, and ratings.
- **Sorting**: Options to sort by price (low to high, high to low) or rating.
- **Pagination**: Allows users to browse through hotel listings.

### Booking Page

- **Dynamic Room Details**: Fetches and displays details of the selected room.
- **Guest Management**: Add or remove guests dynamically.
- **Form Validations**: Ensures all input fields are correctly filled before booking.
- **Feedback**: Displays a modal with success or error messages upon booking.

### Responsive Design

- **Mobile View**: Collapsible filters and optimized layouts for smaller screens.
- **Tablet/Desktop View**: Full-featured layouts with additional padding and spacing.

---

## APIs

1. **Get Hotels List**:

   ```http
   GET https://www.gocomet.com/api/assignment/hotels-name
   ```

   **Response**:

   ```json
   [
     { "id": "1", "name": "Hotel Sunshine", "city": "Delhi" },
     { "id": "2", "name": "Sea Breeze", "city": "Mumbai" }
   ]
   ```

2. **Get Hotel Details**:
   ```http
   GET https://www.gocomet.com/api/assignment/hotels/:id
   ```
   **Response**:
   ```json
   {
     "success": true,
     "hotel": {
       "id": "1",
       "name": "Hotel Sunshine",
       "rooms": [
         {
           "name": "Deluxe Room",
           "price": 5000,
           "image_urls": ["url1", "url2"]
         },
         {
           "name": "Standard Room",
           "price": 3000,
           "image_urls": ["url3", "url4"]
         }
       ]
     }
   }
   ```

---

## Future Improvements

- Integration with a real backend service.
- Advanced search filters (e.g., distance, amenities).
- Payment gateway for completing bookings.
- User authentication for personalized booking history.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact

For any questions or feedback, please contact:

- **Email**: agrawalkushb@gmail.com
- **LinkedIn**: [Your LinkedIn](https://www.linkedin.com/in/agrawal-kush-9a5184212/)
