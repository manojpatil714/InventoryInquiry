#! /usr/bin/env node

/**
 * Descriptin
 *
 * **/

'use strict';
var restify, bunyan, routes, server, log, cfgManager, options, prettify;

//Create instances of required objects
restify = require('restify');
bunyan = require('bunyan');
routes = require('./routes');
cfgManager = require('node-config-manager');

options = {
  configDir   : './config',
  env         : process.env.NODE_ENV || 'development',
  camelCase   : true
};

cfgManager.init(options);
cfgManager.addConfig('logger');
cfgManager.addConfig('db');
cfgManager.addConfig('dbCol');

var loggerCfg = cfgManager.getConfig('logger');

log = bunyan.createLogger({
  name        :   'inventory-domain-service',
  level       :   loggerCfg.logLevel,
  path        :   loggerCfg.path,
  serializers :   bunyan.stdSerializers
});

server = restify.createServer({
  name    : 'inventory-domain-service',
  log     :  log
});

server.use(restify.bodyParser({mapParams : false}));
server.use(restify.queryParser());
server.pre(restify.pre.sanitizePath());


//server.on('after', restify.auditLogger({ log: log }));
server.on('after', function(req, res, route, err) {
  if (route && (route.spec.path === '_health')) {
    //Skip auditor logging if its health request
    return;
  }
  var auditer = restify.auditLogger({log:log});
  auditer(req, res, route, err);
});

routes(server);

server.on('uncaughtException', function(req, res, route, err) {
  var auditer = restify.auditLogger({log:log});
  auditer(req, res, route, err);
  res.send(500, "Unexpected error occured :" + err);
});

console.log('Server started.');
server.listen(3003, function () {
  log.info('%s listening at %s', server.name, server.url);
});
