let clone   = require('clone');
let _extend = require('extend');
let path    = require('path');
let uuid        = require('uuid/v4');


let helpers = {
  addComponent(obj, {id, component, json}){
    let result = clone(obj);
    result.layout.push({
      id,
      component,
    });
    result.items[id] = _extend(json, {
      id
    });
    return result;
  },
  clone,
  extend(obj, newObj){
    let o = clone(obj);
    return _extend(o, newObj);
  },
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
  getId(){
    return uuid().substr(0, 7);
  },
  rmw(str){
    return str.replace(/\n|\s*/g, '');
  }
};


module.exports = helpers;