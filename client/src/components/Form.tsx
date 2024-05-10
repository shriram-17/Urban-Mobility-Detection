import { createSignal , onCleanup } from "solid-js";
import "../styles/Form.css";
import axios from "axios";


function Form() {
  const [temperature, setTemperature] = createSignal("");
  const [humidity, setHumidity] = createSignal("");
  const [windSpeed, setWindSpeed] = createSignal("");
  const [precipitation, setPrecipitation] = createSignal("");
  const [populationDensity, setPopulationDensity] = createSignal("");
  const [weatherConditions, setWeatherConditions] = createSignal("");
  const [roadType, setRoadType] = createSignal("");
  const [vehicleType, setVehicleType] = createSignal("");
  const [predictionResult, setPredictionResult] = createSignal(null);

  let handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = {
      temperature: parseFloat(temperature()), // Ensure numeric values
      humidity: parseFloat(humidity()),
      wind_speed: parseFloat(windSpeed()),
      precipitation: parseFloat(precipitation()),
      population_density: parseFloat(populationDensity()),
      weatherConditions: weatherConditions(), // Keep string values
      roadType: roadType(),
      vehicleType: vehicleType(),
    };
    //console.log(formData);
    const response = await axios.post("http://localhost:8000/predict", formData);
    const {predictions} = response.data
    setPredictionResult(predictions[0]);
  };
  
  onCleanup(() => {
    setPredictionResult(null);
  });

  return (
    <div class="form-container">
      <h1>Urban Moblity Detection</h1>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="temperature">Temperature:</label>
          <input
            type="number"
            id="temperature"
            value={temperature()}
            onChange={(e) => setTemperature(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="humidity">Humidity:</label>
          <input
            type="number"
            id="humidity"
            value={humidity()}
            onChange={(e) => setHumidity(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="windSpeed">Wind Speed:</label>
          <input
            type="number"
            id="windSpeed"
            value={windSpeed()}
            onChange={(e) => setWindSpeed(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="precipitation">Precipitation:</label>
          <input
            type="number"
            id="precipitation"
            value={precipitation()}
            onChange={(e) => setPrecipitation(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="populationDensity">Population Density:</label>
          <input
            type="number"
            id="populationDensity"
            value={populationDensity()}
            onChange={(e) => setPopulationDensity(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="weatherConditions">Weather Conditions:</label>
          <select
            id="weatherConditions"
            value={weatherConditions()}
            onChange={(e) => setWeatherConditions(e.target.value)}
          >
            <option value="Clear">Clear</option>
            <option value="Cloudy">Cloudy</option>
            <option value="Rainy">Rainy</option>
          </select>
        </div>
        <div class="form-group">
          <label for="roadType">Road Type:</label>
          <select
            id="roadType"
            value={roadType()}
            onChange={(e) => setRoadType(e.target.value)}
          >
            <option value="City Street">City Street</option>
            <option value="Highway">Highway</option>
            <option value="Residential">Residential</option>
          </select>
        </div>
        <div class="form-group">
          <label for="vehicleType">Vehicle Type:</label>
          <select
            id="vehicleType"
            value={vehicleType()}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="Bicycle">Bicycle</option>
            <option value="Bus">Bus</option>
            <option value="Car">Car</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      {predictionResult() !== null && (
        <div class="prediction-result">
          <h2>Prediction Result : {predictionResult}</h2>
        </div>
      )}
    </div>
  );
}

export default Form;
