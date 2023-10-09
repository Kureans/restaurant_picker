import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
const restaurantList: Array<string> = [];

app.use(express.json());
app.use(cors());

app.post('/restaurant', (req: Request, res: Response) => {
    const restaurant = req.body.restaurant;
    console.log(restaurant);
    if (!restaurant) {
        return res.status(400).json({error: "restaurant name is missing!"});
    }
    restaurantList.push(restaurant);
    console.log(restaurantList);
    res.status(201).send();
});

app.get('/restaurant', (req: Request, res: Response) => {
    if (restaurantList.length == 0) {
        return res.json({
            "error": "No restaurants submitted yet!"
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
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});