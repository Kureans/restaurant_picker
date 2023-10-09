# Restaurant Picker

A simple webapp to allow users to submit restaurant choices and pick one at random.

## Local Setup

Firstly, clone the repo into your local directory:

`git clone https://github.com/Kureans/restaurant_picker.git`

To install dependencies for server/client:

```
cd server
npm install
cd ../client 
npm install
```

To run server/client (Should be done in separate terminals):

#### Server

```
cd server 
npm run dev
```

#### Client

```
cd client 
npm run dev
```

This will run the server on port 8000 and the client on port 5173, so make sure the ports aren't occupied beforehand.

## Restaurant API

#### Add a Restaurant

**Endpoint:** `POST /restaurant`

**Description:** Add a restaurant choice to the list of options.

**Request:**
```json
{
  "restaurant": "Name of the restaurant"
}
```

- `restaurant` (string, required): The name of the restaurant to be added.

**Response:**
- `201 Created`: Restaurant added successfully.
- `400 Bad Request`: If the `restaurant` field is missing in the request body.
- `500 Internal Server Error`: If there is a server-side error.

#### Get a Random Restaurant

**Endpoint:** `GET /restaurant`

**Description:** Get a random restaurant choice from the list of options.

**Response:**
- `200 OK`: Random restaurant retrieved successfully.
  ```json
  {
    "restaurant": "Name of the randomly selected restaurant"
  }
  ```
- `400 Bad Request`: If there are no restaurants submitted yet.
  ```json
  {
    "error": "No restaurants submitted yet!"
  }
  ```
- `500 Internal Server Error`: If there is a server-side error.



