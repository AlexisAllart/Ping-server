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
const contractType_controller=require('../controllers/contractType.controller');

router.get('/list', contractType_controller.contractType_list);
// Les contractTypes doivent déjà être présents dans la db, on ne peut pas les créer, les modifier ou les supprimer
// router.post('/create', checkToken, contractType_controller.contractType_create);
// router.put('/edit/:id', checkToken, contractType_controller.contractType_edit);
// router.delete('/delete/:id', contractType_controller.contractType_delete);

module.exports=router;