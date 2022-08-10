const express = require('express');

const app = express();

app.use(express.json());

const palabras = ['frase', 'inicial'];

app.get('/api/frase',(req, res)=>{
    res.send({frase: palabras.join(' ')})
});

app.get('/api/palabra/:pos',(req, res)=>{
    const { pos } = req.params;
    res.send({buscada : palabras[parseInt(pos)- 1]})
});

app.post('/api/palabra', (req , res)=>{
    const { palabra } = req.body;
    palabras.push(palabra);
    res.send({ palabraInsertada: palabra });
});

//req.body se envian en POST Y PUT 

app.put('/api/palabra/:id',(req, res)=>{
    const { palabra } = req.body;
    const { id } = req.params;

    const palabraAnterior = palabras[parseInt(id) - 1];
    palabras[parseInt(id) - 1] = palabra;
    
    res.send({ actualizada: palabra, anterior: palabraAnterior});
});

app.delete('/api/palabra/:id',(req, res)=>{
    const { id } = req.params;
    const palabra = palabras.splice(parseInt(id)- 1, 1);

    res.send({ palabraBorrada: palabra});

});

app.listen(8080);
