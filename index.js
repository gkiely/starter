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
let router      = express.Router();
let server      = require('http').Server(app);

// Postgres
// let db          = pgp(settings.postgres);
/*=====  End of Setup  ======*/



/*===============================
=            Helpers            =
===============================*/
let {extend, clone, log, handleQuery, handleResp, handleCatch, requireJson} = require('./server/helpers');
// ==== End of Helpers ====



/*====================================
=            Server Setup            =
====================================*/
if(settings.debug){
  app.use(logger);
}
let cookieExpire  = 365; // Days before login cookie expires
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressValidator());

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

if(settings.debug){
  app.use(logger);
}

// if(settings.debug){
//   app.use('/app', express.static('dist/app'));
//   app.use('/landing', express.static('dist/landing'));
// }
// else{
// }

app.use('/', express.static('dist'));
// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/dist/index.html');
// });
/*=====  End of Server Setup  ======*/





/*===========================
=            API            =
===========================*/
app.set('views', path.join(__dirname, 'dist/app'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', express.static('dist/app'));
app.get('/page', function(req, res, next){
  res.sendFile(__dirname + '/dist/app/index.html');
});

router.get('/app', function(req, res, next){
  return handleResp(res, {});
});

router.get('/test', function(req, res, next){
  var query = db.query('select * from user_view');
  handleQuery(res, query);
});

/*=====  End of Api  ======*/







/*==============================
=            Server            =
==============================*/

// -- Bind router
app.use('/api', router);

// -- Error handler
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send(err);
});

// -- Launch Server
server.listen(settings.port, function(){
  let ip = require('get-my-ip')();
  log(`=========================`)
  log(`Local: localhost:` + settings.port);
  log(`LAN:   ${ip}:${settings.port}`);
  log(`=========================`)
});