"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const restaurantList = [];
app.use(express_1.default.json());
app.post('/restaurant', (req, res) => {
    const restaurant = req.body.restaurant;
    if (!restaurant) {
        return res.status(400).json({ error: "restaurant name is missing!" });
    }
    restaurantList.push(restaurant);
    res.status(201).send();
});
app.get('/restaurant', (req, res) => {
    if (restaurantList.length == 0) {
        return res.json({
            "error": "No restaurants submitted yet!"
        });
    }
    const index = Math.floor(Math.random() * (restaurantList.length - 1));
    return res.json({
        "restaurant": restaurantList[index]
    });
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
