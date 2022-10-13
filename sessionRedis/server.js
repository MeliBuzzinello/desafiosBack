const express = require('express');
const session = require('express-session');


// redis local
// const redis = require('redis');
// const client = redis.createClient();
// const connectRedis = require('connect-redis');
// const RedisStore = connectRedis(session);

// redis cloud
const redis = require('redis');
const client = redis.createClient(12861, 'redis-12861.c80.us-east-1-2.ec2.cloud.redislabs.com');
client.auth('nFfSaVyVBKLxDAeYOWIZG2xJwdvgrvUF', (err)=>{
    if(err) throw err;
});
const connectRedis = require('connect-redis');
const RedisStore = connectRedis(session);


const app = express();

// redis local 
// app.use(session({
//     store: new RedisStore({
//         host: 'localhost',
//         port: 6379,
//         client: client,
//         ttl:30
//     }),
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: false
// }));


// redis cloud
app.use(session({
    store: new RedisStore({
        client: client,
        ttl:30
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.get('/', (req,res) => {
    res.send('Servidor express ok!')
})

app.get('/con-session', (req,res) => {
    if(req.session.contador) {
        req.session.contador++
        res.send(`Ud ha visitado el sitio ${req.session.contador} veces.`)
    }
    else {
        req.session.contador = 1
        res.send('Bienvenido!')
    }
});

app.get('/logout', (req,res) => {
    req.session.destroy( err => {
        if(!err) res.send('Logout ok!')
        else res.send({status: 'Logout ERROR', body: err})
    })
});

app.listen(8080);
console.log('server on');