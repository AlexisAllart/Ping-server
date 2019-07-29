// DEPENDENCIES
// Express
let express=require('express');
let router=express.Router();

// JsonWebToken
const jwt = require('jsonwebtoken');
const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];
    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        req.token = token;
        next();
    }
    else {
        res.sendStatus(403);
    }
};

// BEGIN
const status_controller=require('../controllers/status.controller');

router.get('/list', status_controller.status_list);
// Les statuses doivent déjà être présents dans la db, on ne peut pas les créer, les modifier ou les supprimer
// router.post('/create', checkToken, status_controller.status_create);
// router.put('/edit/:id', checkToken, status_controller.status_edit);
// router.delete('/delete/:id', checkToken, status_controller.status_delete);

module.exports=router;