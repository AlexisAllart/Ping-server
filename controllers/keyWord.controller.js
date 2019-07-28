// DEPENDENCIES
// Sequelize
let db = require(`../models/index.js`);

// BEGIN
// BEGIN LIST (Protected - only for companyUsers & company)
exports.keyWord_list = (req,res)=>{
    if(authorizedData.companyUser.id || authorizedData.company.id) {
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
    }
    else {
        res.setHeader('Content-type','application/json ; charset=utf-8');
        res.sendStatus(403).send('403 - ACCESS DENIED');
        res.end();
    }
};

// BEGIN CREATE (Protected - only for companyUsers & company)
exports.keyWord_create = (req,res)=>{
    if(authorizedData.companyUser.id || authorizedData.company.id) {
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
};