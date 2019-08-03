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
const companyUser_controller=require('../controllers/companyUser.controller');

router.post('/login', companyUser_controller.companyUser_login);
router.get('/list', checkToken, companyUser_controller.companyUser_list);
router.get('/details/:id', checkToken, companyUser_controller.companyUser_details);
router.post('/create', companyUser_controller.companyUser_create);
router.put('/edit/:id', checkToken, companyUser_controller.companyUser_edit);
router.delete('/delete/:id', checkToken, companyUser_controller.companyUser_delete);

module.exports=router;