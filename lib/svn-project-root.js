
'use strict';

/**
 * Get the normalized project root url
 * 
 * Determines the root url for this svn project:
 *
 * - Looks in CWD for a package.json
 *   - [has package.json?] Check for `svn` repo type and a url listing
 *   - [no package.json?] Run `svn-info` from CWD and work with reported url
 *
 * @param {Function} cb The callback, gets a possible error and the url path
 */
module.exports = function(cb) {
  /**
   * @todo
   */
  process.nextTick(function() {
    cb(null, 'boo!');
  });
};

/**
 * Returns the normalized project root url
 *
 * Same as the async version but the detected and normalized url is returned
 * rather than passed to a callback.
 *
 * @return {String} The root url
 */
module.exports.sync = function() {
  /**
   * @todo
   */
  return 'boo!';
};

/**
 * Normalize a svn project url
 *
 * In particular:
 *
 * - Strip away [trunk|branches|tags]
 * - Remove embedded auth creds
 *
 * @param {String} url The url to normalize
 * @return {String} The normalized url
 */
module.exports.normalize = function(url) {
  var pUrl = require('url').parse(url);

  // First chop everything after first occurance of trunk|branches\tags
  var roots = ['trunk', 'branches', 'tags']
    , urlParts = pUrl.pathname.split('/').filter(function(p) { return p.length > 0;})
    , numParts = urlParts.length
    , ixRoots = [numParts];

  urlParts.forEach(function(part, ixPart) {
    if(roots.indexOf(part) > -1) {
      ixRoots.push(ixPart);
    }
  });

  ixRoots.sort();
  urlParts.splice(ixRoots[0]);

  var choppedUrl = urlParts.join('/')
    , finalUrl = choppedUrl;

  // url.parse takes care of the auth stuff for us
  if(pUrl.protocol) {
    var host = pUrl.port ? pUrl.hostname + ':' + pUrl.port : pUrl.hostname;
    finalUrl = pUrl.protocol + '//' + [host, choppedUrl].join('/');
  }
  
  return finalUrl;
};
