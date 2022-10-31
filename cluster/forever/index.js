import {fork} from 'child_process';
const express = require('express');

const app = express();

const parametro1 = parseInt(process.argv[3]) || 8080;
const PORT = parseInt(process.argv[2]) || 8080;

if(parametro1==99){

    const express = require('express');
    const numCpu = require('os').cpus().length
    const cluster = require('cluster');
    
    if(cluster.isMaster) {
        console.log(numCpu);
        console.log(`PID MASTER ${process.pid}`);
    
        for (let i = 0; i < numCpu; i++) {
            cluster.fork();
        };
    
        cluster.on('exit', (worker, code, signal) => {
            console.log(`Work ${worker.process.pid} died`);
            cluster.fork();
        });
       
    } else {
       
          import ('main.js')


    }

}




