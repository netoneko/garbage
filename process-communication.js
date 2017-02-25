const os = require('os'),
    fs = require('fs'),
    child_process = require('child_process');

const isAFork = process.connected,
    name = isAFork ? 'fork' : 'master';

console.log(`Started ${process.pid} as ${name}`);

setInterval(() => {
    console.log(`${name} ${process.pid} still alive`);
}, 10000);

const getUserList = () => {
    return fs.readFileSync('/etc/passwd').toString().split('\n').filter((str) => {
        return str[0] !== '#' && str.length !== 0;
    }).map(str => {
        return str.split(':')[0];
    });
};

const randomIndex = (max) => {
    return Math.floor(Math.random() * max);
};

if (isAFork) {
    process.on('message', (msg) => {
        console.log('Got a message from my mom!', msg);

        if (msg.task) {
            console.log(`getUserList called on ${process.pid}`);
            process.send({
                task: 'getUserList',
                results: getUserList()
            });
        }
    });

    process.on('disconnect', () => {
        console.log('Disconnected', process.pid);
        process.exit();
    });

    process.on('SIGTERM', () => {
        console.log('Received SIGTERM. Better tell my mom.');
        process.send({
            signal: 'SIGTERM'
        });
    });
} else {
    const children = os.cpus().map(() => child_process.fork(__filename));

    children.forEach((child) => {
        child.on('message', (msg) => {
            console.log('Got a message from my kid!');

            if (msg.task) {
                console.log(`Got results for task ${msg.task}`);
                console.log(`This system has ${msg.results.length} users`);
            }
        });
    });

    process.on('SIGHUP', () => {
        console.log('Simulate request, dispatching to one of the children');
        children[randomIndex(children.length)].send({task: 'getUserList'});
    });
}
