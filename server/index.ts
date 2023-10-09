import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
const restaurantList: Array<string> = [];

app.use(express.json());

app.post('/restaurant', (req: Request, res: Response) => {
    const restaurant = req.body.restaurant;
    if (!restaurant) {
        return res.status(400).json({error: "restaurant name is missing!"});
    }
    restaurantList.push(restaurant);
    res.status(201).send();
});

app.get('/restaurant', (req: Request, res: Response) => {
    if (restaurantList.length == 0) {
        return res.json({
            "error": "No restaurants submitted yet!"
        });
    }
    const index = Math.floor(Math.random() * (restaurantList.length-1));
    return res.json({
        "restaurant": restaurantList[index]
    });
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});