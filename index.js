/**
 * Modules (vendor)
 */
let express           = require('express');


/**
 * Modules (app)
 */

let logger          = require('./server/logger');
let brokenApi       = require('./server/break-api');
var path            = require('path');


/**
 * Globals
 */
global.__base = __dirname + '/';

/**
 * Settings
 */
let settings = require('./server/settings');


/**
 * Instances
 */
let app         = express();
let router      = express.Router();
let server      = require('http').Server(app);
let _           = require('lodash');



/*===============================
=            Helpers            =
===============================*/
let {extend, clone, log, handleQuery, handleResp, handleCatch, requireJson} = require('./server/helpers');
// ==== End of Helpers ====


/*=====================================
=            Server Config            =
=====================================*/
if(settings.debug){
  app.use(logger);
}
// app.use(brokenApi);
/*=====  End of Server Config  ======*/




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
})

// -- Launch Server
server.listen(settings.port, function(){
  log('Server started, listening on localhost:' + settings.port);
});






