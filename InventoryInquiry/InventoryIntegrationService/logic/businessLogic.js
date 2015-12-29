/**
 * Created by bcp on 12/24/15.
 */
// function defined for parsing response on basis of request parameter for inventory_type and inventory_status

var modelRes = require('./../model/responseModel.js');

function type_status_filter(data,type_param_present,status_param_present,inventory_type,inventory_status,status){
    var resp;
    if (type_param_present == true || status_param_present == true){

        var each_res = [];
        var junk =[];

        data.forEach(function(raw) {


            var type = raw.inventory_type;
            var status = raw.inventory_status;

            if (type_param_present == true && status_param_present == true) {
                if(inventory_type.indexOf(type) > -1 && inventory_status.indexOf(status) > -1){
                    each_res.push(raw)
                }


            } else if (type_param_present == true) {

                if(inventory_type.indexOf(type) > -1){
                    each_res.push(raw)
                }


            } else if (status_param_present == true) {
                if(inventory_status.indexOf(status) > -1){
                    each_res.push(raw)
                }


            }else{
                junk.push(raw)
            }
        });
        resp = each_res;

    } else {

        resp = data;
    }

   var response =  modelRes.model(resp,status);
    return response;
}

module.exports.type_status_filter = type_status_filter;