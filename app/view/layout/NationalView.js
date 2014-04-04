Ext.define('PWApp2.view.layout.NationalView', {
    extend: 'Ext.window.Window',
    alias: 'widget.layout.nationalview',

    title : 'National View',
    height: 175,
    width : 240,
//    bodyPadding: 10,
    layout: 'hbox',
    closeAction: 'hide',
    autoScroll: true,

    initComponent: function() {
//        console.log('Help Controller - initComponent');
        this.items = 
        [
            {
                xtype      : 'radiogroup',
                itemId: 'myRadioGroup',
                //fieldLabel : 'Component',
                defaultType: 'radiofield',
                defaults: {
                  //  flex: 1
                },
                layout: 'vbox',
                items: 
                [
                    {
                        boxLabel  : 'Be',
                        name      : 'size',
                     //   inputValue: '',
                        id        : 'radioBe'
                    }, 
                    {
                        boxLabel  : 'Br',
                        name      : 'size',
                     //   inputValue: 'l',
                        id        : 'radioBr'
                    }, 
                    {
                        boxLabel  : 'Na',
                        name      : 'size',
                     //   inputValue: 'l',
                        id        : 'radioNa'
                    }
                ]
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