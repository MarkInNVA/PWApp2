Ext.define('PWApp2.view.layout.HelpView', {
    extend: 'Ext.window.Window',
    alias: 'widget.layout.helpview',

    title : 'Help',
    height: 175,
    width : 375,
    bodyPadding: 5,
    layout: 'fit',
    closeAction: 'hide',

    initComponent: function() {
//        console.log('Help Controller - initComponent');
        this.items = 
        [
            {
                xtype: 'panel',
                autoScroll: true,
                padding: 10,
                html:   '<ul>' +
                            '<li>To make the map interactive, the numbers of samples in the viewport must be reduced to below 1000. Either filter (menu bar) the number of samples shows or change the map extent by panning or zooming</li>' +
                            '<li>Use "+" and "-"  buttons to zoom in and out.</li>' +
                            '<li>Place mouse pointer on map, push and hold left mount button, and drag to pan the map.</li>' +
                            '<li>Click on Initial Extent button to go back to full map view.</li>' +
                        '</ul>' 

            }
        ];
        this.callParent(arguments);  
    }
});