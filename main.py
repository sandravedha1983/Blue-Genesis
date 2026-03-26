from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from routes import auth_routes, ocean_routes, research_routes, farm_routes, product_routes, api_routes
import os

app = FastAPI(title="Blue Genesis Ocean Intelligence Platform")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API routes
app.include_router(auth_routes.router)
app.include_router(ocean_routes.router)
app.include_router(research_routes.router)
app.include_router(farm_routes.router)
app.include_router(product_routes.router)
app.include_router(api_routes.router)

# Mount static directories
app.mount("/js", StaticFiles(directory="js"), name="js")
app.mount("/css", StaticFiles(directory="css"), name="css")
app.mount("/assets", StaticFiles(directory="assets"), name="assets")

# Serve main pages and other HTML files
@app.get("/")
async def get_index():
    return FileResponse("index.html")

@app.get("/{page}.html")
async def get_html_page(page: str):
    file_path = f"{page}.html"
    if os.path.exists(file_path):
        return FileResponse(file_path)
    return {"error": "Page not found"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
