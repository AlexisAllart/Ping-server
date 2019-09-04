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

// Bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

// BEGIN
// LOGIN (Protected by Password through bcrypt)
exports.companyUser_login = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    db.CompanyUser.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(companyUser => {
            if (!companyUser) {
                res.status(400).send('ERROR: Access denied');
            }
            bcrypt.compare(req.body.password, companyUser.password, (err, result) => {
                if (result) {
                    jwt.sign({
                        companyUser
                    }, 'secureKey', {
                        expiresIn: '1h'
                    }, (err, token) => {
                        if (err) {
                            res.status(400).send('ERROR: Failed to create token');
                        } else {
                            res.status(200).json({ id: companyUser.id, token: token });
                        }
                    });
                } else {
                    res.status(400).send('ERROR: Invalid password');
                }
            });
        });
};

// CREATE (Protected by req.body.companyEmail/req.body.companyPassword)
exports.companyUser_create = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    db.Company.findOne({
            where: {
                email: req.body.companyEmail
            }
        })
        .then(company => {
            if (!company) {
                res.status(400).send('ERROR: Invalid company email');
            } else {
                let role = 2;
                db.CompanyUser.count({
                        where: {
                            company_id: company.id
                        }
                    })
                    .then(int => {
                        if (int == 0) {
                            role = 1;
                        }
                        bcrypt.compare(req.body.companyPassword, company.password, (err, result) => {
                            if (result) {
                                bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                                    db.CompanyUser.create({
                                            email: req.body.email,
                                            name: req.body.name,
                                            password: hash,
                                            company_id: company.id,
                                            role_id: role
                                        })
                                        .then(data => {
                                            res.status(200).json(data);
                                        })
                                        .catch(error => {
                                            res.status(400).send('ERROR: Data not found');
                                        });
                                });
                            } else {
                                res.status(400).send('ERROR: Invalid company password');
                            }
                        });
                    })
                    .catch(error => {
                        res.status(400).send('ERROR: Data not found');
                    });

            }
        })
        .catch(error => {
            res.status(400).send('ERROR: Data not found');
        });
};

// LIST (Protected - only showing matching company_id companyUsers)
exports.companyUser_list = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.companyUser.id) {
                db.CompanyUser.findAll({
                        where: {
                            'company_id': authorizedData.companyUser.company_id
                        },
                        include: [{
                                model: db.Company,
                                attributes: { exclude: 'password' }
                            },
                            {
                                model: db.Role,
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

// DETAILS (Protected - only for account owner or companyUsers with role_id=1 with matching company_id)
exports.companyUser_details = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.companyUser.role_id == 1 && authorizedData.companyUser.company_id == req.body.company_id || authorizedData.companyUser.id == req.params.id) {
                db.CompanyUser.findOne({
                        where: {
                            'id': req.params.id,
                            'company_id': (authorizedData.companyUser.company_id)
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
        }
    });
};

// EDIT (Protected - only for account owner or companyUser with role_id=1 with matching company_id)
exports.companyUser_edit = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.companyUser.role_id == 1 && authorizedData.companyUser.company_id == req.body.company_id || authorizedData.companyUser.id == req.params.id) {
                bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                    db.CompanyUser.update({
                            email: req.body.email,
                            name: req.body.name,
                            password: hash,
                        }, {
                            where: {
                                'id': req.params.id,
                                'company_id': authorizedData.companyUser.company_id
                            }
                        })
                        .then(data => {
                            res.status(200).send('Data successfully updated');
                        })
                        .catch(error => {
                            res.status(400).send('ERROR: Data not found');
                        });
                });
            } else {
                res.status(403).send('ERROR: Access denied');
            }
        }
    });
};

// DELETE (Protected - only for account owner or companyUser with role_id=1 with matching company_id)
exports.companyUser_delete = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.companyUser.role_id == 1 && authorizedData.companyUser.company_id == req.body.company_id || authorizedData.companyUser.id == req.params.id) {
                db.CompanyUser.destroy({
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
        }
    });
};
// END