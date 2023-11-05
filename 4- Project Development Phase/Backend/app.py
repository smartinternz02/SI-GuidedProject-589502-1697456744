import pickle
import numpy as np
import sklearn
from sklearn.preprocessing import MinMaxScaler
from flask import Flask, request, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 
# Dummy data to store posted values
data = []

@app.route('/')
def index():
    return "Welcome to Anti Bankruptcy"

@app.route('/model/input', methods=['POST'])
def model_input():
    # Handle the form submission
    data = request.get_json()  
    try:
        with open('project.pkl', 'rb') as file:
            loaded_model = pickle.load(file)
            scaler = MinMaxScaler()
            scaled_data = scaler.fit_transform(np.array(data["Input"]).reshape(1, -1))
            print("SCALED DATA - ", scaled_data)
            input_data = scaled_data

            # Use the loaded model to make predictions
            predictions = loaded_model.predict(input_data)
        return f'{predictions}'
    except Exception as e:
        print(f"Error: {str(e)}")
        return "Error"

if __name__ == '__main__':
    app.run(debug=True)