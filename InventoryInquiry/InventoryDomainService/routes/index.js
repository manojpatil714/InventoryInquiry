/*jslint node: true, stupid: true */
'use strict';

/**
 * Descriptin
 *
 * **/

var fs = require('fs');

/**
 *
 * @param server
 */
module.exports = function (server) {
  fs.readdirSync('./routes').forEach(function (file) {
    if (file.substr(-3, 3) === '.js' && file !== 'index.js') {
      require('./' + file.replace('.js', ''))(server);
    }
  });
};
