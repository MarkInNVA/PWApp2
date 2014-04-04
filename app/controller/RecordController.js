Ext.define('PWApp2.controller.RecordController', {
    extend: 'Ext.app.Controller',

    models: [ ],
    stores: [ 'RecordStore' ],

    config: {
    	myCriteria: null,
    	myExtent: null
    },

    refs: [
        {
            ref: 'AGC',
            selector: 'agc'
        },
        {
            ref: 'recordView',
            selector: '[xtype=layout.recordview]'
        },
        {
        	ref: 'downloadButton',
        	selector: 'grid toolbar #downloadButton'
        },
        {
        	ref: 'expandButton',
        	selector: 'grid toolbar #expandButton'
        },
        {
        	ref: 'totalPointsTextField',
        	selector: '#totalPointsTextField'
        }       
    ],    

    init : function() {
    	var me = this;
//  		console.log('filterEditController : init');

        this.control({
          '[xtype=layout.recordview]': {
            itemclick: this.onItemClicked
          }
        });

        this.control({
          '#downloadButton': {
            click: this.onDownloadButtonClick
          }
        });

        this.control({
          '#expandButton': {
            click: this.onExpandButtonClick
          }
        });

  	   this.application.on({
              countUpdate: this.updateCount,
                scope: this
        });


       this.application.on({
              haveTotalPoints: this.updateTotal,
                scope: this
        });

	},
	showBusy: function() {
		//  console.log('showBusy before');
		Ext.MessageBox.wait('Creating spreadsheet', 'Please wait', {
		    interval: 300,
		    increment: 5
		});    
	}, 

	showNotBusy: function() {
		//  console.log('showNotBusy before !');
		if (Ext.MessageBox) {
		  Ext.MessageBox.hide();
		}
	},

	onExpandButtonClick: function() {
//		console.log('Expand Button Click !');
		this.getAGC().setMaxExtent();
	},

	onDownloadButtonClick: function() {
//		console.log('RecordController, onDownloadButtonClick - crit: ', this.getMyCriteria());
//		this.showBusy();
		 var e = this.getMyExtent();
		 var c = this.getMyCriteria();

		var url = 'resources/other/getss.php';
		var pf = '?criteria=' + c + '&xmin=' + e.xmin + '&xmax=' + e.xmax + '&ymax=' + e.ymax + '&ymin=' + e.ymin;
		console.log('RecordController, onDownloadButtonClick pf: ', pf);
		window.open(url + pf);
//		this.showNotBusy();
	},

	onItemClicked: function(grid, record) {
		var me = this;
		var map = this.getAGC().getArcMap();
		var agc = this.getAGC()

		var fl = map.getLayer("wells");
		var q = new esri.tasks.Query();
		var p = agc.getPopup();

		q.objectIds = [record.data.OBJECTID];
		fl.queryFeatures(q, function(featureSet) {
		  agc.selectPoint(featureSet.features[0]);  
		  var pp = new esri.geometry.Point(featureSet.features[0].geometry.x,featureSet.features[0].geometry.y,  featureSet.features[0].geometry.spatialReference);

		  p.setFeatures(featureSet.features);
		  p.show(pp);
		}); //.then(function( pp) {

	},

	updateTotal: function(tc) { 
		// console.log('updateTotal :', tc);
		// this.getMyRecordView().setTitle('Currently showing ' + tc + 
		//   ' sample points on map. To activate map, reduce number of points to below 1,000, either by applying a filter or changing map extent (pan or zoom).');
		//    console.log('RV :' , this.getView('RecordView')[0]); // this.getRecordView());
	},

	updateCount: function(tc, ec, mt, crit, critFullCnt, critInExtCnt, extent) { 
		this.setMyCriteria(crit);
		this.setMyExtent(extent);

		var message='';
		//    console.log('updateCount :', tc, ', ec :', ec, 'critInExtCnt :', critInExtCnt, ', crit :', crit );
	  	var dl = this.getDownloadButton(); 
	  	var exp = this.getExpandButton(); 
//	  	console.log("rc, update myCrit :", this.getMyCriteria())

		if (crit == '1=1') {
			exp.setDisabled(true);
//			this.getTotalPointsTextField().setVisible(true);
	    	message =  Ext.util.Format.number(ec, '0,0') + ' out of ' + Ext.util.Format.number(tc, '0,0') + ' samples visible.' 
	
		  	if (ec < 1000) {
		  		if (ec > 0) {
			  		dl.setDisabled(false);
		  		} else {
		  			dl.setDisabled(true);
		  		}
		  	} else {
		  		dl.setDisabled(true);		  	
//		    	message += Ext.util.Format.number(ec, '0,0') + ' samples visible.'         
		    	message += ' For details, reduce number of samples to below 1000. (see help)';
		  	}

		} else {  // have criteria
//			this.getTotalPointsTextField().setVisible(false);
			message = 'FILTERED: ' + Ext.util.Format.number(critInExtCnt, '0,0') + ' out of ' + Ext.util.Format.number(critFullCnt, '0,0') + ' filtered samples visible.';

    		if (critFullCnt  < 1000) {
    			// if (critInExtCnt < critFullCnt) {
					exp.setDisabled(false);
    			// } else {
    			// 	exp.setDisabled(true);	
    			// }
    				    			
    		} else {
    			exp.setDisabled(true);
    		}
		  
	  		if(critInExtCnt < 1000) {
	  			if (critInExtCnt > 0) {
		  			dl.setDisabled(false);
	  			} else {
	  				dl.setDisabled(true);
  				}
	//    		console.log('RecordController,updateCount - should show expan button');

	  		} else {
	  			exp.setDisabled(true);
	  			dl.setDisabled(true);		  	
		    	message += ' For details, reduce number of samples to below 1000. (see help)';

	    		// message += ' For details, reduce number of samples to below 1000, ' 
	    		// + ' either by applying a filter or changing map extent (pan or zoom).';

	  		}
		}
			this.getRecordView().setTitle(message); 
		  
		//    console.log('RV :' , this.getView('RecordView')[0]); // this.getRecordView());
	}

});

