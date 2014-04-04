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


Ext.application({
    name: 'PWApp2',

    extend: 'PWApp2.Application',

    requires: ['Ext.ux.AGC', 'Ext.window.MessageBox' ],
    
    autoCreateViewport: true
});
