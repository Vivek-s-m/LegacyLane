import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [temples, setTemples] = useState([]);
  const [filteredTemples, setFilteredTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const response = await axios.get('/api/temples');
        setTemples(response.data);
        setFilteredTemples(response.data); // initially, show all temples
      } catch (error) {
        console.error('Error fetching temples:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemples();
  }, []);

  // Handle search functionality with trimming of spaces
  const handleSearch = (e) => {
    // Trim the query to remove leading and trailing spaces
    const searchQuery = e.target.value.trim().toLowerCase();
    setQuery(searchQuery);
    
    if (searchQuery) {
      const filtered = temples.filter((temple) =>
        temple.name.toLowerCase().includes(searchQuery) || 
        temple.location.city.toLowerCase().includes(searchQuery) || 
        temple.location.state.toLowerCase().includes(searchQuery)
      );
      setFilteredTemples(filtered);
    } else {
      setFilteredTemples(temples); // Show all temples if the search is cleared
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Search Bar */}
      <div className="max-w-4xl mx-auto p-6">
        <input
          type="text"
          placeholder="Search temples by name, city, or state"
          value={query}
          onChange={handleSearch}
          className="w-full p-3 border border-gray-300 rounded-lg mb-6"
        />
      </div>

      {/* Temples Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemples.map((temple) => (
          <Link
            key={temple._id}
            to={`/temple/${temple._id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {temple.images[0] && (
              <img
                src={temple.images[0]}
                alt={temple.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{temple.name}</h2>
              <p className="text-gray-600">{temple.location.city}, {temple.location.state}</p>
              <div className="mt-2 text-sm text-gray-500">
                <p>Opening Hours: {temple.timings.opening} - {temple.timings.closing}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
