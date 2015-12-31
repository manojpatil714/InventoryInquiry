/* jshint node: true */
'use strict';

/**
 * Descriptin
 *
 * **/

var pg              = require('pg');
var configManager   = require('node-config-manager');
var dbConfig        = configManager.getConfig('db');
var loggerConfig    = configManager.getConfig('logger');
var config          = configManager.getConfig('queries');
var inventoryModel  = require('./../model/responseModel.js');
var configData      = require('./queries');
var restify         = require('restify');
var queries         = require('./queryGenerator.js');
var errorModule     = require('./../exception/inventoryException.js');
var domain          = require('domain');
var d               = domain.create();

/**
 *
 * @param req
 * @param res
 */
function postInventoryEnquiry(req, res) {
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(dbConfig.database, function (err, client, done) {
        if (err) {
            done();
           return(res.json(errorModule.connectionerror(err)));

        }

        // parse the parameters
        var l2Code = req.l2Code.split(",");
        var summaryUnit = req.summaryUnit;

       // run query in db
        var query,sqlQuery;

        // query for consolidated summary nit
        if (summaryUnit == configData.summaryUnit.consolidated) {

            sqlQuery = queries.consolidatedQuery([l2Code]);
            query = client.query(sqlQuery,function(err,result){
                if (err) {
                    console.log("in error " + err.message);
                    return(res.json(errorModule.queryError(err)));
                }
            });
        };

        // query for eachWarehouse summary unit
        if (summaryUnit == configData.summaryUnit.Entirewarehouse) {

            sqlQuery = queries.wareHouseQuery([l2Code]);
            query = client.query(sqlQuery,function(err,result){
                if (err) {
                    console.log("in error")
                    return(res.json(errorModule.queryError(err)));
                }
            });
        }


        // get results of query row by row
        query.on('row', function (row) {
            var inventoryresponse = inventoryModel.inventoryEnquiryResponseModel(row);
            results.push(inventoryresponse);
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            done();
            console.log("inquiryResult: >>>  " + JSON.stringify(results));

            return res.json(results);
        });
    });
};

module.exports.postInventoryEnquiry = postInventoryEnquiry;
