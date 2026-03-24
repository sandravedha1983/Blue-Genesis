
import time
from services.satellite_service import fetch_satellite_data

def run_satellite_job():
    while True:
        data = fetch_satellite_data()
        print("Satellite data fetched:", data)
        time.sleep(21600)
