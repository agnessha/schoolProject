const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');


const FAVICON = path.join(__dirname, 'favicon.ico');

let counter = 0

const server = http.createServer(function(request, response) {
    let pathname = url.parse(request.url).pathname;
    if (request.method === 'GET' && pathname === '/favicon.ico') {
        response.setHeader('Content-Type', 'image/x-icon');

        fs.createReadStream(FAVICON).pipe(response);

        return;
    }
    switch (request.url) {
        case '/home' :
                fs.readFile('home.html', (err, data) => {
                    if (err) response.write('error')
                    else response.write(data)
                    response.end()
                })
            break;
        default:
            response.write("404");
            response.end();

    }



});


server.listen(3003);