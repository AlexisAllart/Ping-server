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
const offer_controller=require('../controllers/offer.controller');

router.get('/list', offer_controller.offer_list);
router.get('/details/:id', offer_controller.offer_details);
router.post('/create', checkToken, offer_controller.offer_create);
router.put('/edit/:id', checkToken, offer_controller.offer_edit);
router.delete('/delete/:id', checkToken, offer_controller.offer_delete);

module.exports=router;