/**
 * Descriptin
 *
 * **/

var sequel = require('squel');

module.exports = {

    /**
     *
     * @param params
     * @returns {string}
     */
    wareHouseQuery: function(params){
        var query = sequel.select({tableAliasQuoteCharacter: ''})
            .field("wh.whse_cd")
            .field("item.l2_cd")
            .field("type.typ_desc")
            .field("status.stat_desc")
            .field("sum(stock.stk_brkup_qty)")
            .from("inventory.stock_breakup", "stock")
            .join("inventory.inventory_availability", "inv_avail", "inv_avail.inv_avil_id = stock.inv_avail_id")
            .join("inventory.sku_plu_map", "spmap", "spmap.sku_plu_id = inv_avail.sku_plu_id")
            .join("inventory.item ", "item", "item.item_id = spmap.item_id")
            .join("inventory.inventory_type ", "type", "type.typ_id = inv_avail.typ_id")
            .join("inventory.inventory_status ", "status", "status.stat_id = inv_avail.typ_id")
            .join("location.warehouse ", "wh", "wh.whse_id = inv_avail.whse_id")
            .where("item.l2_cd in ? ", params[0])
            .group("wh.whse_cd")
            .group("item.item_id")
            .group("type.typ_desc")
            .group("status.stat_desc");

        return query.toString();
       },

    /**
     *
     * @param params
     * @returns {string}
     */
    consolidatedQuery  : function(params){
        var query = sequel.select({tableAliasQuoteCharacter: ''})
            .field("item.l2_cd")
            .field("type.typ_desc")
            .field("status.stat_desc")
            .field("sum(stock.stk_brkup_qty)")
            .from("inventory.stock_breakup", "stock")
            .join("inventory.inventory_availability", "inv_avail", "inv_avail.inv_avil_id = stock.inv_avail_id")
            .join("inventory.sku_plu_map", "spmap", "spmap.sku_plu_id = inv_avail.sku_plu_id")
            .join("inventory.item ", "item", "item.item_id = spmap.item_id")
            .join("inventory.inventory_type ", "type", "type.typ_id = inv_avail.typ_id")
            .join("inventory.inventory_status ", "status", "status.stat_id = inv_avail.typ_id")
            .join("location.warehouse ", "wh", "wh.whse_id = inv_avail.whse_id")
            .where("item.l2_cd in ? ", params[0])
            .group("item.item_id")
            .group("type.typ_desc")
            .group("status.stat_desc");

        return query.toString();
    }

};

