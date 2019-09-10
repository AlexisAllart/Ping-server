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
        cb(null, 'public/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});
const upload = multer({
    storage: storage
});

// Bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

// BEGIN
// BEGIN LOGIN (Protected by Password through bcrypt)
exports.user_login = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    db.User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (!user) {
                res.status(400).send('ERROR: Invalid user name');
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result) {
                    jwt.sign({
                        user
                    }, 'secureKey', {
                        expiresIn: '24h'
                    }, (err, token) => {
                        if (err) {
                            res.status(400).send('ERROR: Failed to create token');
                        }
                        res.status(200).json({
                            id: user.id,
                            token: token
                        });
                    });
                } else {
                    res.status(400).send('ERROR: Invalid password');
                }
            });
        });
};

// BEGIN LIST (Protected - only for companyUsers)
exports.user_list = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.companyUser) {
                if (authorizedData.companyUser.id) {
                    db.User.findAll({
                            where: {
                                'available': true
                            },
                            order: [
                                ['id', 'DESC']
                            ],
                            attributes: {
                                exclude: 'password'
                            },
                            include: [{
                                    model: db.KeyWord,
                                    as: 'KeyWordOne'
                                },
                                {
                                    model: db.KeyWord,
                                    as: 'KeyWordTwo'
                                },
                                {
                                    model: db.KeyWord,
                                    as: 'KeyWordThree'
                                }
                            ]
                        })
                        .then(data => {
                            res.status(200).json(data);
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

// BEGIN DETAILS (Protected - only for companyUsers and account owner)
exports.user_details = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.companyUser || authorizedData.user.id == req.params.id) {
                db.User.findOne({
                        where: {
                            'id': req.params.id,
                            'available': true
                        },
                        attributes: {
                            exclude: 'password'
                        },
                        include: [{
                                model: db.KeyWord,
                                as: 'KeyWordOne'
                            },
                            {
                                model: db.KeyWord,
                                as: 'KeyWordTwo'
                            },
                            {
                                model: db.KeyWord,
                                as: 'KeyWordThree'
                            }
                        ]
                    })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(error => {
                        res.status(400).send('ERROR: Data not found');
                    });
            } else {
                res.status(403).send('ERROR: Access denied');
            }
        }
    });
};

// BEGIN CREATE (Public)
exports.user_create = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        db.User.create({
                about: "Non renseigné",
                available: true,
                cv: null,
                email: req.body.email,
                facebook: "Non renseigné",
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                linkedin: "Non renseigné",
                password: hash,
                picture: './assets/img/default.png',
                twitter: "Non renseigné",
                keyWordOne_id: 1,
                keyWordTwo_id: 1,
                keyWordThree_id: 1
            })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(error => {
                res.status(400).send('ERROR: Data not found');
            });
    });
};

// BEGIN EDIT (Protected - only for account owner)
exports.user_edit = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.user) {
                if (authorizedData.user.id == req.params.id) {
                    db.User.findOne({
                            where: {
                                'id': req.params.id
                            }
                        })
                        .then(data => {
                            req.body.about == null ? req.body.about = data.about : '';
                            req.body.available == null ? req.body.available = data.available : '';
                            req.body.email == null ? req.body.email = data.email : '';
                            req.body.facebook == null ? req.body.facebook = data.facebook : '';
                            req.body.firstName == null ? req.body.firstName = data.firstName : '';
                            req.body.lastName == null ? req.body.lastName = data.lastName : '';
                            req.body.linkedin == null ? req.body.linkedin = data.linkedin : '';
                            req.body.twitter == null ? req.body.twitter = data.twitter : '';
                            req.body.keyWordOne_id == null ? req.body.keyWordOne_id = data.keyWordOne_id : '';
                            req.body.keyWordTwo_id == null ? req.body.keyWordTwo_id = data.keyWordTwo_id : '';
                            req.body.keyWordThree_id == null ? req.body.keyWordThree_id = data.keyWordThree_id : '';
                            if (req.body.password != null) {
                                bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                                    finalPassword = hash;
                                });
                            } else {
                                finalPassword = data.password;
                            }
                            db.User.update({
                                    about: req.body.about,
                                    available: req.body.available,
                                    email: req.body.email,
                                    facebook: req.body.facebook,
                                    firstName: req.body.firstName,
                                    lastName: req.body.lastName,
                                    linkedin: req.body.linkedin,
                                    password: finalPassword,
                                    twitter: req.body.twitter,
                                    keyWordOne_id: req.body.keyWordOne_id,
                                    keyWordTwo_id: req.body.keyWordTwo_id,
                                    keyWordThree_id: req.body.keyWordThree_id
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

// BEGIN PICTURE UPLOAD (Protected - only for account owner)
exports.user_picture = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.user) {
                if (authorizedData.user.id == req.params.id) {
                    db.User.update({
                            picture: './uploads/' + req.file.filename
                        }, {
                            where: {
                                'id': req.params.id
                            }
                        })
                        .then(data => {
                            res.status(200).send('Data successfully uploaded');
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

// BEGIN CV UPLOAD (Protected - only for account owner)
exports.user_cv = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.user) {
                if (authorizedData.user.id == req.params.id) {
                    db.User.update({
                            cv: './uploads/' + req.file.filename
                        }, {
                            where: {
                                'id': req.params.id
                            }
                        })
                        .then(data => {
                            res.status(200).send('Data successfully uploaded');
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

// BEGIN DELETE (Protected - only for account owner)
exports.user_delete = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.user) {
                if (authorizedData.user.id == req.params.id) {
                    db.User.destroy({
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