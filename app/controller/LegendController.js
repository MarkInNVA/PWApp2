Ext.define('PWApp2.controller.LegendController', {
    extend: 'Ext.app.Controller',

    requires: [ 'Ext.window.*', 
                'Ext.form.*', 
                'Ext.layout.container.Absolute' 
    ],

   config: {
        myView: null,
        myId: null,
        layers: null
    },

    // refs: [
    //     {
    //         ref: 'AGC',
    //         selector: 'agc'
    //     }
    // ],

    onLaunch: function() {
//        console.log('Legend controller - launch');
        this.setMyView( Ext.widget('layout.legendview') ); 
//        console.log('Legend controller - launch, this.getMyView :', this.getMyView());
//        this.showLegend();
    },

    init : function() {
// 		console.log('Legend Controller : init');
 	   	var me = this;

		this.control({
			'[xtype=layout.mapview] #showLegend' : {
				click: this.showLegend
			}
		});

        this.application.on({
            wellsLoaded: this.wellsLoaded,
            scope: this
        });

        this.callParent(arguments);        

    },

    wellsLoaded: function() {

//         console.log('Legend Controller Init, Wells loaded!');
//         var s = this.getAGC().getArcMap().getLayer('wells');
//         var m = this.getAGC().getArcMap();

//         this.setMyView( Ext.widget('layout.legendview') );        
//         console.log('Legend Controller Init, myView:',this.getMyView());

//         var local_id = this.getMyView().getId();

//         this.setMyId(local_id);
//         var d = Ext.dom.Element.addChild(local_id, '<div id= "myDiv"> </div>');

//         console.log('local_id :', local_id);


//         var layers = [
//             {
//                 layer: s,
//                 title: 'ID Database'
//             }
//         ];
//         console.log('Legend Controller Init, Wells loaded event layers:',layers);

//         var legend = new esri.dijit.Legend({
//             map: m,
//             layerInfos: layers
//         }, 'legend' );
// //        }, this.getMyId() );

//         legend.startup();
    },

	showLegend : function() {
//    	console.log('show Help!');

        if ( this.getMyView().isVisible() ) {
            this.getMyView().hide();            
        } else {
            this.getMyView().show();
        }
	}
}); 