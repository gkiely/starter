// let _           = require('lodash');

/**
 * Simulates a new component
 */

let methods = {
  newComponent(){

  },
  removeComponent(){

  },
  longTitle(){

  },
  longText(){
    
  },
  removeComponent(){

  },
  emoji(){

  },
  stringText(){

  }
};







module.exports = function(req, res, next){
  // let start   = +new Date();
  let stream  = process.stdout;
  let url     = req.url;
  let method  = req.method;

  let {test} = req.query;

  if(test){
    let arr = test.split(',')

    arr.map(item => {
      // Get json here
      methods[item]()
    });

  }

  res.on('finish', function(){
    // let duration = +new Date() - start;
    // let message = `${method} to ${url} took ${duration} ms\n`;
    // stream.write();

  });

  next();
};