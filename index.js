require('dotenv').config();
const cors = require('cors');
const path = require('path');
const express = require('express');

// import route modules
const authRoutes = require('./routes/auth.route');
const usersRoutes = require('./routes/users.route');
const vehicleRoutes = require('./routes/vehicle.route');

const app = express();

// App settings
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')))

// Routes settings
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/vehicles', vehicleRoutes);

// import database modules
const mongoose = require('mongoose');
const uri = 'mongodb://localhost/crs';

app.listen(process.env.PORT || 2400, async () => {
    try {
        console.log(`server started : ${process.env.PORT}`)

        //Database config
        const options = {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true}
        await mongoose.connect(process.env.MONGODB_URL || uri, options)
        console.log('Connected to DB successfully')
    } catch (e) { console.log(e) }
})

app.get('/', async (req, res) => {
    const port = process.env.PORT
    res.send(port)
})

module.exports = app;
