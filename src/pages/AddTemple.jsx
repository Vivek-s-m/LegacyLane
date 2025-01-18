import React, { useState } from 'react';
import axios from 'axios';

function AddTemple() {
  const [templeData, setTempleData] = useState({
    name: '',
    location: {
      city: '',
      state: '',
      address: '',
      coordinates: {
        latitude: '',
        longitude: ''
      }
    },
    history: '',
    timings: {
      opening: '',
      closing: '',
      specialDarshanTimings: [{ name: '', time: '' }]
    },
    images: [''],
    festivals: [{ name: '', date: '', description: '' }],
    contact: { phone: '', email: '', website: '' }
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Handling timings directly inside the `timings` object
    if (name === 'opening' || name === 'closing') {
      setTempleData({
        ...templeData,
        timings: {
          ...templeData.timings,
          [name]: value, // Update either opening or closing time
        }
      });
    } else {
      // Handle other fields
      setTempleData({
        ...templeData,
        [name]: value
      });
    }
  };
  

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setTempleData({
      ...templeData,
      location: {
        ...templeData.location,
        [name]: value
      }
    });
  };

  const handleCoordinatesChange = (e) => {
    const { name, value } = e.target;
    setTempleData({
      ...templeData,
      location: {
        ...templeData.location,
        coordinates: {
          ...templeData.location.coordinates,
          [name]: value
        }
      }
    });
  };

  const handleTimingsChange = (e, index, field) => {
    const { name, value } = e.target;
    const updatedArray = [...templeData.timings[field]];
    updatedArray[index][name] = value;
    setTempleData({
      ...templeData,
      timings: {
        ...templeData.timings,
        [field]: updatedArray
      }
    });
  };

  const handleImageChange = (e, index) => {
    const { value } = e.target;
    const updatedImages = [...templeData.images];
    updatedImages[index] = value;
    setTempleData({
      ...templeData,
      images: updatedImages
    });
  };

  const handleAddImage = () => {
    setTempleData({
      ...templeData,
      images: [...templeData.images, '']
    });
  };
  
  const handleAddFestival = () => {
    setTempleData({
      ...templeData,
      festivals: [...templeData.festivals, { name: '', date: '', description: '' }]
    });
  };

  const handleFestivalChange = (e, index, field) => {
    const { name, value } = e.target;
    const updatedFestivals = [...templeData.festivals];
    updatedFestivals[index][name] = value;
    setTempleData({
      ...templeData,
      festivals: updatedFestivals
    });
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setTempleData({
      ...templeData,
      contact: {
        ...templeData.contact,
        [name]: value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/api/addtemples', templeData);
      setMessage('Temple added successfully!');
      setTempleData({
        name: '',
        location: {
          city: '',
          state: '',
          address: '',
          coordinates: {
            latitude: '',
            longitude: ''
          }
        },
        history: '',
        timings: {
          opening: '',
          closing: '',
          specialDarshanTimings: [{ name: '', time: '' }]
        },
        images: [''],
        festivals: [{ name: '', date: '', description: '' }],
        contact: { phone: '', email: '', website: '' }
      });
    } catch (error) {
      setMessage('Failed to add temple, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Contribute Temple Information</h2>
      <form onSubmit={handleSubmit}>
        {/* Temple Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-semibold">Temple Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={templeData.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-lg font-semibold">Address</label>
          <textarea
            id="address"
            name="address"
            value={templeData.location.address}
            onChange={handleLocationChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter the temple address"
            required
          ></textarea>
        </div>

        <div className="mb-4 flex space-x-4">
          <div className="flex-1">
            <label htmlFor="city" className="block text-lg font-semibold">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={templeData.location.city}
              onChange={handleLocationChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="state" className="block text-lg font-semibold">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={templeData.location.state}
              onChange={handleLocationChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        {/* Coordinates */}
        <div className="mb-4 flex space-x-4">
          <div className="flex-1">
            <label htmlFor="latitude" className="block text-lg font-semibold">Latitude</label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              value={templeData.location.coordinates.latitude}
              onChange={handleCoordinatesChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              step="0.0001"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="longitude" className="block text-lg font-semibold">Longitude</label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              value={templeData.location.coordinates.longitude}
              onChange={handleCoordinatesChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              step="0.0001"
              required
            />
          </div>
        </div>

        {/* History */}
        <div className="mb-4">
          <label htmlFor="history" className="block text-lg font-semibold">Temple History</label>
          <textarea
            id="history"
            name="history"
            value={templeData.history}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Write a brief history about the temple"
            required
          ></textarea>
        </div>

        {/* Timings */}
        <div className="mb-4 flex space-x-4">
          <div className="flex-1">
            <label htmlFor="opening" className="block text-lg font-semibold">Opening Time</label>
            <input
              type="time"
              id="opening"
              name="opening"
              value={templeData.timings.opening}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="closing" className="block text-lg font-semibold">Closing Time</label>
            <input
              type="time"
              id="closing"
              name="closing"
              value={templeData.timings.closing}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        {/* Special Darshan Timings */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Special Darshan Timings</h3>
          {templeData.timings.specialDarshanTimings.map((darshan, index) => (
            <div key={index} className="flex space-x-4 mb-2">
              <input
                type="text"
                name="name"
                placeholder="Darshan Name"
                value={darshan.name}
                onChange={(e) => handleTimingsChange(e, index, 'specialDarshanTimings')}
                className="w-1/2 p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="time"
                name="time"
                value={darshan.time}
                onChange={(e) => handleTimingsChange(e, index, 'specialDarshanTimings')}
                className="w-1/2 p-3 border border-gray-300 rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Image URLs */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Temple Images (URL)</h3>
          {templeData.images.map((image, index) => (
            <div key={index} className="flex space-x-4 mb-2">
              <input
                type="text"
                placeholder="Enter Image URL"
                value={image}
                onChange={(e) => handleImageChange(e, index)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddImage}
            className="text-blue-600 hover:underline"
          >
            Add another image
          </button>
        </div>

        {/* Festivals */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Festivals</h3>
          {templeData.festivals.map((festival, index) => (
            <div key={index} className="flex space-x-4 mb-2">
              <input
                type="text"
                name="name"
                placeholder="Festival Name"
                value={festival.name}
                onChange={(e) => handleFestivalChange(e, index, 'name')}
                className="w-1/3 p-3 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="date"
                name="date"
                value={festival.date}
                onChange={(e) => handleFestivalChange(e, index, 'date')}
                className="w-1/3 p-3 border border-gray-300 rounded-lg"
                required
                aria-required="true"
              />
              <textarea
                name="description"
                placeholder="Festival Description"
                value={festival.description}
                onChange={(e) => handleFestivalChange(e, index, 'description')}
                className="w-1/3 p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddFestival}
            className="text-blue-600 hover:underline"
          >
            Add another festival
          </button>
        </div>

        {/* Contact Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
          <input
            type="tel"
            name="phone"
            value={templeData.contact.phone}
            onChange={handleContactChange}
            placeholder="Phone Number"
            className="w-full p-3 border border-gray-300 rounded-lg mb-2"
            required
          />
          <input
            type="email"
            name="email"
            value={templeData.contact.email}
            onChange={handleContactChange}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg mb-2"
            required
          />
          <input
            type="url"
            name="website"
            value={templeData.contact.website}
            onChange={handleContactChange}
            placeholder="Website"
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Adding Temple...' : 'Submit Temple Data'}
        </button>
      </form>

      {/* Success/Error Message */}
      {message && (
        <p className={`mt-4 text-center text-lg ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default AddTemple;
