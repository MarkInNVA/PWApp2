Ext.define('PWApp2.controller.FilterController', {
    extend: 'Ext.app.Controller',
    requires: [ 'Ext.window.*', 
                'Ext.toolbar.Spacer', 
                'Ext.form.*', 
                'Ext.layout.container.Absolute' 
    ],

    config: {
//        myMap: null,
        filter: null
    },

    models: [ ],
    stores: [ 
        'ChemStore', 
        'MathStore', 
        'IDDBStore', 
        'FormationStore', 
        'StateStore', 
        'BasinStore',
        'WellTypeStore' 
    ],

    refs: [
        {
            ref: 'AGC',
            selector: 'agc'
        },
        {
            ref: 'formationCombo',
            selector: '#formationCombo'
        },
        {
            ref: 'IDDBCombo',
            selector: '#IDDBCombo'
        },
        {
            ref: 'StateCombo',
            selector: '#StateCombo'
        },
        {
            ref: 'WellTypeCombo',
            selector: '#WellTypeCombo'
        },        {
            ref: 'chemLine1chemCombo',
            selector: '#chemLine1 combo[myNameIs=chemCombo]'
        },    
        {
            ref: 'chemLine1mathCombo',
            selector: '#chemLine1 combo[myNameIs=mathCombo]'
        },    
        {
            ref: 'chemLine1chemText',
            selector: '#chemLine1 textfield[myNameIs=chemText]'
        },    
        {
            ref: 'chemLine2chemCombo',
            selector: '#chemLine2 combo[myNameIs=chemCombo]'
        },    
        {
            ref: 'chemLine2mathCombo',
            selector: '#chemLine2 combo[myNameIs=mathCombo]'
        },    
        {
            ref: 'chemLine2chemText',
            selector: '#chemLine2 textfield[myNameIs=chemText]'
        },        
        {
            ref: 'chemLine3chemCombo',
            selector: '#chemLine3 combo[myNameIs=chemCombo]'
        },    
        {
            ref: 'chemLine3mathCombo',
            selector: '#chemLine3 combo[myNameIs=mathCombo]'
        },    
        {
            ref: 'chemLine3chemText',
            selector: '#chemLine3 textfield[myNameIs=chemText]'
        },
        {
            ref: 'basinCombo',
            selector: '#basinCombo'
        }  
     ],

//  Ext.ComponentQuery.query('#chemLine1 [myNameIs=chemCombo]')[0]

    init : function() {
//    	console.log('Filter Controller : init');
        me = this;

		this.control({
			'[xtype=layout.mapview] #showFilter' : {
				click: this.showFilter
			}
		});

        this.control({
          '[xtype=filter.view] #closeButton' : {
            click: this.formClose
          }
        });

        this.control({
          '[xtype=filter.view] #submitButton' : {
            click: this.formSubmit
          }
        });

        this.control({
          '[xtype=filter.view] #resetButton' : {
            click: this.formReset
          }
        });        
	},

    onLaunch: function() {
//      console.log('Filter controller  - onLaunch');

        this.setFilter(Ext.widget('filter.view'));

//        console.log('Filter Controller , onLaunch, this.getMyFilter :', this.getFilter() );
    },
        
	showFilter: function() {
//		console.log('Filter Controller : showFilter visible :', this.getFilter().isVisible());

        if ( this.getFilter().isVisible() ) {
            this.getFilter().hide();            
        } else {
            this.getFilter().show();
        }
	},
    formClose: function(){
//        console.log('Filter Controller,formClose - button clicked');
        this.getFilter().hide();
    },

    formReset: function(){
 //       console.log('Filter Controller,formReset - button clicked');

        this.getIDDBCombo().reset();
        this.getFormationCombo().reset();
        this.getBasinCombo().reset();
        this.getWellTypeCombo().reset();
        this.getStateCombo().reset();

        this.getChemLine1chemCombo().reset();
        this.getChemLine1mathCombo().reset();
        this.getChemLine1chemText().reset();

        this.getChemLine2chemCombo().reset();
        this.getChemLine2mathCombo().reset();
        this.getChemLine2chemText().reset();

        this.getChemLine3chemCombo().reset();
        this.getChemLine3mathCombo().reset();
        this.getChemLine3chemText().reset();

        this.getAGC().processExtentOrCriteriaChange('1=1', 'filter-reset');  // everything
    },

    formSubmit: function(){
 //       console.log('Filter Controller,formSubmit - button clicked');
        var theStr = '';

        var  v1  = this.getIDDBCombo().getRawValue();

        var  v2  = this.getChemLine1chemCombo().getValue();
        var  v3  = this.getChemLine1mathCombo().getRawValue();
        var  v4  = this.getChemLine1chemText().getRawValue();

        var  v5  = this.getChemLine2chemCombo().getValue();
        var  v6  = this.getChemLine2mathCombo().getRawValue();
        var  v7  = this.getChemLine2chemText().getRawValue();

        var  v8  = this.getChemLine3chemCombo().getValue();
        var  v9  = this.getChemLine3mathCombo().getRawValue();
        var  v10 = this.getChemLine3chemText().getRawValue();

        var  v11 = this.getFormationCombo().getRawValue();
        var  v12 = this.getBasinCombo().getRawValue();
        var  v13 = this.getWellTypeCombo().getRawValue();
        var  v14 = this.getStateCombo().getRawValue();


        if ( v1.length > 0) {
            theStr = "UPPER(IDDB) like UPPER('"  + v1 + "')";
        };

        if ( v11.length > 0) {
            if (theStr.length > 1) {
                theStr += ' AND ';
            }
            theStr += "UPPER(FORMATION) like UPPER('" + v11 + "')";
        };

        if ( v12.length > 0)  {
            if (theStr.length > 1) {
                theStr += ' AND ';
            }
            theStr += "UPPER(BASIN) like UPPER('" + v12 + "')";
        };

        if ( v13.length > 0)  {
            if (theStr.length > 1) {
                theStr += ' AND ';
            }
            theStr += "UPPER(WELLTYPE) like UPPER('" + v13 + "')";
        }
      
         if ( v14.length > 0)  {
            if (theStr.length > 1) {
                theStr += ' AND ';
            }
            theStr += "UPPER(STATE) like UPPER('" + v14 + "')";
        }
 
        if (v2) {
            if ( (v2.length > 0) && (v3.length > 0) && (v4.length > 0) ) {
                if (theStr.length > 1) {
                    theStr += ' AND ';
                }
                theStr += v2 +  v3 +  v4 ;
            }
        };

        if (v5) {
            if ( (v5.length > 0) && (v6.length > 0) && (v7.length > 0) ) {
                if (theStr.length > 1) {
                    theStr += ' AND ';
                }
                theStr += v5 + v6 + v7 ;
            };
        }

        if (v8) {
            if ( (v8.length > 0) && (v9.length > 0) && (v10.length > 0) ) {
                if (theStr.length > 1) {
                    theStr += ' AND ';
                }
                theStr += v8 + v9 + v10 ;
            };        
        }

        if (theStr == '') {
            theStr = '1=1';
        };

//        console.log('mine :', theStr); //, 'v2.len :', v2.length, 'v3.len :', v3.length, 'v4.len :', v4.length);

        this.getAGC().processExtentOrCriteriaChange(theStr, 'filter-submit');

    }

}); 