const cluster = require('node:cluster');
const OS = require('node:os');
const client = require('./mongodb');

// const noOfCpus = OS.cpus().length;
// // this is not necessary, for own purpose. can create workers of your own based on threads
// const workerProcess = noOfCpus == 1 ? noOfCpus : noOfCpus > 10 ? noOfCpus - 3 : noOfCpus - 1;
// const testWorkers = 2;

// params : 'auto' - default, 'disabled' - single node process, type number - creates worker based on number
function runServer(workers = 'auto') {
    workers !== 'auto' ? workers : OS.cpus().length - 1;
    return function (callBack) {
        if (workers === 'disabled') return callBack();
        if (cluster.isPrimary) {
            console.log(`Master process ${process.pid} is running`);
            for (let i = 1; i <= workers; i++) cluster.fork();

            cluster.on('disconnect', (worker) => { // disconnect runs first
                console.log(`Worker process ${worker.process.pid} disconnected`);
                // mongodb active connection length issue, so do i need to close db connection if worker dies?
                // client.close().then(value => console.log("DB closed", value));
            }).on('exit', (worker, code, signal) => { // exit runs second
                console.log(`Worker process ${worker.process.pid} died `, worker.isDead(), "\n\n");
                cluster.fork();
            });

        } else {
            console.log(`Worker process ${process.pid} started`);
            client.connect().then(conn => console.log("DB connected")).catch(err => console.log("DB connection error", err));
            callBack();
        }
    };
};


module.exports = { runServer };