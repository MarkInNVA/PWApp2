Ext.define('PWApp2.controller.MapController', {
    extend: 'Ext.app.Controller',
    requires: [ 'Ext.window.*', 
                'Ext.toolbar.Spacer', 
                'Ext.form.*', 
                'Ext.layout.container.Absolute' 
    ],

    models: [ ],
    stores: [ 
        'RecordStore'
    //    'FieldStore'
    ],

    refs: [
        {
            ref: 'AGC',
            selector: 'agc'
        },
        {
            ref: 'citeViewGrid',
            selector: '#citegrid'
        }
    ],
    config: {
        myView: null
    },
    init : function() {

		this.control({ 
			'[xtype=layout.mapview]  #initialExtent' : {
				click: this.initialExtent
			}
		});


        this.control({
            '[xtype=layout.mapview] #baseMapSwitch > menu' : {
                click: this.baseMapSwitch
            }
        });

        this.control({
            '[xtype=layout.mapview] #showSources' : {
                click: this.citeviewShow
            }
        });
	},

    onLaunch: function() {
    //  console.log('controller Main - launch');
        this.setMyView( Ext.widget('layout.citelistview') );
        //this.getMyView().setWidth(400);
    },

    initialExtent: function() {
//    	console.log('MapController : initExtent');
		this.getAGC().setInitExtent();
	},

    baseMapSwitch: function (t,e,eO) {
//        console.log('MapController : basemapSwitch');
        switch(e.text) {
            case 'Streets':
                this.getAGC().getArcMap().setBasemap('streets');
                break;
            case 'Topo':
                this.getAGC().getArcMap().setBasemap('topo');
                break;
            case 'Satellite':
                this.getAGC().getArcMap().setBasemap('satellite');
                break;
            case 'Hybrid':
                this.getAGC().getArcMap().setBasemap('hybrid');
                break;
            case 'Ocean':
                this.getAGC().getArcMap().setBasemap('oceans');
                break;
            case 'Nat Geo':
                this.getAGC().getArcMap().setBasemap('national-geographic');
                break;
        }
    },
    citeviewShow: function() {
      // console.log('show Sources! getmyview: ', this.getMyView());
      // console.log('citegrid : ', this.getCiteViewGrid());
        if ( this.getMyView().isVisible() ) {
            this.getMyView().hide();            
        } else {
            this.getMyView().show();
        } 
    }    
}); 