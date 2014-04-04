Ext.define('PWApp2.store.FormationStore', {
    extend: 'Ext.data.Store',

    requires: [
        'PWApp2.model.FormationModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            model: 'PWApp2.model.FormationModel',
            storeId: 'FormationStore',
            remoteFilter: true,
 //           filters: [{property: 'id', value: 1}],
            proxy: {
                type: 'ajax',
                url: 'resources/other/getDistinct.php?field=FORMATION',
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