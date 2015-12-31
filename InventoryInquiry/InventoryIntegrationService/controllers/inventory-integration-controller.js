'use strict';


var restify           = require('restify');
var configManager     = require('node-config-manager');
var bunyan            = require('bunyan');
var rest              = require('./../util/rest.js');
var utility           = require('./../util/utility.js');
var logic             = require('./../logic/businessLogic.js');
var domain			  = require('domain');
var validator         = require('./../schemaValidation/schema.js');
var revalidator       = require('revalidator');

var loggerConfig      = configManager.getConfig('logger');
var d				  = domain.create();


var log               = bunyan.createLogger({
								name          : 'inventory-integration-controller.js',
								level         : loggerConfig.logLevel,
								serializers   : bunyan.stdSerializers
                      });

var util              = new utility();
var restInstance      = new rest();





function inventoryEnquiry (req,res) {

	// validation of input request

	var validatorOfInput = validateRequest(req,res);

    // if valid request then go further
	if (validatorOfInput.valid == true) {
		// Get default options
		var options = util.getParseOptions();

		// path for parsing request business parameters
		var req_params = req.body.inventoryInquiry.businessSection;

		// get every parameters  values from request body
		var item_code_list = req_params.itemCodeList;
		var summary_unit = req_params.summaryUnit;
		var inventory_type_list = req_params.inventoryTypeList;
		var inventory_status_list = req_params.inventoryStatusList;




		// prepare array for only item code
		var item_code_string = item_code(item_code_list,res);


		// boolean for inventory_type_list and inventory_status_list

		var type_param_present = false;
		var status_param_present = false;


		// prepare array for inventory type
		if (inventory_type_list.length > 0) {
			type_param_present = true;
			var inventory_type = inventory_type_array(inventory_type_list,res);
		};

		//prepare array for inventory status
		if (inventory_status_list.length > 0) {
			status_param_present = true;
			var inventory_status = inventory_status_array(inventory_status_list,res);
		};

        // make param to send in required form to domain service
		var params = paramtoDomain(item_code_string,summary_unit,res);




// hit the domain service for getting response on basis of params
		var options = util.getParseOptions();
		//Define host
		options.host = 'localhost';
		//Define port
		options.port = 3003;
		//Define path
		options.path = '/api/getInventoryEnquiry/post';



		return restInstance.postJSON(options, params, function (status, data) {
			if (data.success == false) {
				res.send(data)
			} else {


				var resp = logic.type_status_filter(data,type_param_present,status_param_present,inventory_type,inventory_status,status);
				res.send(resp)
			}
		});
	}else{
		log.info(validatorOfInput.errors);
		res.send("error in request body")
	}
};


// validation function
function validateRequest(req){

	var input = req.body;
	var validatorOfInput = revalidator.validate(input, validator.schema);
	return validatorOfInput;
}


// make string of item code list from request body
function item_code(item_code_list){

	var item_code_array = [];
	item_code_list.forEach(function (item) {
		item_code_array.push(item.itemCode)
	    });
	var item_code_string = item_code_array.toString();
	return item_code_string;

}


// make array of inventory type list from request body
function inventory_type_array(inventory_type_list){

	var inventory_type = [];

	inventory_type_list.forEach(function (type) {
		inventory_type.push(type.inventoryType)
	});
	return inventory_type;

}



// make array of inventory status list from request body
function inventory_status_array(inventory_status_list){

	var inventory_status = [];
	inventory_status_list.forEach(function (status) {
		inventory_status.push(status.inventoryStatus)
	});
	return inventory_status
}



// make params for required in domain service
function paramtoDomain(item_code_string,summary_unit){
	var params = {
		"l2Code": item_code_string,
		"summaryUnit": summary_unit
	};
	return params;
}





	module.exports.inventoryEnquiry = inventoryEnquiry;
