/**
 * Modules (vendor)
 */

/*======================================
=            Vendor imports            =
======================================*/
let cookieParser      = require('cookie-parser');
let bodyParser        = require('body-parser');
let express           = require('express');
let expressValidator  = require('express-validator');

// Postgres
// let session           = require('express-session');
// let pgp               = require('pg-promise')();
// let pgSession         = require('connect-pg-simple')(session);
// let pwd               = require('pwd');
/*=====  End of Vendor imports  ======*/


/*===================================
=            App imports            =
===================================*/
let logger          = require('./server/logger');
let path            = require('path');
/*=====  End of App imports  ======*/

/*=============================
=            Setup            =
=============================*/
global.__base   = __dirname + '/';
let settings    = require('./server/settings');

let app         = express();
let api         = express.Router();
let server      = require('http').Server(app);
let prod        = process.env.NODE_ENV === 'production';

// Postgres
// let db          = pgp(settings.postgres);
function redirect(req, res, next) {
  var host = req.get('host');
  if(/^www\./.test(host)){
    host = host.substring(4, host.length);
    res.writeHead(301, {'Location':req.protocol + '://' + host + req.originalUrl,
        'Expires': new Date().toGMTString()});
    res.end();
  } else {
    next();
  }
}
/*=====  End of Setup  ======*/


/*===============================
=            Helpers            =
===============================*/
let {
  log, 
  // handleQuery, 
  handleResp, 
  // handleCatch,
  isPathAResourceRequest,
} = require('./server/helpers');

const handle404 = function(req, res) {
  return res.status(404).send(`'${req.path}' Not found`);
};
// ==== End of Helpers ====


/*====================================
=            Server Setup            =
====================================*/
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressValidator());
if(prod){
  app.use(redirect);  
}

// let cookieExpire  = 365; // Days before login cookie expires
// Postgres session
// app.use(session({
//   secret: 'securedsession',
//   resave: false,
//   saveUninitialized: true,
//   store: new pgSession({
//     pgPromise: db
//   }),
//   cookie: {
//     maxAge: new Date(Date.now() + (60 * 60 * 24 * cookieExpire * 1000)).getTime()
//   }
// }));
/*=====  End of Server Setup  ======*/


/*===========================
=            API            =
===========================*/

app.use('/', express.static('dist/app'));
app.get('/page', function(req, res, next){
  res.sendFile(__dirname + '/dist/app/index.html');
});

api.get('/app', function(req, res, next){
  return handleResp(res, {});
});

api.get('/test', function(req, res, next){
  handleResp(res, {success: 1})
});

/*=====  End of Api  ======*/


/*==============================
=            Server            =
==============================*/
app.use('/api', api);
app.use(express.static('dist'));

app.get('*', function(req, res){
  if(isPathAResourceRequest(req.path)) {
    return handle404(req, res);
  }
  else if(req.path.startsWith('/api/')){
    return handle404(req, res);
  }
  return res.sendFile(__dirname + '/dist/index.html');
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// -- Error handler
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send(err);
});

// -- Launch Server
server.listen(settings.port, function(){
  // let ip = require('get-my-ip')();
  log(`=========================`)
  log(`Local: localhost:` + settings.port);
  // log(`LAN:   ${ip}:${settings.port}`);
  log(`=========================`)
});