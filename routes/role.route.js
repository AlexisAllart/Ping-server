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
const role_controller=require('../controllers/role.controller');

router.get('/list', checkToken, role_controller.role_list);
// Les roles doivent déjà être présents dans la db, on ne peut pas les créer, les modifier ou les supprimer
// router.post('/create', checkToken, role_controller.role_create);
// router.put('/edit/:id', checkToken, role_controller.role_edit);
// router.delete('/delete/:id', checkToken, role_controller.role_delete);

module.exports=router;