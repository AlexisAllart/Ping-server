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
const keyWord_controller=require('../controllers/keyWord.controller');

router.get('/list', keyWord_controller.keyWord_list);
router.post('/create', checkToken, keyWord_controller.keyWord_create);
// On ne peut pas modifier les keyWords, donc on ne crée pas de route pour edit
// router.put('/edit/:id', checkToken, keyWord_controller.keyWord_edit);
// On ne peut pas supprimer les keyWords, donc on ne crée pas de route pour delete
// router.delete('/delete/:id', checkToken, keyWord_controller.keyWord_delete);

module.exports=router;