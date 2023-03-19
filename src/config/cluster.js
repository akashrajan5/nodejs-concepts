const cluster = require('node:cluster');
const OS = require('node:os');
const client = require('./mongodb');

// const noOfCpus = OS.cpus().length;
// // this is not necessary, for own purpose. can create workers of your own based on threads
// const workerProcess = noOfCpus == 1 ? noOfCpus : noOfCpus > 10 ? noOfCpus - 3 : noOfCpus - 1;
// const testWorkers = 2;

// if (cluster.isPrimary) {

//     console.log(`Master process ${process.pid} is running`);
//     for (let i = 1; i <= testWorkers; i++) cluster.fork();

//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`Worker process ${worker.process.pid} died \n\n`);
//         // signal ? console.log(`Worker was killed by signal`)
//         cluster.fork(); // starts new worker if process dies
//     });

// } else {
//     console.log(`Worker process ${process.pid} started`);
//     listen http server function here
// }


function runServer(workers = 'auto') {
    workers !== 'auto' ? workers : OS.cpus().length - 1;
    return function (callBack) {
        if (workers === 'disabled') return callBack();
        if (cluster.isPrimary) {
            client.connect().then(conn => console.log("Connected to DB")).catch(err => console.log("Failed DB connection", err));
            console.log(`Master process ${process.pid} is running`);
            for (let i = 1; i <= workers; i++) cluster.fork();

            cluster.on('exit', (worker, code, signal) => {
                console.log(`Worker process ${worker.process.pid} died \n\n`);
                cluster.fork();
            });

            // try to clode db here
            // cluster.on('')

        } else {
            console.log(`Worker process ${process.pid} started`);
            callBack();
        }
    };
};


module.exports = { runServer };