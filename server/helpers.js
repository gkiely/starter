let path    = require('path');


let helpers = {
  beep(){
    // console.log("\007");
  },
  log(){
    console.log.apply(console, Array.prototype.slice.call(arguments));
  },
  handleQuery(res, query, count){
    return query
      .then(function(data){
        if(count){
          res.send(data[0].count);
        }
        else{
          res.send(data);
        }
        return data;
      })
      .catch(e => {
        helpers.handleCatch(res, e.message);
      });
  },
  handleResp(res, data){
    return res.send(data);
  },
  handleCatch(res, msg, code = 500){
    if(typeof res === "string" && !msg){
      this.beep();
      throw new Error('handleCatch: missing param res');
    }
    if(msg.message){
      msg = msg.message;
    }
    if(!res.status){
      this.beep();
      throw new Error('handleCatch: incorrect res param, res.status is not a property');
    }

    console.error(msg);
    return res.status(code)
      .send({message: msg})
  },
  rmw(str){
    return str.replace(/\n|\s*/g, '');
  },
  /**
   * Returns true if a path is a request for a static file.
   * eg isPathAResourceRequest('test.com/image.png') will return true
   * isUrlRequestingResource('test.com/live') will return false
   */
  isPathAResourceRequest(url){
    let filteredUrl = url.replace(/\/$/, "");
    let splitUrl = filteredUrl.split('/');
    let lastPath = splitUrl[splitUrl.length-1];

    return /[.]/.test(lastPath);//if last part contains a '.' eg /file.txt
  },
};


module.exports = helpers;