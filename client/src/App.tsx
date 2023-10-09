import './App.css';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Alert, AlertColor } from '@mui/material';

function App() {
  const [restaurant, setRestaurant] = useState("");
  const [randomRestaurant, setRandomRestaurant] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState<AlertColor>();
  const api_endpoint = import.meta.env.PORT || "http://localhost:8000";

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
    catch (err: unknown) {
      if (err instanceof AxiosError && err.response) {
        const errMsg = err.response.data.error;
        setAlertMessage(errMsg);
      }
      else {
        setAlertMessage("Something went wrong while submitting! Please try again later.");
      }
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
    catch (err: unknown) {
      console.log(err);
      if (err instanceof AxiosError && err.response) {
        const errMsg = err.response.data.error;
        setAlertMessage(errMsg);
      }
      else {
        setAlertMessage("Something went wrong while retrieving a restaurant! Please try again later.");
      }
      setAlertColor("error");
      setRandomRestaurant("");
    }
  }

  return (
    <Container maxWidth="sm"> 
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item>
          <Typography align="center" variant="h1" gutterBottom>
            Pick A Restaurant.
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Enter a Restaurant"
            fullWidth
            value={restaurant}
            onChange={(e) => {
              setRestaurant(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleSubmit}>
            Add Restaurant
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={getRandomRestaurant}>
            Get Random Restaurant
          </Button>
        </Grid>
      </Grid>

      {alertMessage && (
        <Alert severity={alertColor} sx={{ marginTop: 2, marginBottom: 2 }}>{alertMessage}</Alert>
      )}

      {randomRestaurant && (
        <Alert severity="info" sx={{ marginTop: 2, marginBottom: 2 }}>You picked {randomRestaurant}!</Alert>
      )}
    </Container>
  );
}

export default App;
