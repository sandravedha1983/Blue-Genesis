
import requests

NASA_API = "DEMO_KEY"

def fetch_satellite_data():
    url = "https://api.nasa.gov/planetary/earth/assets"

    params = {
        "lon": 92,
        "lat": 10,
        "date": "2024-01-01",
        "api_key": NASA_API
    }

    response = requests.get(url, params=params)
    return response.json()
