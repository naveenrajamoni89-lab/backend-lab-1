const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello from the basic Node.js HTTP server!\n');
});

server.listen(PORT, () => {
  console.log(`Basic HTTP server running at http://localhost:${PORT}/`);
});

