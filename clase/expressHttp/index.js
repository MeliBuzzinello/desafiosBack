const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api/mensajes',(req, res)=>{
    console.log('Http get');
    res.json({mensaje: 'hola mundo'});
});

//query params
app.get('/api/mensajes-query-params',(req , res)=>{
    console.log('get con query params');

    if(Object.entries(req.query).length > 0){
        res.json({
            result: 'get params ok',
            query: req.query
        }) 
    } else {
        res.json({
            result: 'get all:ok'
        })
    }
});

//path params
app.get('api/mensajes/:id', (req, res)=>{
    res.json({
        result: 'path params ok',
        pathParams: req.params.id
    })
});

app.post('api/mensajes',(req, res)=>{
    //res.json es para responder al navegador
    console.log(req.body);
});


app.listen(8080);

