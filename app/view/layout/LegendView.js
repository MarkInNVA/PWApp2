Ext.define('PWApp2.view.layout.LegendView', {
    extend: 'Ext.window.Window',
    alias: 'widget.layout.legendview',

    title : 'Legend',
    height: 246,
    width : 225,
    x: 25,
    y: 150,
//    bodyPadding: 10,
    layout: 'hbox',
    closeAction: 'hide',
    autoScroll: true,

    initComponent: function() {
//        console.log('Help Controller - initComponent');
        this.items = 
        [
            {
                xtype: 'image',
                src: 'resources/images/legend3.png',
                width: 212,

                height: 214
            }
            // {
            //     xtype:  'panel',
            //     autoEl: {
            //         tag: 'div',
            //         id: 'legend',
            //         width: 350,
            //         height: 300,
            //         html: 'Hi'

            //     }
            // }
        ];
        this.callParent(arguments);  
    }
});