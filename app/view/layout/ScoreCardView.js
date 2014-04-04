Ext.define('PWApp2.view.layout.ScoreCardView', {
    extend: 'Ext.window.Window',
    alias: 'widget.layout.scorecardview',

    title : 'Scorecard',

    height: 245,
    width : 350,
    x: 25,
    y: 400,
    bodyPadding: 5,
    layout: 'vbox',
    closeAction: 'hide',

    initComponent: function() {
        // console.log('ScoreCard Controller - init');
        Ext.define('NumberWithSeperator', {
            extend: 'Ext.form.field.Display',
            alias: 'widget.numberwithseperator',
            valueToRaw: function(value) {
                return Ext.util.Format.number(value, '0,0');
            }
        })
        
        this.items = 
        [
            {
                xtype: 'displayfield',
                fieldLabel: 'Map type',
                itemId: 'mapType',
                value: 'Cached',
                labelWidth:175,
                width: 320
            },
            {
                xtype: 'numberwithseperator',
                itemId: 'totalPoints',
                fieldLabel: 'Total Pts',
                value: '55',
                labelWidth:175,
                width: 320
            },
            {
                xtype: 'numberwithseperator',
                itemId: 'extentPoints',
                fieldLabel: 'Pts in Extent',
                value: '',
                labelWidth:175,
                width: 320
            },
            {
                xtype: 'textarea',
                itemId: 'criteria',
                fieldLabel: 'Criteria',
                disabled: true,
                value: '',
                labelWidth:45,                      
                width: 325,
                height: 60
            }, 
            {
                xtype: 'numberwithseperator',
                itemId: 'criteriaFullCount',
                fieldLabel: 'Crit. pts in full extent',
                value: '0',
                labelWidth:175,                        
                width: 320
            }, 
            {
                xtype: 'numberwithseperator',
                itemId: 'criteriaInExtCount',
                fieldLabel: 'Crit. pts in current extent',
                value: '0',
                labelWidth:175,
                width: 320
            }
        ];
        this.callParent(arguments);  
    }
});
