Ext.define('PWApp2.view.filter.View', {
    extend: 'Ext.window.Window',
    alias: 'widget.filter.view',
    itemId: 'filteredit',

    requires:[ 'Ext.form.field.ComboBox' ],

    title: 'Filter',
    layout: 'border',
	bodyPadding: 5,
	x: 25,
	y: 120,
	height: 310,
//    height: 270,
	width: 360,
    closeAction: "hide",
//    width: 350,
  //  autoShow: true,

    initComponent: function() {
//      console.log('filter view : initCompent')

        var stateStore = Ext.StoreManager.lookup('StateStore');
  // //      var geolAgeStore = Ext.StoreManager.lookup('GeolAgeStore');
        var formationStore = Ext.StoreManager.lookup('FormationStore');
        var welltypeStore = Ext.StoreManager.lookup('WellTypeStore');
        var iddbStore = Ext.StoreManager.lookup('IDDBStore');

        // console.log('store.proxy.url :', geolAgeStore.getProxy().url);
 //        console.log('iddbStore :', iddbStore);
        this.items = [
            {
                xtype: 'form',
                itemId: 'editForm',
                autoScroll: true,
				height: 280,
				width: 340,
                bodyPadding: 10,
                layout: 'vbox',
                padding: 5,
                items: [
                    {
                        xtype: 'combo',
//                        myNameIs: 'IDDBCombo',
                        itemId: 'WellTypeCombo',
                        store: welltypeStore,
                        queryMode: 'local',
                        displayField: 'name',
                        forceSelection: false,
                        //valueField: 'name',
                        fieldLabel: 'Well Type',
                        labelWidth:75,
                       // placeHolder:'Geologic Age',
                        width: 295
                    } ,
                    {
                        xtype: 'combo',
//                        myNameIs: 'IDDBCombo',
                        itemId: 'IDDBCombo',
                        store: iddbStore,
                        queryMode: 'local',
                        displayField: 'name',
                        forceSelection: false,
                        //valueField: 'name',
                        fieldLabel: 'ID Database',
                        labelWidth:75,
                       // placeHolder:'Geologic Age',
                        width: 295
                    } ,
                    {
                        xtype: 'combo',
 //                       myNameIs: 'formationCombo',
                        itemId: 'formationCombo',
                        store: formationStore,
                        queryMode: 'local',
                        displayField: 'FORMATION',
                        forceSelection: false,
                        editable: true,
                        valueField: 'name',
                        fieldLabel: 'Formation',
                        labelWidth:75,
                        //placeHolder:'Pick a value',
                        width: 295
                    },
                    {
                        xtype: 'combo',
 //                       myNameIs: 'formationCombo',
                        itemId: 'StateCombo',
                        store: stateStore,
                        queryMode: 'local',
                        displayField: 'name',
                        forceSelection: false,
                        editable: true,
                        valueField: 'name',
                        fieldLabel: 'State',
                        labelWidth:75,
                        //placeHolder:'Pick a value',
                        width: 295

                    },                    
                    {   xtype: 'tbspacer', height: 10  },
                    {
                        xtype: 'filter.basinlineview',
                        itemId: 'basinlineview'
                    },
                    {
                        xtype: 'filter.chemlineview',
                    //    myNameIs: 'chemlineview1',
                        itemId: 'chemLine1'
                    },
                    {
                        xtype: 'filter.chemlineview',
                      //  myNameIs: 'chemlineview2'
                        itemId: 'chemLine2'
                    },
                    {
                        xtype: 'filter.chemlineview',
                      //  myNameIs: 'chemlineview3'
                        itemId: 'chemLine3'
                    }
                ]
            }                            
        ];

        this.buttons = [
            {
                text: 'Submit',
                itemId: 'submitButton',
                flex: 1
            },
            {
                text: 'Reset',
                flex: 1,
                itemId: 'resetButton'
            },
            {
                text: 'Close',
                itemId: 'closeButton',
                flex: 1

            }
        ];

        this.callParent(arguments);
    }
});
