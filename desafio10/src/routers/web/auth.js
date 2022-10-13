import { Router } from 'express';
import session from ('express-session');

import path from 'path'

const authWebRouter = new Router()

authWebRouter.get('/', (req, res) => {
    
})

authWebRouter.get('/login', (req, res) => {
    
})

authWebRouter.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) {
            res.json({ status: 'Logout Error', body: err })
        } else {
            res.send('Logout ok!!')
        }
    })
})


authWebRouter.post('/login', (req, res) => {
    req.session.nombre = req.body.nombre;
    res.redirect('/home');
})



export default authWebRouter