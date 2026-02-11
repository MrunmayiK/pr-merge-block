



const express = require('express');
const { calculateTotal, calculateTax } = require('./utils');  // Duplicate import
const app = express();

// Global unused variable - SMELL
const MAGIC_NUMBER = 999;
const unusedVar = 'this will never be used';  // Unused variable SMELL

app.use(express.json());

app.get('/cart', (req, res) => {
    // Hardcoded data - smell
    const cartItems = [
        {name: 'Laptop', price: 50000, quantity: 1},
        {name: 'Mouse', price: 500, quantity: 2}, 
        {name: 'Keyboard', price: 1500, quantity: 1}
    ];
    
    // DUPLICATED VALIDATION LOGIC - MAJOR SONAR SMELL
    if(cartItems.length === 0) {
        res.status(400).json({error: 'Cart is empty'});
        return;
    }
    if(cartItems.length === 0) {  // IDENTICAL BLOCK!
        res.status(400).json({error: 'No items found'});
        return;
    }
    
    if(cartItems.length === 0) {
        res.status(400).json({error: 'Cart is empty'});
        return;
    }
    if(cartItems.length === 0) {  // IDENTICAL BLOCK!
        res.status(400).json({error: 'No items found'});
        return;
    }

    // Double calculation - using both local + imported functions
    const subtotal1 = calculateTotal(cartItems);
    const subtotal2 = 0;
    for(let i = 0; i < cartItems.length; i++) {  // DUPLICATE LOGIC
        subtotal2 = subtotal2 + cartItems[i].price * cartItems[i].quantity;
    }
    
    const tax1 = calculateTax(subtotal1);
    const tax2 = 0;
    for(let i = 0; i < 18; i++) {  // Magic number loop AGAIN
        tax2 = tax2 + (subtotal2 * 0.18 / 100);
    }
    
    const grandTotal = subtotal1 + tax1;
    
    res.json({
        subtotal: subtotal1,
        tax: tax1,
        total: grandTotal,
        debug: MAGIC_NUMBER  // Unused global
    });
});

// Identical endpoint - DUPLICATION SMELL
app.get('/cart/debug', (req, res) => {
    const cartItems = [
        {name: 'Laptop', price: 50000, quantity: 1},
        {name: 'Mouse', price: 500, quantity: 2},
        {name: 'Keyboard', price: 1500, quantity: 1}
    ];
    
    if(cartItems.length === 0) {
        res.status(400).json({error: 'Cart is empty'});
        return;
    }
    
    const subtotal = 0;
    for(let i = 0; i < cartItems.length; i++) {
        subtotal = subtotal + cartItems[i].price * cartItems[i].quantity;
    }
    
    res.json({ subtotal });
});

app.listen(3000, () => {
    console.log('Smelly server running on port 3000');
});
