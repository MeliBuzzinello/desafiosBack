const express = require('express');

const app = express();

const personas = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('inicio',{ personas });
});

app.post('/personas',(req, res)=>{
    personas.push(req.body);
    res.redirect('/');
});


const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))