import os
from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import tensorflow as tf
import joblib


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "geolife_lstm_autoencoder.keras")
THRESHOLD_PATH = os.path.join(BASE_DIR, "threshold.npy")
SCALER_PATH = os.path.join(BASE_DIR, "geolife_scaler.save")

FEATURE_COUNT = 5
SEQ_LEN = 20   


model = tf.keras.models.load_model(MODEL_PATH)
threshold = float(np.load(THRESHOLD_PATH))
scaler = joblib.load(SCALER_PATH)


app = FastAPI(title="Geolife Anomaly Detection API")

class SequenceInput(BaseModel):
    sequence: list  # 2D list


@app.get("/")
def health():
    return {"status": "Anomaly Detection API running"}


@app.post("/detect")
def detect_anomaly(data: SequenceInput):

    try:
        sequence = np.array(data.sequence, dtype=float)


        if len(sequence.shape) != 2:
            return {"error": "Input must be a 2D list."}

        if sequence.shape[0] != SEQ_LEN:
            return {
                "error": f"Sequence must contain exactly {SEQ_LEN} timesteps."
            }

        if sequence.shape[1] != FEATURE_COUNT:
            return {
                "error": f"Each timestep must contain exactly {FEATURE_COUNT} features."
            }


        sequence_scaled = scaler.transform(sequence)


        sequence_scaled = sequence_scaled.reshape(1, SEQ_LEN, FEATURE_COUNT)

        # Predict
        reconstructed = model.predict(sequence_scaled)

        # Compute reconstruction error
        error = np.mean(
            (sequence_scaled - reconstructed) ** 2,
            axis=(1, 2)
        )[0]

        score = float(error / threshold)


        if score > 10:
            status = "CRITICAL"
        elif score > 3:
            status = "SEVERE"
        elif score > 1:
            status = "ANOMALY"
        elif score > 0.8:
            status = "SUSPICIOUS"
        else:
            status = "NORMAL"

        return {
            "anomaly_score": round(score, 4),
            "status": status
        }

    except Exception as e:
        return {"error": str(e)}