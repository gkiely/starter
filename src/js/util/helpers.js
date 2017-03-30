let clone = require('clone');
let _extend = require('extend');


let helpers = {
  // uid() {
  //     // http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
  //     return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4)
  // },
  extend(obj, newObj){
    let o = clone(obj);
    return _extend(o, newObj);
  },
  upperCaseFirst(str){
      return str.charAt(0).toUpperCase() + str.slice(1);
  },
  getPathFromUrl(url) {
    return url.split("?")[0];
  },
  getPath(hash){
    return getPathFromUrl(hash.replace('#', ''))
  },
  handleCatch(err){
    if(err.data){
      console.log(err.data.message);
      console.log(err);
    }
    else{
      console.log(err);
    }
  },  
  log(){
    console.log.apply(console, Array.prototype.slice.call(arguments));
  },
  rmw(str){
    return str.replace(/\n|\s*/g, '');
  }
};

module.exports = helpers;