const http = require('http');

const getMensaje = ()=>{
    const horaActual = new Date().getHours();

    //entre las 6 y 12 buen dia- 13 a 19 tardes - 20 a 5 noches
    if(horaActual > 6 & horaActual < 12){
        return 'BUEN DIA';
    } else if(horaActual > 13 & horaActual < 19 ){
        return 'buenas tardes';

    }else {
        return 'buenas noches'
    };

};

const server = http.createServer((req, res)=>{
    res.end(getMensaje());
});

const connectedServer = server.listen(8080, ()=>{
    console.log(`server http en el puerto ${connectedServer.address().port}`)
});