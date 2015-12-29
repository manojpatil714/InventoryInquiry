/*jslint node: true*/
'use strict';

/**
 * Descriptin
 *
 * **/

var restify, configManager, dbConfig, loggerConfig, bunyan, dao, utility, domain, d;

restify           = require('restify');
configManager     = require('node-config-manager');
dbConfig          = configManager.getConfig('db');
loggerConfig      = configManager.getConfig('logger');
bunyan            = require('bunyan');
dao               = require('./../dao/inventoryDao.js');
utility           = require('./../util/utility.js');
domain			  = require('domain');
d				  = domain.create();

//TODO: Block Comment
var log         = bunyan.createLogger({
  name          : 'inventoryDomainController.js',
  level         : loggerConfig.logLevel,
  serializers   : bunyan.stdSerializers
});

/**
 * TODO: Add method description
 * @param req
 * @param res
 * @param next
 */
function postInventoryEnquiry (req,res,next){
    var data = req.body;
    dao.postInventoryEnquiry(data,res)
}

module.exports.postInventoryEnquiry = postInventoryEnquiry;