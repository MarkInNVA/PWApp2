/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when upgrading.
*/

Ext.Loader.setConfig({
	enabled: true,
	paths: {
		'Ext.ux' : 'app/ux'  
	}
});

Ext.require('Ext.Msg');

Ext.onReady(function(){
//     Ext.MessageBox.wait("Loading...", 'Please Wait'); 
//    console.log('body: ', Ext.getBody());

    var v = Ext.Msg.show({
        autoScroll: true,
        title: 'USGS Provisional Database Disclaimer',
        msg: 'You are aware of these limitations to data use and data quality.'  ,
        buttons: Ext.MessageBox.YESNO,
        defaultFocus:2,
  //      layout: 'absolute',
        style: { 'z-index':2050, align:'left'},
        // width:70,
        // height: 80,

        modal:false,
        closable: false,
        renderTo: Ext.getBody(),

        fn: function(btn, o) {
            if (btn == 'yes') { 
                Ext.application({
                    name: 'PWApp2',

                    extend: 'PWApp2.Application',

                    requires: ['Ext.ux.AGC', 'Ext.window.MessageBox' ],
                    
                    autoCreateViewport: true
                });
            } else {
                window.location.href="http://energy.usgs.gov";
            }
        }
    });
    //var v. = Ext.get('disc');
//    console.log('d: ', v)
    v.setY(380);

});
