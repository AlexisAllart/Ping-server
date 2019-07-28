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
const selection_controller=require('../controllers/selection.controller');

router.get('/list', checkToken, selection_controller.selection_list);
router.get('/details/:id', checkToken, selection_controller.selection_details);
router.post('/create', checkToken, selection_controller.selection_create);
// router.put('/edit/:id', checkToken, selection_controller.selection_edit);
router.delete('/delete/:id', checkToken, selection_controller.selection_delete);

module.exports=router;