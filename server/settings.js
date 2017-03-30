require('dotenv').config();
let settings = {
  debug: true,
  port: 8000,
};


/**
 * Digital Ocean
 */
if(process.env.PROD){
  settings = {
    debug: false,
    port: 80,
  };
}

module.exports = settings;