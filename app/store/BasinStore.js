Ext.define('PWApp2.store.BasinStore', {
    extend: 'Ext.data.Store',

    requires: [
        'PWApp2.model.BasinModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            model: 'PWApp2.model.BasinModel',
            storeId: 'BasinStore',
            remoteFilter: true,
 //           filters: [{property: 'id', value: 1}],
            proxy: {
                type: 'ajax',
                url: 'resources/other/getDistinct.php?field=BASIN',
                // url: 'getDistinct.php?field=BASIN',
//                url: 'getDistinct.php',
                reader: {
                    type: 'json',
                    root: 'data',
                    record: 'attributes'
                }
            }
        }, cfg)]);
    }
});