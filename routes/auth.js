const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User'); 
const passport = require('passport');
const authorize = require('../middleware/authorization');
const Ticket = require('../models/Ticket');


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }


        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        const payload = {
            id: user._id,
            email: user.email,
            role: user.role,  
        };

        const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

        res.cookie('jwt', token, { httpOnly: true });
        return res.json({ message: 'Logged in successfully', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    try {
        res.json({
            id: req.user._id,
            email: req.user.email,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            role: req.user.role
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

router.post('/product', authorize(['admin']), (req, res) => {
    // Solo los admin pueden crear productos
});

router.post('/cart/add', authorize(['user']), (req, res) => {
    // Solo los usuarios pueden agregar productos al carrito
});

router.post('/:cid/purchase', async (req, res) => {
    const cart = await cartRepository.getCart(req.params.cid);
    const newTicket = new Ticket({
        code: 'TICKET' + Date.now(),
        amount: totalAmount,
        purchaser: req.user.email,
    });
    await newTicket.save();
    res.json(newTicket);
});
