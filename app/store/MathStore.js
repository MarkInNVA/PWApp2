Ext.define('PWApp2.store.MathStore', {
    
    extend: 'Ext.data.Store',
    
    storeId: 'MathStore',

    fields: ['name' ],

    data : [
        { name: '<' },
        { name: '<=' },
        { name: '=' },
        { name: '>=' },
        { name: '>' }
    ] 
    	
});