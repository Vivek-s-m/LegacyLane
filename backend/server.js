import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Temple } from './models/Temple.js';
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../src/build')));


mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://1by23ai189:bmsit123@legacy-lane.fznt1.mongodb.net/')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Get all temples

app.get('/api/temples', async (req, res) => {
  try {
    const temples = await Temple.find();
    res.json(temples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get temple by ID
app.get('/api/temples/:id', async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (!temple) return res.status(404).json({ message: 'Temple not found' });
    res.json(temple);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a temple
app.post('/api/addtemples', async (req, res) => {
  try {
    const temple = new Temple(req.body);
    const savedTemple = await temple.save();
    res.status(201).json(savedTemple);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/search-temples', async (req, res) => {
  const query = req.query.name;
  try {
    const temples = await Temple.find({
      name: { $regex: query, $options: 'i' }  // case-insensitive search
    });
    res.json(temples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/build', 'index.html'));
});


app.listen(PORT, async() => {
  console.log(`Server running on port ${PORT}`);
});