const http = require('http');
const url = require('url');
const fs = require('fs');

const myServer = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") return res.end();

    const log = `${Date.now()}: ${req.url}\n`;
    console.log(log);

    const myUrl = url.parse(req.url, true); // Parsing the request URL

    // Append log to file and handle any potential errors
    fs.appendFile("log.txt", log, (err) => {
        if (err) {
            console.error("Failed to write to log file:", err);
        }
    });

    // Route handling
    switch (myUrl.pathname) {
        case '/':
            res.end("HomePage");
            break;
        case '/about':
            const userName = myUrl.query.userName || 'Guest'; // Default to 'Guest' if no userName is provided
            res.end(`Hi ${userName}`);
            break;
        default:
            res.end("404 Page not found");
    }
});

myServer.listen(8000, () => console.log("Server running on port 8000"));
