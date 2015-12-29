/**
 * Created by Akash on 12/27/2015.
 */

function model(resp,status){

    var house=[];
    resp.forEach(function(ware){
        house.push(ware.WH_Code)
    })

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

// usage example:
    var unique = house.filter( onlyUnique );

    var model = [];


    unique.forEach(function(each){
        var WH = each;
        var item_list = [];
        resp.forEach(function(WhCode){
            if(WH == WhCode.WH_Code){
                var itemEach = {
                    "itemCode": WhCode.item_code,
                    "inventoryType":  WhCode.inventory_type,
                    "inventoryStatus":  WhCode.inventory_status,
                    "qty": WhCode.qty
                }
                item_list.push(itemEach);
            }
        })

        var locationEach = {
            "locationCode" : WH,
            "itemList" : item_list
        }
        model.push(locationEach);

    })

    var z = 0;

    if(status == 200){z++}



    if(unique[0] === undefined){



        var modelRes = {
            "inventoryInquiry": {
                "resultCode": z,
                "data": {
                    "locationList":[
                        {
                            "locationCode" : "Consolidated",
                            "itemList": model
                        }
                    ]

                }
            }
        }

        return modelRes;


    }else {

        var modelRes = {
            "inventoryInquiry": {
                "resultCode": z,
                "data":{
                    "locationList" : model
                }
            }
        }

        return modelRes;
    }

}


module.exports.model = model;