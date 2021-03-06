// DEPENDENCIES
// Express
const express = require('express');
const app = express();

// Body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS
var cors = require('cors')

// PUBLIC DIRECTORY
let path = require('path');
let dir = path.join(__dirname, 'public');
app.use(express.static(dir));

// VARS & CONSTS
const user = require('./routes/user.route');
const company = require('./routes/company.route');
const companyUser = require('./routes/companyUser.route');
const offer = require('./routes/offer.route');
const contractType = require('./routes/contractType.route');
const keyWord = require('./routes/keyWord.route');
const role = require('./routes/role.route');
const status = require('./routes/status.route');
const tag = require('./routes/tag.route');
const ping = require('./routes/ping.route');
const selection = require('./routes/selection.route');

require('events').EventEmitter.defaultMaxListeners = 50;

// BEGIN
app.use(cors());
app.use('/user', user);
app.use('/company', company);
app.use('/companyUser', companyUser);
app.use('/offer', offer);
app.use('/contractType', contractType);
app.use('/keyWord', keyWord);
app.use('/role', role);
app.use('/status', status);
app.use('/tag', tag);
app.use('/ping', ping);
app.use('/selection', selection);

app.get('/', function(req, res) {
    res.send('Ping status = ONLINE');
});

app.listen(process.env.PORT || 9090);
// END