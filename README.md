# Legacy Lane

**Legacy Lane** is a web application designed to provide detailed information about temples, including their history, timings, special darshan schedules, festivals, contact information, and more. Users can also get directions to the temples directly through the application.

## Features

- **Temple Information:** View details such as name, address, and contact information.
- **Timings:** Check opening hours and special darshan timings.
- **Festivals:** Discover upcoming festivals celebrated at the temples.
- **Map Integration:** Get directions to the temple using Google Maps API.
- **Responsive Design:** Fully responsive and optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Map Integration:** Google Maps API
- **Additional Libraries:** Axios for API requests, dotenv for environment variables

## Installation

### Prerequisites

Ensure that you have `Node.js` installed on your system. If you haven't installed it yet, you can download it from [here](https://nodejs.org/).

### Steps

1. Clone this repository:

    ```bash
    git clone https://github.com/yourusername/legacy-lane.git
    cd legacy-lane
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root of the project and add the following variables:

    ```bash
    REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
    MONGO_URI=your-mongo-db-uri
    PORT=3000
    ```

4. Run the app in development mode:

    To start the backend server:

    ```bash
    npm run build && npm start
    ```

    The frontend should now be running on `http://localhost:3000` and the backend API on `http://localhost:5000`.
