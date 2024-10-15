const cartRepository = require('../repositories/cartRepository');
const Ticket = require('../models/Ticket');

router.post('/:cid/purchase', authorize(['user']), async (req, res) => {
    try {
        const cart = await cartRepository.getCart(req.params.cid);
        
        // Verifica si hay stock suficiente para todos los productos en el carrito
        const insufficientStock = [];
        let totalAmount = 0;

        for (let product of cart.products) {
            if (product.stock < product.quantity) {
                insufficientStock.push(product);
            } else {
                totalAmount += product.price * product.quantity;
                // Resta el stock del producto
                product.stock -= product.quantity;
                await product.save();
            }
        }

        if (insufficientStock.length > 0) {
            return res.status(400).json({ message: 'Not enough stock', insufficientStock });
        }

        // Crear ticket de compra
        const newTicket = new Ticket({
            code: 'TICKET' + Date.now(),
            amount: totalAmount,
            purchaser: req.user.email,
        });

        await newTicket.save();
        res.json(newTicket);

    } catch (error) {
        res.status(500).json({ message: 'Error processing purchase', error: error.message });
    }
});
