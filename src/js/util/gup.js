// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
// With mod to return true by default if name is present
function gup(name, url=window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  let results = regex.exec(url);

  if (!results){
    return null;
  }
  else if (results[0] && !results[2]){
    return true;
  }
  else{
    let val = decodeURIComponent(results[2].replace(/\+/g, " "));
    if(val === "undefined"){
      return undefined;
    }
    else{
      return val;
    }
  }
}
module.exports = gup;