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
const tag_controller=require('../controllers/tag.controller');

router.get('/list', tag_controller.tag_list);
// Les tags doivent déjà être présents dans la db, on ne peut pas les créer, les modifier ou les supprimer
// router.post('/create', checkToken, tag_controller.tag_create);
// router.put('/edit/:id', checkToken, tag_controller.tag_edit);
// router.delete('/delete/:id', checkToken, tag_controller.tag_delete);

module.exports=router;