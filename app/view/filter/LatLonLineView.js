Ext.define('PWApp2.view.filter.LatLonLineView', {

	extend: 'Ext.panel.Panel',

	alias: 'widget.filter.latlonlineview',

	initComponent: function(){
		var mathStore = Ext.StoreManager.lookup('MathStore');

		this.items = [
			{
				xtype: 'panel',
				//flex: 1,
				layout: 'hbox',
				bodyPadding: 5,
				items:[
					{  // 285
						xtype: 'combo',
						myNameIs: 'latCombo',
						store: mathStore ,
						forceSelection: true,
					//	editable: true,
						queryMode: 'local',
						align: 'center',
						displayField: 'name',
						valueField: 'name',
						fieldLabel: 'Lat',
						labelWidth:35,
						width: 85
					},
					{   xtype: 'tbspacer', width: 5  },

					{
						xtype: 'textfield',
						myNameIs: 'latText',
						//	fieldLabel: 'Criteria 2',
						value: '',
						width: 45
					},
					{   xtype: 'tbspacer', width: 15  },
					{  // 285
						xtype: 'combo',
						myNameIs: 'lonCombo',
						store: mathStore ,
						forceSelection: true,
					//	editable: true,
						queryMode: 'local',
						align: 'center',
						displayField: 'name',
						valueField: 'name',
						fieldLabel: 'Long',
						labelWidth: 35,
						width: 85
					},
					{   xtype: 'tbspacer', width: 5  },

					{
						xtype: 'textfield',
						myNameIs: 'lonText',
						//	fieldLabel: 'Criteria 2',
						value: '',
						width: 45
					}
				]
			}
		];
		this.callParent(arguments);
	}
});

