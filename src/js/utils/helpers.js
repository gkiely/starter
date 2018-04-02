/*eslint no-console: 0 */
import clone from 'clone';
import _extend from 'extend';
import query from 'query-string';
import {env as environments} from 'utils/constants';
import log from 'loglevel';
import {round} from 'lodash';
import React  from 'react';
import ReactDOM from 'react-dom';

const platform = (window.swm && window.swm.platform) || 'web';
export const isHbbTvPlatform = (platform === 'hbbtv');
export const isWebPlatform = (platform === 'web');

const pathname = window.location.pathname;
export const isHbbTvHomepage = (pathname === '/');
export const isHbbTvShowpage = (pathname !== '/');

export function extend(obj, newObj){
  let o = clone(obj);
  return _extend(o, newObj);
}

export {clone};

export const roundTo1DP = function(num) {
  return round(num, 1);
};

export function upperCaseFirst(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getPath(str){
  if(str.replace(/^\//, '')){
    return str;
  }
  return null;
}

export const makeAction = function(type, payload, error) {
  return {
    type,
    payload,
    error
  };
};

export function handlePath(prev, next){
  let path;
  if(next.location){
    path = getPath(next.location.pathname);
  }
  else{
    path = getPath(prev.location.pathname);
  }
  return path;
}

export function handleCatch(err){
  if(err.data){
    log.error(err.data.message);
    log.error(err);
  }
  else{
    log.error(err);
  }
}

export function logger(prefix){
  return function(...args){
    args.unshift(prefix + ':');
    log.debug.apply(log, args);
  }
}


export function rmw(str){
  return str.replace(/\n|\s*/g, '');
}

export function isEmpty(obj){
  if(obj.length){
    return false;
  }
  else{
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
}

/**
 * Returns formatted image proxy url
 * @param  {string}   src     image src
 * @param  {int}      width   width of default image
 * @param  {bool}     ratio   switch to toggle on/off pixelRatio
 * @return {string}   src     imageproxy url
 */
const pixelRatio = window.devicePixelRatio;
export function getImageProxyUrl(url, width, ratio = true){
  const proxyWidth = ratio ? width : Math.ceil(parseInt(width, 10) * pixelRatio);

  if ( window.swm.config.endpoints.imageproxy != null ) {
    url = `${window.swm.config.endpoints.imageproxy}?u=${url}&w=${proxyWidth}`;
  }
  return url;
}

/**
 * Device detection
 *
 * iOS:
 * https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
 */
const ua = window.navigator.userAgent;
export const device = {
  ios: /iPad|iPhone|iPod/.test(ua) && !window.MSStream,
  android: /Android/.test(ua),
}

/**
 * Browser detection
 */
export const browser = {
  ie11: !!window.MSInputMethodContext && !!document.documentMode,
  chrome: !!window.chrome,
}

/**
 * Get Url Parameter
 * @param  {string} query Parameter query
 * @param  {string} url  Optional Url to parse
 * @return {string|bool} Returns parameter value if present or boolean
 *
 * Docs:
 * http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 */
export function gup(query, url = window.location.href) {
  query = query.replace(/[\[\]]/g, "\\$&"); // eslint-disable-line no-useless-escape
  let regex = new RegExp("[?&]" + query + "(=([^&#]*)|&|#|$)");
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
      return val === 'true' ? true : val;
    }
  }
}

/**
 * Adds querystings parameters to a given URL and returns the URL as a string. Defaults
 * to document location href when no URL is passed
 * @param {string} url URL to add the parameters to
 * @param {*} params Parameters to add as query strings
 * @returns {string} An updated url string
 */
export function addQuerystring(url, params){
  return url + (url.includes('?') ? '&' : '?') + query.stringify(params);
}

// http://stackoverflow.com/questions/8936984/uint8array-to-string-in-javascript#answer-22373197
export function utf8ArrayToString(array){
  let out = '';
  let i = 0;
  const len = array.length;
  let c;
  let char2;
  let char3;

  while (i < len) {
    c = array[i++];
    switch (c >> 4) {
    case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
      out += String.fromCharCode(c);
      break;
    case 12: case 13:
      char2 = array[i++];
      out += String.fromCharCode(((c & 0x1F) << 6) |
        (char2 & 0x3F));
      break;
    case 14:
      char2 = array[i++];
      char3 = array[i++];
      out += String.fromCharCode(((c & 0x0F) << 12) |
        ((char2 & 0x3F) << 6) |
        ((char3 & 0x3F) << 0));
      break;
    default:
      break;
    }
  }
  return out;
}

/**
 * Dom event dispatcher
 */
export function dispatchEvent(el, type, detail){
  // Uses createEvent by default, as CustomEvent with constructor not currently supported by IE
  // Falls back to CustomEvent createEvent/initCustomEvent will eventually be deprecated
  if (document.createEvent) {
    let event = document.createEvent('CustomEvent');
    event.initCustomEvent(type, true, true, detail);
    document.dispatchEvent(event);
  } else {
    let event = new CustomEvent(type, {
      detail
    });
    document.dispatchEvent(event);
  }
}

export function isDevEnvironment(env) {
  return (env !== environments.production && env !== environments.staging);
}

export function scrollWindow(scrollDuration){
  let cosParameter = window.scrollY / 2;
  let scrollCount = 0;
  let oldTimestamp = performance.now();
  function step (newTimestamp) {
    scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
    if (scrollCount >= Math.PI) window.scrollTo(0, 0);
    if (window.scrollY === 0) return;
    window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
    oldTimestamp = newTimestamp;
    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
}

export function qs(query){
  return document.querySelector(query);
}

export function qsa(query){
  return Array.from(document.querySelectorAll(query));
}

export function renderToDom(parent, component){
  let el = document.createElement('div');
  parent.appendChild(el);
  ReactDOM.render(component, el);
}
