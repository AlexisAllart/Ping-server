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

// Attention à bien filtrer la liste pour chaque company_id
router.get('/list', checkToken, ping_controller.ping_list);
// Seuls le user_id du créateur du ping et les companyUser_id de la company_id peuvent accèder au ping
router.get('/details/:id', checkToken, ping_controller.ping_details);
// Seul un user_id peut créer un ping
router.post('/create', checkToken, ping_controller.ping_create);
// Seul les companyUser_id appartenant à company_id peuvent modifier le status_id du ping
router.put('/edit/:id', checkToken, ping_controller.ping_edit);
// Seul le user_id du ping peut le supprimer
router.delete('/delete/:id', checkToken, ping_controller.ping_delete);

module.exports=router;