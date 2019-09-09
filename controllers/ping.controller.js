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

// BEGIN
// BEGIN LIST (For companyUsers: returns the list of matching company_id pings only; for users: returns the list of matching user_id pings)
exports.ping_list = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.companyUser) {
                db.Ping.findAll({
                        where: {
                            'company_id': authorizedData.companyUser.company_id
                        },
                        include: [{
                                model: db.Company,
                                attributes: { exclude: 'password' }
                            },
                            {
                                model: db.CompanyUser,
                                attributes: { exclude: ['password', 'company_id'] },
                                include: [{
                                    model: db.Role
                                }]
                            },
                            {
                                model: db.Offer,
                                attributes: { exclude: ['company_id', 'companyUser_id', ''] },
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
                                    },
                                    {
                                        model: db.ContractType
                                    }
                                ]
                            },
                            {
                                model: db.Status
                            },
                            {
                                model: db.User,
                                attributes: { exclude: 'password' },
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
                            }
                        ]
                    })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(error => {
                        res.status(400).send('ERROR: Data not found');
                    });
            } else if (authorizedData.user) {
                db.Ping.findAll({
                        where: {
                            'user_id': authorizedData.user.id
                        },
                        include: [{
                                model: db.Company,
                                attributes: { exclude: 'password' }
                            },
                            {
                                model: db.CompanyUser,
                                attributes: { exclude: ['password', 'company_id'] },
                                include: [{
                                    model: db.Role
                                }]
                            },
                            {
                                model: db.Offer,
                                attributes: { exclude: ['company_id', 'companyUser_id', ''] },
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
                                    },
                                    {
                                        model: db.ContractType
                                    }
                                ]
                            },
                            {
                                model: db.Status
                            },
                            {
                                model: db.User,
                                attributes: { exclude: 'password' },
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

// BEGIN DETAILS (Only for companyUsers with matching company_id, and for users where pings have their user_id)
exports.ping_details = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.companyUser) {
                db.Ping.findOne({
                        where: {
                            'id': req.params.id,
                            'company_id': authorizedData.companyUser.company_id
                        },
                        include: [{
                                model: db.Company,
                                attributes: { exclude: 'password' }
                            },
                            {
                                model: db.CompanyUser,
                                attributes: { exclude: ['password', 'company_id'] },
                                include: [{
                                    model: db.Role
                                }]
                            },
                            {
                                model: db.Offer,
                                attributes: { exclude: ['company_id', 'companyUser_id', ''] },
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
                                    },
                                    {
                                        model: db.ContractType
                                    }
                                ]
                            },
                            {
                                model: db.Status
                            },
                            {
                                model: db.User,
                                attributes: { exclude: 'password' },
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
                            }
                        ]
                    })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(error => {
                        res.status(400).send('ERROR: Data not found');
                    });
            } else if (authorizedData.user) {
                db.Ping.findOne({
                        where: {
                            'id': req.params.id,
                            'user_id': authorizedData.user.id
                        },
                        include: [{
                                model: db.Company,
                                attributes: { exclude: 'password' }
                            },
                            {
                                model: db.CompanyUser,
                                attributes: { exclude: ['password', 'company_id'] },
                                include: [{
                                    model: db.Role
                                }]
                            },
                            {
                                model: db.Offer,
                                attributes: { exclude: ['company_id', 'companyUser_id', ''] },
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
                                    },
                                    {
                                        model: db.ContractType
                                    }
                                ]
                            },
                            {
                                model: db.Status
                            },
                            {
                                model: db.User,
                                attributes: { exclude: 'password' },
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

// BEGIN CREATE (Only for users)
exports.ping_create = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.user) {
                db.Ping.create({
                        company_id: req.body.company_id,
                        companyUser_id: null,
                        offer_id: req.body.offer_id,
                        status_id: 1,
                        user_id: authorizedData.user.id
                    })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(error => {
                        res.status(400).send('ERROR: Data not found');
                    });
            }
        }
    });
};

// BEGIN EDIT (Protected - only for companyUsers with matching company_id)
exports.ping_edit = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.companyUser) {
                if (authorizedData.companyUser.company_id == req.body.company_id) {
                    db.Ping.update({
                            status_id: req.body.status_id
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
                } else {
                    res.status(403).send('ERROR: Access denied');
                }
            } else {
                res.status(403).send('ERROR: Access denied');
            }
        }
    });
};

// BEGIN DELETE (Protected - only for users with matching user_id on offer)
exports.ping_delete = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            db.Ping.findOne({
                    where: {
                        'id': req.params.id
                    }
                })
                .then(data => {
                    if (authorizedData.user.id == data.user_id) {
                        db.Ping.destroy({
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
                })
                .catch(error => {
                    res.status(400).send('ERROR: Data not found');
                });
        }
    });
};
// END