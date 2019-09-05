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

// BEGIN LIST (Protected by companyUser.company_id)
exports.selection_list = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.companyUser) {
                db.Selection.findAll({
                        where: {
                            'company_id': authorizedData.companyUser.company_id
                        },
                        include: [{
                                model: db.Company
                            },
                            {
                                model: db.CompanyUser,
                                attributes: { exclude: ['password', 'company_id'] },
                                include: [{
                                    model: db.Role
                                }]
                            },
                            {
                                model: db.Tag,
                            },
                            {
                                model: db.User,
                                attributes: { exclude: ['password'] },
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

// BEGIN DETAILS (Protected by companyUser.company_id)
exports.selection_details = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.companyUser) {
                if (authorizedData.companyUser.company_id == req.body.company_id) {
                    db.Selection.findOne({
                            where: {
                                'id': req.params.id,
                            },
                            include: [{
                                    model: db.Company
                                },
                                {
                                    model: db.CompanyUser,
                                    attributes: { exclude: ['password', 'company_id'] },
                                    include: [{
                                        model: db.Role
                                    }]
                                },
                                {
                                    model: db.Tag,
                                },
                                {
                                    model: db.User,
                                    attributes: { exclude: ['password'] },
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
            } else {
                res.status(403).send('ERROR: Access denied');
            }
        }
    });
};

// BEGIN CREATE (Only for companyUsers, do not create duplicates)
exports.selection_create = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.companyUser) {
                db.Selection.create({
                        company_id: authorizedData.companyUser.company_id,
                        companyUser_id: authorizedData.companyUser.id,
                        tag_id: 1,
                        user_id: req.body.user_id
                    })
                    .then(data => {
                        res.status(200).json(data);
                    })
                    .catch(error => {
                        res.status(400).send('ERROR: Data not found');
                    });
                // db.Selection.findOrCreate({
                //         where: {
                //             'company_id': authorizedData.companyUser.company_id,
                //             'user_id': req.body.user_id
                //         },
                //         defaults: {
                //             company_id: authorizedData.companyUser.company_id,
                //             companyUser_id: authorizedData.companyUser.id,
                //             tag_id: 1,
                //             user_id: req.body.user_id
                //         }
                //     })
                //     .then((foundData, createdData) => {
                //         if (foundData) {
                //             res.status(400).send('WARNING: Duplicate entry detected').json(foundData);
                //         } else {
                //             res.status(200).json(createdData);
                //         }
                //         res.end();
                //     })
                //     .catch(error => {
                //         res.status(400).send('ERROR: Data not found');
                //     });
            } else {
                res.status(403).send('ERROR: Access denied');
            }
        }
    });
};

// BEGIN EDIT (Only for companyUsers with matching company_id)
exports.selection_edit = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.companyUser) {
                if (authorizedData.companyUser.company_id == req.body.company_id) {
                    db.Selection.update({
                            tag_id: req.body.tag
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

// BEGIN DELETE (Protected - only for companyUsers with matching company_id)
exports.selection_delete = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.companyUser) {
                if (authorizedData.companyUser.company_id == req.body.company_id) {
                    db.Selection.destroy({
                            where: {
                                'id': req.params.id
                            }
                        })
                        .then(data => {
                            res.status(200).res.send('Data successfully deleted');
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