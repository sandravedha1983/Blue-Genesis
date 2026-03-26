const BASE_URL = "http://127.0.0.1:8000";

async function fetchAPI(endpoint, options = {}) {
    try {
        const response = await fetch(BASE_URL + endpoint, options);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}
