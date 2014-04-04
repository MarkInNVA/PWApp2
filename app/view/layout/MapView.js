Ext.define('PWApp2.view.layout.MapView', {
	extend: 'Ext.panel.Panel',

	alias: 'widget.layout.mapview',

    requires:[ 'Ext.layout.container.Fit' ], 

	layout:{
		type: 'hbox',
		pack: 'start',
		align: 'stretch'
	},

	initComponent: function(){
		var me = this;
		this.items = [
			{
				xtype: 'panel',
				flex: 1,
				layout: 'fit',
				tbar: [
					{
						xtype: 'button',
						text: 'Initial Extent',
						itemId: 'initialExtent'
					},
					{
						xtype: 'button',
						text: 'Filter',
						itemId: 'showFilter'
					},
					{
						xtype: 'button',
						text: 'Basemap',
						itemId: 'baseMapSwitch',
						anchorSize:75,
						menu: [
								{text: 'Topo' },
								{text: 'Streets' }, 
								{text: 'Satellite'},
								{text: 'Hybrid'},
								{text: 'Ocean' },
								{text: 'Nat Geo' }
						]
					},
					{
						xtype: 'button',
						text: 'Sources',
						itemId: 'showSources'
					},										
					{
						xtype: 'button',
						text: 'Legend',
						itemId: 'showLegend'
					},

					// {
					// 	xtype: 'button',
					// 	text: 'National View',
					// 	itemId: 'showNational'
					// },					
					{	xtype: 'tbfill' },
					{
						xtype: 'tbtext',
						text:  '<a href="http://energy.usgs.gov/EnvironmentalAspects/EnvironmentalAspectsofEnergyProductionandUse/ProducedWaters.aspx">Project Website</a>'
					},					{
						xtype: 'button',
						text: 'Help',
						itemId: 'showHelp'
					},
					
					{   xtype: 'tbspacer', width: 20  }
				],
				items:[
					{
						itemId: 'locationmap',
						xtype: 'agc'
					}
				]
			}
		];
		this.callParent(arguments);
	}
});