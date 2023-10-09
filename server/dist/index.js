"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const restaurantList = [];
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post('/restaurant', (req, res) => {
    const restaurant = req.body.restaurant;
    console.log(restaurant);
    if (!restaurant) {
        console.log("empty rest");
        return res.status(400).send({ error: "restaurant name is missing!" });
    }
    if (restaurantList.includes(restaurant)) {
        return res.status(400).send({ error: "Restaurant name must be unique!" });
    }
    restaurantList.push(restaurant);
    console.log(restaurantList);
    res.status(201).send();
});
app.get('/restaurant', (req, res) => {
    if (restaurantList.length == 0) {
        return res.status(400).send({
            error: "No restaurants submitted yet!"
        });
    }
    //Ensure even distribution
    let index = restaurantList.length;
    while (index == restaurantList.length) {
        index = Math.floor(Math.random() * restaurantList.length);
    }
    console.log(restaurantList[index]);
    return res.json({
        "restaurant": restaurantList[index]
    });
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
