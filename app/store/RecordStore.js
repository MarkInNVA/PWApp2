Ext.define('PWApp2.store.RecordStore', {
    extend: 'Ext.data.Store',
    model: 'PWApp2.model.RecordModel',
    autoLoad: true,
    data: null,

    proxy: {
    	type: 'memory',
    	reader: {
    		type:'json' //,
    	}
    }

});
