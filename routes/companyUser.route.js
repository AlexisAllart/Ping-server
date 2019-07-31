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
// Seul companyUser avec role_id==1 a accès au profile personnel de chaque companyUser, ainsi que le propriétaire du compte companyUser
router.get('/details/:id', checkToken, companyUser_controller.companyUser_details);
// Tout utilisateur peut créer un compte companyUser s'il a le name+password d'une company_id
router.post('/create', companyUser_controller.companyUser_create);
// Seul le companyUser_id et le companyUser_id avec role_id=1 associé à la même company_id peuvent modifier un compte companyUser (note : le role ne peut pas être modifié à aucun moment)
router.put('/edit/:id', checkToken, companyUser_controller.companyUser_edit);
router.delete('/delete/:id', checkToken, companyUser_controller.companyUser_delete);

module.exports=router;