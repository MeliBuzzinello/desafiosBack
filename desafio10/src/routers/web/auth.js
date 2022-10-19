import { Router } from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import path from 'path'

const authWebRouter = new Router()

// const advancedOpcions = { useNewUrlParser: true, useUnifiedTopology: true };

authWebRouter.use(session({
//     store: MongoStore.create({mongoUrl: 'mongodb+srv://melisabuzzinello:rHoBiwDQak6rrRlq@cluster0.8wjkcvd.mongodb.net/sesiones?retryWrites=true&w=majority',
//     mongoOptions: advancedOpcions
// }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 10000
    }
}))

authWebRouter.get('/', (req, res) => {
    res.send('Servidor express ok!')
})


authWebRouter.post('/login', (req, res) => {
    req.session.nombre = req.body.nombre;
    res.redirect('/home');
})

authWebRouter.get('/logout', (req, res) => {
    const nombre = req.session.nombre;
    req.session.destroy(err => {
        if(err) {
            res.json({ status: 'Logout Error', body: err })
        } else {
            res.render('pages/logout', { nombre })
        }
    })
})



export default authWebRouter