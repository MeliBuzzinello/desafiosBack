const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

app.get('/set-cookie',(req, res)=>{
    res.cookie('cookie1','seteoCookieNode')
    res.send('set cookie ok')
});

app.get('/cookies',(req, res)=>{
    res.json({ cookie: req.cookies })
});

app.listen(8080)