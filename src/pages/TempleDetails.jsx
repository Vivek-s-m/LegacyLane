import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

function TempleDetails() {
  const { id } = useParams();
  const [temple, setTemple] = useState(null);
  const [loading, setLoading] = useState(true);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [directionsRequest, setDirectionsRequest] = useState(null);
  const defaultCoords = { lat: 13.134406998790162, lng: 77.56942488299111 };
  const [origin, setOrigin] = useState(defaultCoords);

  const center = temple?.location?.coordinates
    ? {
        lat: temple.location.coordinates.latitude,
        lng: temple.location.coordinates.longitude,
      }
    : defaultCoords; // Fallback to default coordinates
  
  const destination = temple?.location?.coordinates
    ? {
        lat: temple.location.coordinates.latitude,
        lng: temple.location.coordinates.longitude,
      }
    : defaultCoords;

  const handleGetDirections = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentOrigin = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setOrigin(currentOrigin);
          setDirectionsRequest({
            origin: currentOrigin,
            destination: destination,
            travelMode: 'DRIVING',
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Unable to fetch your location. Using default origin.");
          setDirectionsRequest({
            origin: defaultCoords,
            destination: destination,
            travelMode: 'DRIVING',
          });
        }
      );
    } else {
      alert("Geolocation is not supported by this browser. Using default origin.");
      setDirectionsRequest({
        origin: defaultCoords,
        destination: destination,
        travelMode: 'DRIVING',
      });
    }
  };

  useEffect(() => {
    const fetchTempleDetails = async () => {
      try {
        const response = await axios.get(`/api/temples/${id}`);
        setTemple(response.data);
      } catch (error) {
        console.error('Error fetching temple details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTempleDetails();
  }, [id]);

  const handleDirectionsCallback = useCallback(
    (response) => {
      if (response?.status === 'OK') {
        setDirectionsResponse((prevResponse) => {
          if (JSON.stringify(prevResponse) !== JSON.stringify(response)) {
            return response;
          }
          return prevResponse; // Prevent re-render if response hasn't changed
        });
      } else {
        console.error('Directions request failed:', response);
      }
    },
    []
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!temple) {
    return <div>Temple not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{temple.name}</h1>

      {/* Google Maps */}
      <div className="mb-8">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '400px' }}
            center={center}
            zoom={15}
          >
            <Marker position={center} />
            {directionsRequest && (
              <DirectionsService
                options={directionsRequest}
                callback={handleDirectionsCallback}
              />
            )}
            {directionsResponse && (
              <DirectionsRenderer
                directions={directionsResponse}
              />
            )}
          </GoogleMap>
        </LoadScript>

        <button
          onClick={handleGetDirections}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Get Directions
        </button>
      </div>

      {/* Other temple details like location, timings, etc. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Location</h2>
          <p className="text-gray-700 mb-4">
            {temple.location.address}<br />
            {temple.location.city}, {temple.location.state}
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Timings</h2>
      <p className="text-gray-700 mb-2">
        Opening Hours: {temple.timings.opening} - {temple.timings.closing}
      </p>

      {temple.timings.specialDarshanTimings.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Special Darshan Timings</h3>
          <ul className="list-disc list-inside">
            {temple.timings.specialDarshanTimings.map((darshan, index) => (
              <li key={index} className="text-gray-700">
                {darshan.name}: {darshan.time}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">History</h2>
        <p className="text-gray-700 whitespace-pre-line">{temple.history}</p>
      </div>

      {temple.festivals.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Festivals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {temple.festivals.map((festival, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">{festival.name}</h3>
                <p className="text-gray-600 mb-2">Date: {festival.date}</p>
                <p className="text-gray-700">{festival.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          {temple.contact.phone && (
            <p className="text-gray-700 mb-2">Phone: {temple.contact.phone}</p>
          )}
          {temple.contact.email && (
            <p className="text-gray-700 mb-2">Email: {temple.contact.email}</p>
          )}
          {temple.contact.website && (
            <p className="text-gray-700">
              Website: <a href={temple.contact.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{temple.contact.website}</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TempleDetails;
