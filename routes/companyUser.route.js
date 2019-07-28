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
// Attention à bien filtrer la liste pour chaque company_id
router.get('/list', checkToken, companyUser_controller.companyUser_list);
// Seul company_id a accès au profile personnel de chaque companyUser, ainsi que le propriétaire du compte companyUser_id
router.get('/details/:id', checkToken, companyUser_controller.companyUser_details);
// Tout utilisateur peut créer un compte companyUser s'il a le name+password d'une company_id
router.post('/create', checkToken, companyUser_controller.companyUser_create);
// Seul le companyUser_id et le company_id associé peuvent modifier un compte companyUser
router.put('/edit/:id', checkToken, companyUser_controller.companyUser_edit);
router.delete('/delete/:id', companyUser_controller.companyUser_delete);

module.exports=router;