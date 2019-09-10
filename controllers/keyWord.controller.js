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
exports.keyWord_list = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    db.KeyWord.findAll({
            order: [
                ['id', 'ASC']
            ],
        })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(400).send('ERROR: Data not found');
        });
};


// BEGIN CREATE (Protected - only for companyUsers)
exports.keyWord_create = (req, res) => {
    res.setHeader('Content-type', 'application/json ; charset=utf-8');
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if (err) {
            res.status(403).send('ERROR: Access denied');
        } else {
            if (authorizedData.companyUser) {
                db.KeyWord.create({
                        name: req.body.name,
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
// END