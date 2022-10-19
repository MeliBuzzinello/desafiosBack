export function webAuth(req, res, next) {
    if (req.session.nombre){
        return next();
    } 
    return res.status(401).send('error de autorización');
    
}

export function apiAuth(req, res, next) {

}


