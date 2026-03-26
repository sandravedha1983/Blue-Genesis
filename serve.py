import http.server
import socketserver

PORT = 5500
Handler = http.server.SimpleHTTPRequestHandler

# Explicitly bind to 127.0.0.1 to avoid [::] confusion on Windows
with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
    print(f"✅ Blue Genesis Frontend is running at: http://127.0.0.1:{PORT}")
    print("Keep this window open to view the site.")
    httpd.serve_forever()
