"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = void 0;
const MOCK_PRODUCTS = [
    { id: 1, name: 'Whey Protein Isolate', category: 'Supplements', price: 49.99, rating: 4.8 },
    { id: 2, name: 'Creatine Monohydrate', category: 'Supplements', price: 24.99, rating: 4.9 },
    { id: 3, name: 'Resistance Bands Set', category: 'Accessories', price: 19.99, rating: 4.5 },
    { id: 4, name: 'Premium Lifting Belt', category: 'Gear', price: 39.99, rating: 4.7 },
    { id: 5, name: 'Pre-Workout Energy', category: 'Supplements', price: 34.99, rating: 4.6 },
    { id: 6, name: 'Gym Duffel Bag', category: 'Accessories', price: 45.00, rating: 4.8 },
];
const getProducts = async (req, res) => {
    try {
        return res.json(MOCK_PRODUCTS);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};
exports.getProducts = getProducts;
