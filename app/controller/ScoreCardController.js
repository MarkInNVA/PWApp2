Ext.define('PWApp2.controller.ScoreCardController', {
    extend: 'Ext.app.Controller',

    requires: [ 'Ext.window.*', 
                'Ext.form.*', 
                'Ext.layout.container.Absolute' 
    ],

    config: {
    	myView: null
    },
    refs: [
        {
        	ref: 'totalPoints',
        	selector: '#totalPoints'
        },
        {
        	ref: 'mapType',
        	selector: '#mapType'
        },
        {
        	ref: 'extentPoints',
        	selector: '#extentPoints'
        },
        {
        	ref: 'criteria',
        	selector: '#criteria'
        },
        {
        	ref: 'criteriaFullCount',
        	selector: '#criteriaFullCount'
        },
        {
        	ref: 'criteriaInExtCount',
        	selector: '#criteriaInExtCount'
        },
        {
        	ref: 'expandButton',
        	selector: 'grid toolbar #expandButton'
        }
    ],    

    onLaunch: function() {
    //  console.log('scoreCardController - launch');
		this.setMyView( Ext.widget('layout.scorecardview') );
//      console.log('scoreCardController - getMyView :', this.getMyView());
    },

    init : function() {
// 		console.log('scoreCardController : init');
 	   	me = this;

		this.control({
			'[xtype=layout.mapview] #showScore' : {
				click: this.showScore
			}
		});

		this.application.on({
    		countUpdate: this.updateTotals,
        	scope: this
    	});
    },

	showScore: function() {
//    	console.log('show Score!');
        if ( this.getMyView().isVisible() ) {
            this.getMyView().hide();            
        } else {
            this.getMyView().show();
        }			
	},
	
	updateTotals: function(tc, ec, mt, crit, critFullCnt, critInExtCnt) {
//		console.log('updateTotals, tc :', tc, ', ec :', ec, ', map type :', mt, ', crit : ', crit, ', crit full ext :', critFullCnt, ', crit in current ext :', critInExtCnt);

		this.getTotalPoints().setValue(tc);
		this.getMapType().setValue(mt);
		this.getExtentPoints().setValue(ec);

		if (crit == '1=1') {
			this.getCriteria().setValue('None');
		} else {
			this.getCriteria().setValue(crit);
		}

		this.getCriteriaFullCount().setValue(critFullCnt);
		this.getCriteriaInExtCount().setValue(critInExtCnt);
	}
}); 