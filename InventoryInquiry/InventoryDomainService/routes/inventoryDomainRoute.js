/**
 * Descriptin
 *
 * **/

var controller = require('./../controllers/inventoryDomainController.js');
var restify = require('restify');

/**
 *
 * @param server
 */
module.exports = function(server){

    server.post('/api/getInventoryEnquiry/post',controller.postInventoryEnquiry);

};
