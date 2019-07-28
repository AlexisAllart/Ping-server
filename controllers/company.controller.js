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
exports.company_login = (req,res)=>{
    db.Company.findOne({
        where:{
            email: req.body.email
        }
    })
    .then(data=>{
        if(!data){
            res.setHeader('Content-type','application/json ; charset=utf-8');
            res.json({'message':'Login = KO : User not found'});
            res.status(400);
            res.end();
        }
        bcrypt.compare(req.body.password, data.password, (err,result)=>{
            if (result) {
                jwt.sign({data}, 'secureKey', {expiresIn: '1h'}, (err, token)=>{
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

// BEGIN LIST (Public)
exports.company_list = (req,res)=>{
    db.Company.findAll({})
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
exports.company_details = (req,res)=>{
    db.Company.findOne({
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

// BEGIN CREATE (Public)
exports.company_create = (req,res)=>{
    bcrypt.hash(req.body.password, saltRounds, (err, hash)=> {
        db.Company.create({
            about:req.body.about,
            address:req.body.address,
            email:req.body.email,
            facebook:req.body.facebook,
            link:req.body.link,
            linkedin:req.body.linkedin,
            logo:'./assets/img/default.png',
            name:req.body.name,
            password:hash,
            phone:req.body.phone,
            twitter:req.body.twitter,
            role_id:1
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
};

// BEGIN EDIT (Protected - only for account owner)
exports.company_edit = (req,res)=>{
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if(err){
            res.setHeader('Content-type','application/json ; charset=utf-8');
            res.sendStatus(403).send('ERROR: Could not connect to the protected route');
            res.end();
        }
        else {
            if(authorizedData.company.id==req.params.id) {
                bcrypt.hash(req.body.password, saltRounds, (err, hash)=> {
                    db.Company.update({
                        about:req.body.about,
                        address:req.body.address,
                        email:req.body.email,
                        facebook:req.body.facebook,
                        link:req.body.link,
                        linkedin:req.body.linkedin,
                        name:req.body.name,
                        password:hash,
                        phone:req.body.phone,
                        twitter:req.body.twitter,
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

// BEGIN LOGO UPLOAD (Protected - only for account owner)
exports.company_logo = (req,res)=>{
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if(err){
            res.setHeader('Content-type','application/json ; charset=utf-8');
            res.sendStatus(403).send('ERROR: Could not connect to the protected route');
            res.end();
        }
        else {
            if(authorizedData.company.id==req.params.id) {
                db.Company.update({
                    logo:'./uploads/'+req.file.filename
                    },{
                    where:{
                        'id':req.params.id
                    }
                })
                .then(data=>{
                    res.setHeader('Content-type','application/json ; charset=utf-8');
                    res.json('Data successfully uploaded');
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

// BEGIN DELETE (Protected - only for account owner)
exports.company_delete = (req,res)=>{
    jwt.verify(req.token, 'secureKey', (err, authorizedData) => {
        if(err){
            res.setHeader('Content-type','application/json ; charset=utf-8');
            res.sendStatus(403).send('ERROR: Could not connect to the protected route');
            res.end();
        }
        else {
            if(authorizedData.company.id==req.params.id) {
                db.Company.destroy({
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