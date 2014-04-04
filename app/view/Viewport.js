Ext.define('PWApp2.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Border'
    ],

    layout: {
        type: 'border'
    },

    items: [
        {
            xtype: 'layout.recordview',
            layout: 'fit',
            scroll: true,
            region: 'south',
            collapsible: true,
            split: true,
            height: 175
        },

        {
            xtype: 'layout.mapview',
            region: 'center'
        }
    ]
});
