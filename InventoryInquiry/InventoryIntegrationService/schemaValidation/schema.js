module.exports= {
  schema : {
    properties: {
      "inventoryInquiry": {
        type: 'object',
        required: true,
        properties: {
          "businessSection": {
            type: 'object',
            required: true,
            properties: {
              "itemCodeList": {
                type: 'array',
                required: true,
                minItems : 1,
                items: {
                  type: 'object',
                  required: true,
                  properties: {
                    "itemCode": {
                      type: 'string',
                      allowEmpty: false,
                      required: true
                    }
                  }
                }
              }
              ,
              "summaryUnit": {
                type: 'string',
                enum: ["C", "E"],
                allowEmpty: false,
                required: true
              }
              ,
              "inventoryTypeList": {
                type: 'array',
                required: true,
                properties: {
                  "inventory_type": {
                    type: 'string',
                    allowEmpty: false,
                    required: false,
                  }
                }
              }
              ,
              "inventoryStatusList": {
                type: 'array',
                required: true,
                properties: {
                  "inventory_status": {
                    type: 'string',
                    allowEmpty: false,
                    required: false,
                  }
                }
              }
            }
          }
        }
      }
    }
  }

}

