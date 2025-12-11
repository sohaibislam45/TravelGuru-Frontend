# TravelGuru - Vehicle Booking & Trip Management Platform

TravelGuru is a comprehensive full-stack web application for vehicle rentals and trip management. Connect with vehicle owners, browse available vehicles, and manage your bookings all in one place.

## Live Site

https://ubiquitous-blini-5bc719.netlify.app/

## Features

- **User Authentication**: Secure login and registration with Firebase Authentication, including Google Sign-In support
- **Vehicle Management**: Browse all available vehicles with advanced filtering and sorting options
- **Booking System**: Easy-to-use booking interface with date selection and booking history
- **Vehicle CRUD Operations**: Add, update, and delete your own vehicles with a user-friendly interface
- **Responsive Design**: Fully responsive design that works seamlessly on mobile, tablet, and desktop devices
- **Dark/Light Theme**: Toggle between light and dark themes with persistent preference storage
- **Real-time Updates**: Powered by React Query for efficient data fetching and caching
- **Modern UI/UX**: Beautiful, modern interface built with TailwindCSS and DaisyUI
- **Animations**: Smooth animations using Framer Motion and React Spring
- **Top Rated Vehicles**: Discover the most popular vehicles based on booking statistics

## Tech Stack

### Frontend

- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **React Router 7** - Client-side routing
- **TailwindCSS 4** - Utility-first CSS framework
- **DaisyUI** - Component library for TailwindCSS
- **Firebase Auth** - Authentication service
- **TanStack Query (React Query)** - Data fetching and state management
- **Axios** - HTTP client
- **Framer Motion** - Animation library
- **React Spring** - Spring physics animations
- **date-fns** - Date utility library
- **react-hot-toast** - Toast notifications
- **react-icons** - Icon library

### Backend

- **Express 5** - Web framework for Node.js
- **MongoDB 7** - NoSQL database
- **CORS** - Cross-origin resource sharing

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)
- Firebase project

### Installation

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   cd TravelGuru
   ```

2. **Install client dependencies**

   ```bash
   cd client
   npm install
   ```

3. **Install server dependencies**

   ```bash
   cd ../server
   npm install
   ```

4. **Configure Firebase**

   - Create a Firebase project at [Firebase Console]
   - Enable Email/Password and Google authentication
   - Copy your Firebase config
   - Create a `.env` file in the `client` directory:

5. **Configure MongoDB**

   - Update the MongoDB connection string in `server/index.js`
   - Or set it as an environment variable

6. **Run the development server**

   ```bash
   # Terminal 1 - Start backend server
   cd server
   npm start

   # Terminal 2 - Start frontend dev server
   cd client
   npm run dev
   ```

7. **Open your browser**
   - Frontend: https://ubiquitous-blini-5bc719.netlify.app/
   - Backend: `https://travelguru-server-rust.vercel.app`

## Project Structure

```
TravelGuru/
├── client/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── contexts/        # React contexts (Auth)
│   │   ├── firebase/        # Firebase configuration
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service functions
│   │   ├── App.jsx          # Main app component with routes
│   │   └── main.jsx         # Entry point
│   └── package.json
├── server/
│   ├── index.js             # Express server and API routes
│   └── package.json
└── README.md
```

## API Endpoints

### Vehicles

- `GET /vehicles` - Get all vehicles (with optional query params for filtering/sorting)
- `GET /vehicles/:id` - Get single vehicle
- `GET /vehicles/latest` - Get latest 6 vehicles
- `GET /vehicles/top-rated` - Get top 3 most booked vehicles
- `POST /vehicles` - Add new vehicle
- `PUT /vehicles/:id` - Update vehicle
- `DELETE /vehicles/:id` - Delete vehicle

### Bookings

- `POST /bookings` - Create booking
- `GET /bookings` - Get bookings (filtered by userEmail query param)

## Usage

1. **Register/Login**: Create an account or sign in with Google
2. **Browse Vehicles**: View all available vehicles on the home page or all vehicles page
3. **Filter & Sort**: Use filters and sorting options to find the perfect vehicle
4. **View Details**: Click on any vehicle to see detailed information
5. **Book Vehicle**: Select a date and book your preferred vehicle
6. **Manage Vehicles**: Add, update, or delete your own vehicles
7. **View Bookings**: Check your booking history in the My Bookings page

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
