Ext.define('PWApp2.store.ChemStore', {
    extend: 'Ext.data.Store',
    storeId: 'ChemStore',

    fields: [ 'name', 'alias' ],
    data: [
        {name: 'ALK CaCO3', alias:'ALKCACO3'  },
        {name: 'Bromide', alias:'Br'  },
        {name: 'Calcium', alias:'Ca'  },
        {name: 'Chloride', alias:'Cl'  },
        {name: 'dD', alias:'dD'  },
        {name: 'd13C', alias:'d13C'},
        {name: 'd18O', alias:'d18O'  },
        {name: 'pH', alias:'PH' },
        {name: 'Potassium', alias:'K' },
        {name: 'TDS', alias:'TDS' },
        {name: 'TOC', alias:'TOC' },
        {name: 'Sodium', alias:'Na' },
        {name: 'Sulfate', alias:'SO4' }        
    ]    
});
