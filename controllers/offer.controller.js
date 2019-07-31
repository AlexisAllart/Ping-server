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
exports.offer_list = (req,res)=>{
    db.Offer.findAll({})
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

// BEGIN DETAILS (Public)
exports.offer_details = (req,res)=>{
    db.Offer.findOne({
        where:{
            'id': req.params.id
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
};

// BEGIN CREATE (Only for companyUsers)
exports.offer_create = (req,res)=>{
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if(err){
            res.setHeader('Content-type','application/json ; charset=utf-8');
            res.sendStatus(403).send('ERROR: Could not connect to the protected route');
            res.end();
        }
        else {
            if(authorizedData.companyUser) {
                db.Offer.create({
                    addressCity:req.body.addressCity,
                    addressNumber:req.body.addressNumber,
                    addressStreet:req.body.addressStreet,
                    addressZIPCode:req.body.addressZIPCode,
                    description:req.body.description,
                    latitude:req.body.latitude,
                    longitude:req.body.longitude,
                    salary:req.body.salary,
                    title:req.body.title,
                    company_id:authorizedData.companyUser.company_id,
                    companyUser_id:authorizedData.companyUser.id,
                    contractType_id:req.body.contractType_id,
                    keyWordOne_id:req.body.keyWordOne_id,
                    keyWordTwo_id:req.body.keyWordTwo_id,
                    keyWordThree_id:req.body.keyWordThree_id
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
        }
    });
};

// BEGIN EDIT (Protected - only for companyUsers with matching company_id)
exports.offer_edit = (req,res)=>{
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if(err){
            res.setHeader('Content-type','application/json ; charset=utf-8');
            res.sendStatus(403).send('ERROR: Could not connect to the protected route');
            res.end();
        }
        else {
            if(authorizedData.companyUser.company_id==req.body.offerCompany_id) {
                db.Offer.update({
                    addressCity:req.body.addressCity,
                    addressNumber:req.body.addressNumber,
                    addressStreet:req.body.addressStreet,
                    addressZIPCode:req.body.addressZIPCode,
                    description:req.body.description,
                    latitude:req.body.latitude,
                    longitude:req.body.longitude,
                    salary:req.body.salary,
                    title:req.body.title,
                    company_id:authorizedData.companyUser.company_id,
                    companyUser_id:authorizedData.companyUser.id,
                    contractType_id:req.body.contractType_id,
                    keyWordOne_id:req.body.keyWordOne_id,
                    keyWordTwo_id:req.body.keyWordTwo_id,
                    keyWordThree_id:req.body.keyWordThree_id
                    },{
                    where:{
                        'id':req.params.id
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
                res.sendStatus(403).send('ERROR: ACCESS DENIED');
                res.end();
            }
        }
    });
};

// BEGIN DELETE (Protected - only for companyUsers with matching company_id)
exports.offer_delete = (req,res)=>{
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if(err){
            res.setHeader('Content-type','application/json ; charset=utf-8');
            res.sendStatus(403).send('ERROR: Could not connect to the protected route');
            res.end();
        }
        else {
            if(authorizedData.companyUser.company_id==req.body.offerCompany_id) {
                db.Offer.destroy({
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