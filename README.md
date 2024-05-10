# Urban-Mobility-Detection

## Overview
Urban Mobility Detection is a project aimed at analyzing urban mobility patterns using machine learning techniques. This repository contains the code for the frontend, backend, and analysis components.

## Components
- **Frontend**: Built using SolidJS, a reactive JavaScript library for building user interfaces. The frontend interacts with the backend to display the analysis results to users.
- **Backend**: Developed with FastAPI, a modern, fast (high-performance), web framework for building APIs with Python 3.7+. The backend serves the machine learning models and handles data requests from the frontend.
- **Analysis**: Utilizes DuckDB, an embeddable SQL OLAP database management system, along with Matplotlib for data visualization. Various machine learning models such as Linear Regression, Random Forest, Support Vector Machines, and K Nearest Neighbors Regressor are employed for analyzing urban mobility data. Model selection is performed using cross-validation score, and dimensionality reduction techniques such as PCA are used for feature selection. Additionally, clustering techniques are applied for pattern recognition and analysis.

## Usage
1. **Frontend**:
   - Clone the repository.
   - Navigate to the `frontend` directory.
   - Install dependencies using `npm install`.
   - Start the development server with `npm start`.
   
2. **Backend**:
   - Clone the repository.
   - Navigate to the `backend` directory.
   - Install dependencies using `pip install -r requirements.txt`.
   - Run the FastAPI server with `uvicorn main:app --reload`.
   

## License
This project is licensed under the [MIT License](LICENSE).
