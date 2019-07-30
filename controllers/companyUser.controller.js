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

// Multer
let multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({storage: storage});

// Bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

// BEGIN
// BEGIN LOGIN (Protected by Password through bcrypt)
exports.companyUser_login = (req,res)=>{
    db.CompanyUser.findOne({
        where:{
            email: req.body.email
        }
    })
    .then(companyUser=>{
        if(!companyUser){
            res.setHeader('Content-type','application/json ; charset=utf-8');
            res.json({'message':'Login = KO : User not found'});
            res.status(400);
            res.end();
        }
        bcrypt.compare(req.body.password, companyUser.password, (err,result)=>{
            if (result) {
                jwt.sign({companyUser}, 'secureKey', {expiresIn: '1h'}, (err, token)=>{
                    res.setHeader('Content-type','application/json ; charset=utf-8');
                    if(err) {
                        console.log(err);
                        res.status(400);
                    }
                    res.json(token);
                    res.status(200);
                    res.end();
                });
            }
            else {
                res.setHeader('Content-type','application/json ; charset=utf-8');
                res.json({'message':'Login = KO : Password does not match'});
                res.status(400);
                res.end();
            }
        });
    });
};

// BEGIN LIST (Protected - only showing matching company_id companyUsers)
exports.companyUser_list = (req,res)=>{
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if(err){
            res.setHeader('Content-type','application/json ; charset=utf-8');
            res.sendStatus(403).send('ERROR: Could not connect to the protected route');
            res.end();
        }
        else {
            if(authorizedData.companyUser.id) {
                db.CompanyUser.findAll({
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

// BEGIN DETAILS (Protected - only for account owner or companyUsers with role_id=1 with matching company_id)
exports.companyUser_details = (req,res)=>{
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if(err){
            res.setHeader('Content-type','application/json ; charset=utf-8');
            res.sendStatus(403).send('ERROR: Could not connect to the protected route');
            res.end();
        }
        else {
            if(authorizedData.companyUser.role_id==1 && authorizedData.companyUser.company_id==req.body.company_id || authorizedData.companyUser.id == req.params.id) {
                db.CompanyUser.findOne({
                    where:{
                        'id': req.params.id,
                        'company_id' : (authorizedData.companyUser.company_id)
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

// BEGIN CREATE (Protected by req.body.companyEmail/req.body.companyPassword)
exports.companyUser_create = (req, res) => {
    db.Company.findOne({
        where:{
            email: req.body.companyEmail
        }
    })
    .then(company=>{
        if(!company){
            res.setHeader('Content-type','application/json ; charset=utf-8');
            res.json({'message':'Login = KO : Company not found'});
            res.status(400);
            res.end();
        }
        let role=2;
        db.CompanyUser.count({
            where:{
                company_id: company.id
            }
        })
        .then(int=>{
            if (int==0) {
                role=1;
            }
        })
        .catch(error=>{
            res.setHeader('Content-type','application/json ; charset=utf-8');
            res.json(error);
            res.status(400).send('400 Error');
            res.end();
        });
        bcrypt.compare(req.body.companyPassword, company.password, (err,result)=>{
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
                        res.setHeader('Content-type', 'application/json ; charset=utf-8');
                        res.json(data);
                        res.status(200);
                        res.end();
                    })
                    .catch(error => {
                        res.setHeader('Content-type', 'application/json ; charset=utf-8');
                        res.json(error);
                        res.status(400).send('400 ERROR');
                        res.end();
                    });
                });
            }
            else {
                res.setHeader('Content-type','application/json ; charset=utf-8');
                res.json({'message':'Login = KO : Password does not match'});
                res.status(400);
                res.end();
            }
        });
    })
    .catch(error => {
        res.setHeader('Content-type', 'application/json ; charset=utf-8');
        res.json(error);
        res.status(400).send('400 ERROR');
        res.end();
    });
};

// BEGIN EDIT (Protected - only for account owner or companyUser with role_id=1 with matching company_id)
exports.companyUser_edit = (req,res)=>{
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if(err){
            res.setHeader('Content-type','application/json ; charset=utf-8');
            res.sendStatus(403).send('ERROR: Could not connect to the protected route');
            res.end();
        }
        else {
            if(authorizedData.companyUser.role_id==1 && authorizedData.companyUser.company_id==req.body.company_id || authorizedData.companyUser.id == req.params.id) {
                bcrypt.hash(req.body.password, saltRounds, (err, hash)=> {
                    db.CompanyUser.update({
                        email:req.body.email,
                        name:req.body.name,
                        password:hash,
                        },{
                        where:{
                            'id':req.params.id,
                            'company_id' : authorizedData.companyUser.company_id
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

// BEGIN DELETE (Protected - only for account owner or companyUser with role_id=1 with matching company_id)
exports.companyUser_delete = (req,res)=>{
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if(err){
            res.setHeader('Content-type','application/json ; charset=utf-8');
            res.sendStatus(403).send('ERROR: Could not connect to the protected route');
            res.end();
        }
        else {
            if(authorizedData.companyUser.role_id==1 && authorizedData.companyUser.company_id==req.body.company_id || authorizedData.companyUser.id == req.params.id) {
                db.CompanyUser.destroy({
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