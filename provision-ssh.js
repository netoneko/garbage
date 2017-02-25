/**
** docker run -ti -p 2022:22 -v `pwd`:/opt/garbage alpine:3.4 sh
** apk --no-cache add nodejs
** cd /opt/garbage && node provision-ssh.js
**/

const fs = require('fs'),
    cp = require('child_process');

const log = (child) => {
    [child.stdout, child.stderr].forEach(stream => stream.on('data', (data) => {
        console.log(data.toString());
    }));
};

const installDependencies = (callback) => {
    const command = cp.spawn(`
        apk --no-cache add curl openssh &&
        mkdir -p /root/.ssh /etc/ssh && chmod 0600 /root/.ssh /etc/ssh &&
        curl -L -s https://github.com/netoneko.keys > /root/.ssh/authorized_keys &&
        ssh-keygen -f /etc/ssh/ssh_host_rsa_key -N '' -t rsa`, {
        shell: true
    });

    log(command);

    command.on('exit', callback);
};

const runSSHD = () => {
    fs.writeFileSync('/etc/ssh/sshd_config', 'PermitRootLogin yes');

    const command = cp.spawn(`/usr/sbin/sshd`, {detached: true});

    log(command);

    console.log(`SSHD is running
        You may connect to with this line:
        ssh -o "UserKnownHostsFile /dev/null" root@127.0.0.1 -p 2022`);

    command.unref();
    process.exit(0);
};

installDependencies(runSSHD);
