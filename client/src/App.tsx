import './App.css';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import axios from 'axios';
import { Alert, AlertColor } from '@mui/material';

function App() {
  const [restaurant, setRestaurant] = useState("");
  const [randomRestaurant, setRandomRestaurant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState<AlertColor>();
  const api_endpoint = "http://localhost:8000";

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api_endpoint}/restaurant`, {
        restaurant: restaurant
      });
      if (res.status == 201) {
        setAlertMessage(`Added ${restaurant} to the list.`);
        setAlertColor("success");
      }
      else {
        setAlertMessage("Server Error! Please try again later.");
        setAlertColor("error");
      }
    }
    catch (err) {
      console.log(err);
      setAlertMessage("Something went wrong while submitting! Please try again later.");
      setAlertColor("error");
    }
  }

  const getRandomRestaurant = async () => {
    try {
      const res = await axios.get(`${api_endpoint}/restaurant`);
      if (res.data.error) {
        setAlertMessage("No restaurants have been submitted yet!");
        setAlertColor("error");
      }
      else {
        const restaurant = res.data.restaurant;
        setRandomRestaurant(restaurant); 
        setAlertMessage("");
      }
    }
    catch (err) {
      console.log(err);
      setAlertMessage("Something went wrong while retrieving a restaurant! Please try again later.");
      setAlertColor("error");
      setRandomRestaurant("");
    }
    
  }

  return (
    <>
    <Container>
      <Typography align='center' variant='h1' gutterBottom>
        Pick A Restaurant
      </Typography> 
      <TextField 
        label="Enter a Restaurant" 
        value={restaurant}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setRestaurant(e.target.value);
        }}/>
      <Button variant="contained" onClick={handleSubmit}>Add</Button>
      <Button variant="contained" onClick={getRandomRestaurant}>Get Random Restaurant</Button>
    </Container>

    {alertMessage && (
      <Alert severity={alertColor}>{alertMessage}</Alert>
    )}

    {randomRestaurant && (
      <Alert severity="info">You picked {randomRestaurant}!</Alert>
    )}

    </>
  );
}

export default App;
