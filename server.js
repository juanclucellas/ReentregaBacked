const express = require('express');
const connectDB = require('./db');
const passport = require('./passport');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/api/sessions', authRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
