// DEPENDENCIES
// Sequelize
let db = require(`../models/index.js`);

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
        cb(null, './public/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({
    storage: storage
});

// Bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

// BEGIN
// BEGIN LIST (Public)
exports.company_list = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    db.Company.findAll({})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(400).send('ERROR: Data not found');
        });
};

// BEGIN DETAILS (Public)
exports.company_details = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    db.Company.findOne({
            where: {
                'id': req.params.id
            }
        })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(400).send('ERROR: Data not found');
        });
};

// BEGIN CREATE (Public)
exports.company_create = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        db.Company.create({
                about: req.body.about,
                address: req.body.address,
                email: req.body.email,
                facebook: req.body.facebook,
                link: req.body.link,
                linkedin: req.body.linkedin,
                logo: './assets/img/default.png',
                name: req.body.name,
                password: hash,
                phone: req.body.phone,
                twitter: req.body.twitter,
                role_id: 1
            })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(error => {
                res.status(400).send('ERROR: Data not found');
            });
    });
};

// BEGIN EDIT (Protected - only for companyUsers with matching company_id)
exports.company_edit = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.companyUser) {
                if (authorizedData.companyUser.company_id == req.params.id) {
                    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                        db.Company.update({
                                about: req.body.about,
                                address: req.body.address,
                                email: req.body.email,
                                facebook: req.body.facebook,
                                link: req.body.link,
                                linkedin: req.body.linkedin,
                                name: req.body.name,
                                password: hash,
                                phone: req.body.phone,
                                twitter: req.body.twitter
                            }, {
                                where: {
                                    'id': req.params.id
                                }
                            })
                            .then(data => {
                                res.status(200).json(data);
                            })
                            .catch(error => {
                                res.status(400).send('ERROR: Data not found');
                            });
                    });
                } else {
                    res.status(403).send('ERROR: Access denied');
                }
            } else {
                res.status(403).send('ERROR: Access denied');
            }
        }
    });
};

// BEGIN LOGO UPLOAD (Protected - only for matching company companyUsers)
exports.company_logo = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.companyUser) {
                if (authorizedData.companyUser.company_id == req.params.id) {
                    db.Company.update({
                            logo: './uploads/' + req.file.filename
                        }, {
                            where: {
                                'id': req.params.id
                            }
                        })
                        .then(data => {
                            res.status(200).json('Data successfully uploaded');
                        })
                        .catch(error => {
                            res.status(400).send('ERROR: Data not found');
                        });
                } else {
                    res.status(403).send('ERROR: Access denied');
                }
            } else {
                res.status(403).send('ERROR: Access denied');
            }
        }
    });
};

// BEGIN DELETE (Protected - only for matching company admin companyUsers)
exports.company_delete = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.companyUser) {
                if (authorizedData.companyUser.company_id == req.params.id && authorizedData.companyUser.role_id == 1) {
                    db.Company.destroy({
                            where: {
                                'id': req.params.id
                            }
                        })
                        .then(data => {
                            res.status(200).send('Data successfully deleted');
                        })
                        .catch(error => {
                            res.status(400).send('ERROR: Data not found');
                        });
                } else {
                    res.status(403).send('ERROR: Access denied');
                }
            } else {
                res.status(403).send('ERROR: Access denied');
            }
        }
    });
};
// END