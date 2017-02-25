const http = require('http');

const parseRequest = (req, callback) => {
    const buffer = [];

    req.on('error', callback);

    req.on('data', (data) => buffer.push(data));

    req.on('end', () => {
        callback(null, buffer.join(''));
    });
};

const listen = () => {
    const server = http.createServer((req, res) => {
        try {
            parseRequest(req, (err, body) => {
                if (err !== null) {
                    res.statusCode = 500;
                    return res.end(err);
                }

                res.setHeader('Content-Type', 'application/json');

                if (body.length === 0) {
                    return res.end(JSON.stringify({message: 'OK'}));
                }

                const parsedBody = JSON.parse(body);

                return res.end(JSON.stringify(parsedBody));
            });
        } catch (e) {
            res.statusCode = 500;
            return res.end(e.toString());
        }
    });

    server.listen(8000);
};

const query = () => {
    const request = http.request({
        host: 'localhost',
        path: '/',
        port: 8000,
        method: 'POST'
    }, (res) => {
        parseRequest(res, (err, data) => {
            console.log(data);
        });
    });

    request.write(JSON.stringify({message: 'Hello'}));
    request.end();
};

if (process.env.SERVER) {
    listen();
} else {
    query();
}
