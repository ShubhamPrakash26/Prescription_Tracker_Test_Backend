const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const familyRoutes = require('./routes/family'); 
const insuranceRoutes = require("./routes/insurance");
const shareRoutes = require("./routes/share");
const adminRoutes = require("./routes/admin");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/auth', authRoutes);
app.use("/api/users", familyRoutes);
app.use("/api/insurance", insuranceRoutes);
app.use("/api/records", shareRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/family', familyRoutes);

app.get('/', (req, res) =>{
    res.send('Hi, I am Root')
}); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
