from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from joblib import load
import numpy as np

app = FastAPI()

# Enable CORS for requests from localhost:5173
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

class SampleData(BaseModel):
    temperature: float
    humidity: float
    wind_speed: float
    precipitation: float
    population_density: float
    weatherConditions: str
    roadType:str
    vehicleType:str


loaded_model = load("./src/analysis/best_model.joblib")

@app.post("/predict")
async def predict(sample_data: SampleData):
    try:
        sample_data_dict = sample_data.dict()
        
        converted_data = {
            "temperature": sample_data.temperature,
            "humidity": sample_data.humidity,
            "wind_speed": sample_data.wind_speed,
            "precipitation": sample_data.precipitation,
            "population_density": sample_data.population_density,
            "weather_conditions_Clear": 1 if sample_data.weatherConditions == "Clear" else 0,
            "weather_conditions_Cloudy": 1 if sample_data.weatherConditions == "Cloudy" else 0,
            "weather_conditions_Rainy": 1 if sample_data.weatherConditions == "Rainy" else 0,
            "road_type_City Street": 1 if sample_data.roadType == "City Street" else 0,
            "road_type_Highway": 1 if sample_data.roadType == "Highway" else 0,
            "road_type_Residential": 1 if sample_data.roadType == "Residential" else 0,
            "vehicle_type_Bicycle": 1 if sample_data.vehicleType == "Bicycle" else 0,
            "vehicle_type_Bus": 1 if sample_data.vehicleType == "Bus" else 0,
            "vehicle_type_Car": 1 if sample_data.vehicleType == "Car" else 0
        }
        
        features = ["temperature", "humidity", "wind_speed", "precipitation", "population_density", 
                    "weather_conditions_Clear", "weather_conditions_Cloudy", "weather_conditions_Rainy", 
                    "road_type_City Street", "road_type_Highway", "road_type_Residential", 
                    "vehicle_type_Bicycle", "vehicle_type_Bus", "vehicle_type_Car"]

        sample_data_reshaped = np.array([[converted_data[feature] for feature in features]])
        print(sample_data_reshaped)
        predictions = loaded_model.predict(sample_data_reshaped)
        
        return {"predictions": predictions.tolist()}  
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

