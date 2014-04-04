Ext.define('PWApp2.view.layout.RecordView', {
	extend: 'Ext.grid.Panel',

	alias: 'widget.layout.recordview',

    requires:[ 
        'Ext.layout.container.Fit',
        'Ext.grid.column.Number'
    ], 

	store: 'RecordStore',
	multiSelect: true,

    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },

    width:500,
    height:250,

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        width: 500,
        items: [
            {
                xtype: 'button',
                text: 'Download CSV Data',
                itemId: 'downloadButton',
                disabled: true
            },
            {
                xtype: 'button',
                text: 'Show Extent of Current Filter',
                itemId: 'expandButton',
                disabled: true
            }
        ]
    }],

//    scroll: true,
    initComponent: function() {
//      console.log('RecordView initComponent');
        this.columns = [
            {header: 'ObjectId', dataIndex: 'OBJECTID', hidden: true},
            {header: 'ID USGS',  dataIndex: 'IDUSGS',  width:75, align:'right', style:'text-align:center'},
            {header: 'API',  dataIndex: 'API',  width:125, align:'right', style:'text-align:center'},
            {header: 'Latitude',  dataIndex: 'LAT',  width:80, xtype:'numbercolumn', format: '0.0#', align:'right', style:'text-align:center'},
            {header: 'Longitude',  dataIndex: 'LONG_',  width:85, xtype:'numbercolumn', format: '0.0#', align:'right', style:'text-align:center' },
            {header: 'STATE',  dataIndex: 'STATE',  width:125, align:'left', style:'text-align:center'},
            {header: 'Well Type',  dataIndex: 'WELLTYPE',  width:110, align:'left', style:'text-align:center'},
            {header: 'Formation',  dataIndex: 'FORMATION',  width:150, align:'left', style:'text-align:center'},
            {header: 'Geologic Age',  dataIndex: 'GEOLAGE',  width:150, align:'left', style:'text-align:center'},
            {header: 'Upper Depth',  dataIndex: 'DEPTHUPPER',  width:100, xtype:'numbercolumn', format: '0,0', align:'right', style:'text-align:center'},
            {header: 'Lower Depth',  dataIndex: 'DEPTHLOWER',  width:100, xtype:'numbercolumn', format: '0,0', align:'right', style:'text-align:center'},
            {header: 'Reference',  dataIndex: 'REFERENCE',  width:150, align:'left', style:'text-align:center'},
            {header: 'TDS',  dataIndex: 'TDS',  width:75, xtype:'numbercolumn', format: '0,0', align:'right', style:'text-align:center'},
            {header: 'TOC',  dataIndex: 'TOC',  width:75, xtype:'numbercolumn', format: '0,0', align:'right', style:'text-align:center'},
            {header: 'pH', dataIndex: 'PH', width:60, xtype:'numbercolumn', format: '0.0', align:'right', style:'text-align:center'},

            {header: 'ALKCACO3', dataIndex: 'ALKCACO3', width:100, xtype:'numbercolumn', format: '0,0', align:'right', style:'text-align:center'},
            {header: 'Bromide', dataIndex: 'Br', width:80, xtype:'numbercolumn', format: '0,0', align:'right', style:'text-align:center'},
            {header: 'Calcium', dataIndex: 'Ca', width:80, xtype:'numbercolumn', format: '0,0', align:'right', style:'text-align:center'},
            {header: 'Chloride', dataIndex: 'Cl', width:80, xtype:'numbercolumn', format: '0,0', align:'right', style:'text-align:center'},
            {header: 'Potassium', dataIndex: 'K', width:90, xtype:'numbercolumn', format: '0,0', align:'right', style:'text-align:center'},
            {header: 'Sodium', dataIndex: 'Na', width:80, xtype:'numbercolumn', format: '0,0', align:'right', style:'text-align:center'},
            {header: 'Sulfate', dataIndex: 'SO4', width:70, xtype:'numbercolumn', format: '0,0', align:'right', style:'text-align:center'},
            {header: 'dD', dataIndex: 'dD', width:60, xtype:'numbercolumn', format: '0,0', align:'right', style:'text-align:center'},
            {header: 'd13C', dataIndex: 'd13C', width:60, xtype:'numbercolumn', format: '0,0', align:'right', style:'text-align:center'},
            {header: 'd180', dataIndex: 'd18O', width:60, xtype:'numbercolumn', format: '0,0', align:'right', style:'text-align:center'}
        ];

        this.callParent(arguments);
    }
}); 



