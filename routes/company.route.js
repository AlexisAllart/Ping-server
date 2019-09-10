// DEPENDENCIES
// Express
let express = require('express');
let router = express.Router();

// JsonWebToken
const jwt = require('jsonwebtoken');
const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        res.sendStatus(403);
    }
};

// Multer
let multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});
const upload = multer({ storage: storage });

// BEGIN
const company_controller = require('../controllers/company.controller');

router.get('/list', company_controller.company_list);
router.get('/details/:id', company_controller.company_details);
router.post('/create', company_controller.company_create);
router.put('/edit/:id', checkToken, company_controller.company_edit);
router.put('/logo/:id', checkToken, upload.single('logo'), company_controller.company_logo);
router.delete('/delete/:id', checkToken, company_controller.company_delete);

module.exports = router;