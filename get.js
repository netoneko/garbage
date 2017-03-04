const get = (url) => {
    return new Promise((resolve, reject) => {
        var data = '';
        require('https').get(url, (res) => {
            res.on('data', (d) => data += d);
            res.on('end', () => resolve(data));
            res.on('error', reject);
        });
    });
}

get('https://api.ipify.org/?format=json').then(JSON.parse).then(console.log, console.error)
