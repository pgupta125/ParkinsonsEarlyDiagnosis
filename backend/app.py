from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import pickle

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the saved model and scaler
try:
    with open('model.pkl', 'rb') as f:
        model = pickle.load(f)
    with open('scaler.pkl', 'rb') as f:
        scaler = pickle.load(f)
except Exception as e:
    print(f"Error loading model: {str(e)}")

# Define input data model with all 22 features
class ParkinsonsInput(BaseModel):
    mdvp_fo_hz: float
    mdvp_fhi_hz: float
    mdvp_flo_hz: float
    mdvp_jitter_percent: float
    mdvp_jitter_abs: float
    mdvp_rap: float
    mdvp_ppq: float
    jitter_ddp: float
    mdvp_shimmer: float
    mdvp_shimmer_db: float
    shimmer_apq3: float
    shimmer_apq5: float
    mdvp_apq: float
    shimmer_dda: float
    nhr: float
    hnr: float
    rpde: float
    dfa: float
    spread1: float
    spread2: float
    d2: float
    ppe: float

# Define response model
class PredictionResponse(BaseModel):
    prediction: float
    has_parkinsons: bool
    confidence: float

@app.post("/predict", response_model=PredictionResponse)
async def predict_parkinsons(data: ParkinsonsInput):
    try:
        # Convert input data to array format in the correct order
        input_data = np.array([[
            data.mdvp_fo_hz,
            data.mdvp_fhi_hz,
            data.mdvp_flo_hz,
            data.mdvp_jitter_percent,
            data.mdvp_jitter_abs,
            data.mdvp_rap,
            data.mdvp_ppq,
            data.jitter_ddp,
            data.mdvp_shimmer,
            data.mdvp_shimmer_db,
            data.shimmer_apq3,
            data.shimmer_apq5,
            data.mdvp_apq,
            data.shimmer_dda,
            data.nhr,
            data.hnr,
            data.rpde,
            data.dfa,
            data.spread1,
            data.spread2,
            data.d2,
            data.ppe
        ]])
        
        # Scale the input data
        scaled_data = scaler.transform(input_data)
        
        # Make prediction
        prediction = float(model.predict(scaled_data)[0])
        
        THRESHOLD = 0.753
    
        # Classification logic
        if prediction < THRESHOLD - 0.1:
            status = "Likely Healthy"
            has_parkinsons = False
            confidence = min(1.0, (THRESHOLD - prediction) / 0.2)
        elif prediction > THRESHOLD + 0.1:
            status = "Likely Parkinson's"
            has_parkinsons = True
            confidence = min(1.0, (prediction - THRESHOLD) / 0.2)
        else:
            status = "Borderline - Further Testing Recommended"
            has_parkinsons = prediction > THRESHOLD
            confidence = 0.5
        
        return {
            "prediction": prediction,
            "has_parkinsons": has_parkinsons,
            "confidence": confidence,
            "status": status
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)