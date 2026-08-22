#!/usr/bin/env python3
"""Run a local preview server for the static lesson page.

Usage: python3 preview.py
Then open http://127.0.0.1:4173 in a browser.
"""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class PreviewHandler(SimpleHTTPRequestHandler):
    """Serve the repository's static assets with no-cache preview headers."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=Path(__file__).parent, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 4173), PreviewHandler)
    print("Preview is running at http://127.0.0.1:4173")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nPreview server stopped.")
    finally:
        server.server_close()
