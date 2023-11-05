import pickle
import numpy as np
import sklearn
from sklearn.preprocessing import StandardScaler
from flask import Flask, request, render_template
from flask_cors import CORS
import pandas as pd

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
            column_names= ["Attr1","Attr2","Attr3","Attr4","Attr5","Attr6","Attr7","Attr8","Attr9","Attr10"]
            loaded_model = pickle.load(file)
            input_data = pd.DataFrame([data["Input"]], columns=column_names)

            # Use the loaded model to make predictions
            predictions = loaded_model.predict(input_data)
        return f'{predictions}'
    except Exception as e:
        print(f"Error: {str(e)}")
        return "Error"

if __name__ == '__main__':
    app.run(debug=True)