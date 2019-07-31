// DEPENDENCIES
// Sequelize
let db = require(`../models/index.js`);

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
// BEGIN LIST (Public)
exports.keyWord_list = (req,res)=>{
    db.KeyWord.findAll({})
    .then(data=>{
        res.setHeader('Content-type','application/json ; charset=utf-8');
        res.json(data);
        res.status(200);
        res.end();
    })
    .catch(error=>{
        res.setHeader('Content-type','application/json ; charset=utf-8');
        res.json(error);
        res.status(400).send('400 ERROR');
        res.end();
    });
};


// BEGIN CREATE (Protected - only for companyUsers)
exports.keyWord_create = (req,res)=>{
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if(err){
            res.setHeader('Content-type','application/json ; charset=utf-8');
            res.sendStatus(403).send('ERROR: Could not connect to the protected route');
            res.end();
        }
        else {
            if(authorizedData.companyUser) {
                db.KeyWord.create({
                    name:req.body.name,
                })
                .then(data=>{
                    res.setHeader('Content-type','application/json ; charset=utf-8');
                    res.json(data);
                    res.status(200);
                    res.end();
                })
                .catch(error=>{
                    res.setHeader('Content-type','application/json ; charset=utf-8');
                    res.json(error);
                    res.status(400).send('400 ERROR');
                    res.end();
                });
            }
            else {
                res.setHeader('Content-type','application/json ; charset=utf-8');
                res.sendStatus(403).send('403 - ACCESS DENIED');
                res.end();
            }
        }
    });
};