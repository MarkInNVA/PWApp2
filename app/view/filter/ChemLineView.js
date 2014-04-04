Ext.define('PWApp2.view.filter.ChemLineView', {

	extend: 'Ext.panel.Panel',

	alias: 'widget.filter.chemlineview',

	initComponent: function(){
		var chemStore = Ext.StoreManager.lookup('ChemStore');		
		var mathStore = Ext.StoreManager.lookup('MathStore');

		this.items = [
			{
				xtype: 'panel',
				//flex: 1,
				layout: 'hbox',
				bodyPadding: 5,
				items:[
					{
						xtype: 'combo',
						myNameIs: 'chemCombo', 
						//  itemId: 'chemCombo',
						store: chemStore,
						queryMode: 'local',
						forceSelection: true,
						//editable: false,
						displayField: 'name',
						valueField: 'alias',
						fieldLabel: 'Chem :',
						labelWidth: 40,
						width: 130
					},
					{   xtype: 'tbspacer', width: 5  },
					{
						xtype: 'combo',
						myNameIs: 'mathCombo',
						store: mathStore ,
						forceSelection: true,
					//	editable: true,
						queryMode: 'local',
						align: 'center',
						displayField: 'name',
						valueField: 'name',
						labelWidth:0,
						width: 70
					},
					{   xtype: 'tbspacer', width: 5  },

					{
						xtype: 'textfield',
						myNameIs: 'chemText',
						//	fieldLabel: 'Criteria 2',
						value: '',
						width: 75
					}
				]
			}
		];
		this.callParent(arguments);
	}
});

