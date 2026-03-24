from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth_routes, ocean_routes, research_routes, farm_routes, product_routes, api_routes

app = FastAPI(title="Blue Genesis Ocean Intelligence Platform")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router)
app.include_router(ocean_routes.router)
app.include_router(research_routes.router)
app.include_router(farm_routes.router)
app.include_router(product_routes.router)
app.include_router(api_routes.router)

@app.get("/")
def root():
    return {"message": "Blue Genesis Ocean Intelligence Platform running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
