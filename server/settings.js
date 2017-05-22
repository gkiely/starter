require('dotenv').config();
let settings = {
  debug: true,
  port: 8000,
};


/**
 * Prod Env
 */
if(process.env.PROD){
  settings = {
    debug: false,
    port: 80,
  };
}

module.exports = settings;