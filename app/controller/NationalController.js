Ext.define('PWApp2.controller.NationalController', {
    extend: 'Ext.app.Controller',

    requires: [ 'Ext.window.*', 
                'Ext.form.*', 
                'Ext.layout.container.Absolute' 
    ],

    config: {
    	myView: null
    },

    onLaunch: function() {
// //      console.log('Help controller - launch');
 		this.setMyView( Ext.widget('layout.nationalview') );
    },

    init : function() {
// 		console.log('Help Controller : init');
 	   	me = this;

		this.control({
			'[xtype=layout.mapview] #showNational' : {
				click: this.showHelp
			}
		});
        this.control({
            '#myRadioGroup' : {
                change: this.onRadioChange
            }
        });
    },
    onRadioChange: function (t,n,o,eo) {
        console.log('onRadioChange! t: ', t, 'n: ', n, 'o: ',o);

    },
	showHelp : function() {
    	console.log('show National!');

        if ( this.getMyView().isVisible() ) {
            this.getMyView().hide();            
        } else {
            this.getMyView().show();
        }
	}
}); 