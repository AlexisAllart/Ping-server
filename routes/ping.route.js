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
const ping_controller=require('../controllers/ping.controller');

router.get('/list', checkToken, ping_controller.ping_list);
router.get('/details/:id', checkToken, ping_controller.ping_details);
router.post('/create', checkToken, ping_controller.ping_create);
router.put('/edit/:id', checkToken, ping_controller.ping_edit);
router.delete('/delete/:id', checkToken, ping_controller.ping_delete);

module.exports=router;