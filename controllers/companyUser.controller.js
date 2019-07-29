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
                        'company_id': authorizedData.company_id
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

// BEGIN DETAILS (Protected - only for account owner or companyUsers with role_id=1)
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
                        'company_id' : (authorizedData.companyUser.company_id || authorizedData.company.id)
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

// A VERIFIER EN DETAIL ! PROBLEME DE CHECK SUR PASSWORD !!!!!!!!!!!!!!!!!
// BEGIN CREATE (Protected by req.body.companyEmail/req.body.companyPassword)
exports.companyUser_create = (req,res)=>{
    bcrypt.hash(req.body.password, saltRounds, (err, hash)=> {
        let companyList;
        db.Company.findAll({})
        .then(data=>{
            companyList=data;
        })
        .catch(error=>{
            console.log(error);
        });
        
        bcrypt.compare(req.body.companyPassword, companyList.password, (err,result)=>{
            if (result) {
                if(err) {
                    console.log(err);
                }
                let matchFound=false;
                for (let i=0;i<companyList.length;i++) {
                    if (companyList.email==req.body.companyEmail) {
                        matchFound=true;
                        break;
                    }
                }
                if (matchFound) {
                    db.CompanyUser.create({
                        email:req.body.email,
                        name:req.body.name,
                        password:hash,
                        company_id:companyList.id,
                        role_id:2
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
            else {
                res.setHeader('Content-type','application/json ; charset=utf-8');
                res.json({'message':'Account creation = KO : Password does not match'});
                res.status(400);
                res.end();
            }
        });
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
            if(authorizedData.companyUser.id==req.params.id || authorizedData.companyUser.role_id==1 && authorizedData.companyUser.company_id==req.body.company_id) {
                bcrypt.hash(req.body.password, saltRounds, (err, hash)=> {
                    db.CompanyUser.update({
                        email:req.body.email,
                        name:req.body.name,
                        password:hash,
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
                    if(authorizedData.companyUser.role_id==1 && authorizedData.companyUser.company_id==req.body.company_id) {
                        db.CompanyUser.update({
                        role_id:req.body.role_id,
                        },{
                        where:{
                            'id':req.params.id
                            }
                        });
                    }
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
            if(authorizedData.companyUser.id==req.params.id || authorizedData.companyUser.role_id==1 && authorizedData.companyUser.company_id==req.body.company_id) {
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