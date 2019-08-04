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
// BEGIN LIST (Public)
exports.offer_list = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    db.Offer.findAll({})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(400).send('ERROR: Data not found');
        });
};

// BEGIN DETAILS (Public)
exports.offer_details = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    db.Offer.findOne({
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

// BEGIN CREATE (Only for companyUsers)
exports.offer_create = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.companyUser) {
                db.Offer.create({
                        addressCity: req.body.addressCity,
                        addressNumber: req.body.addressNumber,
                        addressStreet: req.body.addressStreet,
                        addressZIPCode: req.body.addressZIPCode,
                        description: req.body.description,
                        latitude: req.body.latitude,
                        longitude: req.body.longitude,
                        salary: req.body.salary,
                        title: req.body.title,
                        company_id: authorizedData.companyUser.company_id,
                        companyUser_id: authorizedData.companyUser.id,
                        contractType_id: req.body.contractType_id,
                        keyWordOne_id: req.body.keyWordOne_id,
                        keyWordTwo_id: req.body.keyWordTwo_id,
                        keyWordThree_id: req.body.keyWordThree_id
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
exports.offer_edit = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.companyUser.company_id == req.body.offerCompany_id) {
                db.Offer.update({
                        addressCity: req.body.addressCity,
                        addressNumber: req.body.addressNumber,
                        addressStreet: req.body.addressStreet,
                        addressZIPCode: req.body.addressZIPCode,
                        description: req.body.description,
                        latitude: req.body.latitude,
                        longitude: req.body.longitude,
                        salary: req.body.salary,
                        title: req.body.title,
                        company_id: authorizedData.companyUser.company_id,
                        companyUser_id: authorizedData.companyUser.id,
                        contractType_id: req.body.contractType_id,
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
            } else {
                res.status(403).send('ERROR: Access denied');
            }
        }
    });
};

// BEGIN DELETE (Protected - only for companyUsers with matching company_id)
exports.offer_delete = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.companyUser.company_id == req.body.offerCompany_id) {
                db.Offer.destroy({
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