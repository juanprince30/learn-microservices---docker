// user-service/src/index.js
 const express = require('express');
 const mongoose = require('mongoose');
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
 const app = express();
 app.use(express.json());
 // Connexion MongoDB
 mongoose.connect(process.env.MONGODB_URL, {
 useNewUrlParser: true,
 useUnifiedTopology: true
 });
 // Schéma utilisateur
 const userSchema = new mongoose.Schema({
 email: { type: String, unique: true, required: true },
 password: { type: String, required: true },
 name: { type: String, required: true }
 });
 const User = mongoose.model('User', userSchema);
 // Routes
 app.post('/register', async (req, res) => {
 try {
 const { email, password, name } = req.body;
 const hashedPassword = await bcrypt.hash(password, 10);
 const user = new User({ email, password: hashedPassword, name });
 await user.save();
  
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, email, name } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
 });
 app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
 });
 const PORT = process.env.PORT || 3000;
 app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
 });