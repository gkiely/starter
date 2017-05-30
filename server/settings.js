// Static
// require('dotenv').config();
// let settings = {
//   debug: true,
//   port: 8000,
// };


// /**
//  * Prod Env
//  */
// if(process.env.PROD){
//   settings = {
//     debug: false,
//     port: 80,
//   };
// }

// module.exports = settings;



// Database Driven
require('dotenv').config();
let settings = {
  debug: true,
  port: 8000,
  postgres: {
    host: 'localhost',
    port: 5432,
    user: 'grantkiely',
    password: null,
    database: 'userfeedback',
  }
};


/**
 * Prod env
 */
if(process.env.PROD){
  settings = {
    debug: false,
    port: 80,
    postgres: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: process.env.PASS,
      database: 'userfeedback',
    }
  };
}

module.exports = settings;