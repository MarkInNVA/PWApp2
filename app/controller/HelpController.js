Ext.define('PWApp2.controller.HelpController', {
    extend: 'Ext.app.Controller',

    requires: [ 'Ext.window.*', 
                'Ext.form.*', 
                'Ext.layout.container.Absolute' 
    ],

    config: {
    	myView: null
    },

    onLaunch: function() {
//      console.log('Help controller - launch');
		this.setMyView( Ext.widget('layout.helpview') );
    },

    init : function() {
// 		console.log('Help Controller : init');
 	   	me = this;

		this.control({
			'[xtype=layout.mapview] #showHelp' : {
				click: this.showHelp
			}
		});
    },

	showHelp : function() {
//    	console.log('show Help!');

        if ( this.getMyView().isVisible() ) {
            this.getMyView().hide();            
        } else {
            this.getMyView().show();
        }
	}
}); 