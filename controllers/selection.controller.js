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

// BEGIN LIST (Protected by companyUser.company_id)
exports.selection_list = (req,res)=>{
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if(err){
            res.setHeader('Content-type','application/json ; charset=utf-8');
            res.sendStatus(403).send('ERROR: Could not connect to the protected route');
            res.end();
        }
        else {
            if(authorizedData.companyUser.id) {
                db.Selection.findAll({
                    where:{
                        'company_id': authorizedData.companyUser.company_id
                    }
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

// BEGIN DETAILS (Protected by companyUser.company_id)
exports.selection_details = (req,res)=>{
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if(err){
            res.setHeader('Content-type','application/json ; charset=utf-8');
            res.sendStatus(403).send('ERROR: Could not connect to the protected route');
            res.end();
        }
        else {
            if(authorizedData.companyUser.id && authorizedData.companyUser.company_id==req.body.company_id) {
                db.Selection.findOne({
                    where:{
                        'id': req.params.id,
                    }
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

// BEGIN CREATE (Only for companyUsers)
exports.selection_create = (req,res)=>{
    if(authorizedData.companyUser.id) {
        db.Selection.create({
            company_id:authorizedData.companyUser.company_id,
            companyUser_id:authorizedData.companyUser.id,
            tag_id:1,
            user_id:req.body.user_id,
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
};

// BEGIN DELETE (Protected - only for companyUsers with matching company_id)
exports.selection_delete = (req,res)=>{
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if(err){
            res.setHeader('Content-type','application/json ; charset=utf-8');
            res.sendStatus(403).send('ERROR: Could not connect to the protected route');
            res.end();
        }
        else {
            if(authorizedData.companyUser.company.id==req.body.company_id) {
                db.Selection.destroy({
                    where:{
                        'id': req.params.id
                    }
                })
                .then(data=>{
                    res.setHeader('Content-type','application/json ; charset=utf-8');
                    res.json('Data successfully deleted');
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
                res.sendStatus(403).send('ERROR: ACCESS DENIED');
                res.end();
            }
        }
    });
};