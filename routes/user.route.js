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
const user_controller = require('../controllers/user.controller');

router.post('/login', user_controller.user_login);
router.get('/list', checkToken, user_controller.user_list);
router.get('/details/:id', checkToken, user_controller.user_details);
router.post('/create', user_controller.user_create);
router.put('/edit/:id', checkToken, user_controller.user_edit);
router.put('/picture/:id', checkToken, upload.single('picture'), user_controller.user_picture);
router.put('/cv/:id', checkToken, upload.single('cv'), user_controller.user_cv);
router.delete('/delete/:id', checkToken, user_controller.user_delete);

module.exports = router;