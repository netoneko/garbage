const fs = require('fs');

const files = fs.readdirSync('/proc'),
    pids = files.map((pid) => parseInt(pid, 10)).filter(x => x);

const parseEnv = (env) => {
    return env.split('\u0000').filter(x => x.length > 0).reduce((result, line) => {
        const idx = line.indexOf('='),
            key = line.substring(0, idx),
            value = line.substring(idx + 1);
        result[key] = value;

        return result;
    }, {});
};

const parseCmdLine = (line) => {
    return line.replace(/\u0000/g, ' ').trim();
};

const getData = (pid) => {
    return {
        cmd: parseCmdLine(fs.readFileSync(`/proc/${pid}/cmdline`).toString()),
        env: parseEnv(fs.readFileSync(`/proc/${pid}/environ`).toString())
    };
};

console.log(pids.map(getData));
