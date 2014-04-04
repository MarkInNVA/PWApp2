Ext.define('PWApp2.store.WellTypeStore', {
    
    extend: 'Ext.data.Store',
    
    storeId: 'WellTypeStore',

    fields: ['name' ],

    data : [
        { name: 'CBM' },
        { name: 'CONVENTIONAL HYDROCARBON' },
        { name: 'GEOTHERMAL' },
        { name: 'SHALE GAS' },
        { name: 'TIGHT GAS' },
        { name: 'TIGHT OIL' },
        { name: 'UNKNOWN' },
        { name: 'WATER' }
    ] 
    	
});
