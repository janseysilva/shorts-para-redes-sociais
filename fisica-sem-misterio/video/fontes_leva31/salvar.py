import http.server, os, re
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), "flow"); os.makedirs(D, exist_ok=True)
class H(http.server.BaseHTTPRequestHandler):
    def _c(self):
        self.send_header('Access-Control-Allow-Origin', 'https://flow.google.com'); self.send_header('Access-Control-Allow-Private-Network', 'true'); self.send_header('Access-Control-Allow-Headers', '*')
    def do_OPTIONS(self): self.send_response(204); self._c(); self.end_headers()
    def do_POST(self):
        n = re.sub(r'[^A-Za-z0-9_.-]', '', self.path); b = self.rfile.read(int(self.headers['Content-Length']))
        if len(b) < 80_000_000 and n.endswith(('.mp4', '.png', '.jpg')): open(os.path.join(D, n), 'wb').write(b)
        self.send_response(200); self._c(); self.end_headers(); self.wfile.write(str(len(b)).encode())
http.server.HTTPServer(('127.0.0.1', 8767), H).serve_forever()
