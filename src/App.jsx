import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TempleDetails from './pages/TempleDetails';
import Footer from './components/Footer';
import AddTemple from './pages/AddTemple';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/temple/:id" element={<TempleDetails />} />
            <Route path="/add-temple" element={<AddTemple />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;