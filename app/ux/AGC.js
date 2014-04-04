Ext.define('Ext.ux.AGC', {
	extend: 'Ext.Component',
	alias: 'widget.agc',
	style: {
		height:'100%',
		width: '100%',
		'z-index': 100
	},
	config:{
    notFirstTime: null,
		arcMap: null,
		initialExtent: null,
    killBusy: false,

    // dyn_Well_Url   : "http://igsaaaegaser003.er.usgs.gov/arcgis/rest/services/pw/PW_Prod_20140401/MapServer",
    // fL_Well_Url    : "http://igsaaaegaser003.er.usgs.gov/arcgis/rest/services/pw/PW_Prod_20140401/MapServer/0",
    // cache_Well_Url : "http://igsaaaegaser003.er.usgs.gov/arcgis/rest/services/pw/PW_Prod_20140401_cache/MapServer",


    // fL_Well_Url: "http://eerscmap.usgs.gov/arcgis/rest/services/pw/published_db/MapServer/0",
    // cache_Well_Url: "http://eerscmap.usgs.gov/arcgis/rest/services/pw/published_DB_CACHED/MapServer",

// http://igsaaaegaser003.er.usgs.gov/arcgis/rest/services/pw/pw_app4iddb_cache_be/MapServer

    dyn_Well_Url  : "http://eerscmap.usgs.gov/arcgis/rest/services/pw/PW_20140401/MapServer",
    fL_Well_Url   : "http://eerscmap.usgs.gov/arcgis/rest/services/pw/PW_20140401/MapServer/0",
//    cache_Well_Url: "http://eerscmap.usgs.gov/arcgis/rest/services/pw/PW_20140401_cache/MapServer",

    extentCount: null,
    totalCount: null,
    popup: null,
    criteriaFullExtentCount: null,
    criteriaInExtentCount: null,
    mapType: null,
    criteria: null,
    previousCriteria: null,

    myTemplate: null,

    recStoreConf: null,

    selectedPointConf: null
	},

	initComponent: function() {

		dojo.require("esri.map");
    dojo.require("esri.layers.FeatureLayer");
    dojo.require("esri.layers.agstiled");
    dojo.require("esri.layers.agsdynamic");
    dojo.require("esri.tasks.query");
    dojo.require("esri.dijit.PopupTemplate");
    dojo.require("esri.dijit.Popup");
    dojo.require("esri.dijit.Scalebar");
    dojo.require("esri.dijit.Legend");
    dojo.require("dojo.parser");
	},
  
	afterRender: function(t, eOpts){
		var map, popup, me = this, local_id = this.getId();

		this.callParent(arguments); 

		function init() {

      var lods = [
//        { "level":  0, "resolution": 156543.033928000,  "scale": 591657527.591555 }, 
//        { "level":  1, "resolution": 78271.5169639999,  "scale": 295828763.795777 }, 
          { "level":  2, "resolution": 39135.7584820001,  "scale": 147914381.897889 }, 
          { "level":  3, "resolution": 19567.8792409999,  "scale": 73957190.948944  }, 
          { "level":  4, "resolution": 9783.93962049996,  "scale": 36978595.474472  }, 
          { "level":  5, "resolution": 4891.96981024998,  "scale": 18489297.737236  }, 
          { "level":  6, "resolution": 2445.98490512499,  "scale": 9244648.868618   }, 
          { "level":  7, "resolution": 1222.99245256249,  "scale": 4622324.434309   },
          { "level":  8, "resolution": 611.496226281380,  "scale": 2311162.217155   },
          { "level":  9, "resolution": 305.748113140558,  "scale": 1155581.108577   },
          { "level": 10, "resolution": 152.874056570411,  "scale": 577790.554289    },
          { "level": 11, "resolution": 76.43702828507324, "scale": 288895.277144    },
          { "level": 12, "resolution": 38.21851414253662, "scale": 144447.638572    },  
          { "level": 13, "resolution": 19.1092570712683,  "scale": 72223.819286     },
          { "level": 14, "resolution": 9.55462853563415,  "scale": 36111.909643     },
          { "level": 15, "resolution": 4.77731426794937,  "scale": 18055.954822     }
          // { "level": 16, "resolution": 2.38865713397468,  "scale": 9027.977411      },
          // { "level": 17, "resolution": 1.19432856685505,  "scale": 4513.988705      }
      ];

      var template = new esri.dijit.PopupTemplate({
          title: "Well",
          description:
          "<table border=2 width='100%' cellspacing='2' >" + 
            "<tr><th colspan=5>Sample Information</th></tr>" + 

            "<tr><th width='21%'>Field</th><th width='29%'>Value</th><th></th><th width='24%'>Field</th><th width='26%'>Value</th></tr>" +

            "<tr><td>ID USGS</td><td>{IDUSGS}</td>" +
            "<td>|</td><td>Upper depth</td><td>{DEPTHUPPER:NumberFormat(digitSeparator:true, places:0)}</td></tr>" + 
            
            "<tr><td>API</td><td>{API}</td>" +
            "<td>|</td><td>Lower depth</td><td>{DEPTHLOWER:NumberFormat(digitSeparator:true, places:0)}</td></tr>" + 

            "<tr><td>Latitude</td><td>{LAT:NumberFormat(digitSeparator:true, places:2)}</td>" +
            "<td>|</td><td>TDS</td><td>{TDS:NumberFormat(digitSeparator:true, places:0)}</td></tr>" +
            
            "<tr><td>Longitude</td><td>{LONG_:NumberFormat(digitSeparator:true, places:2)}</td>" +
            "<td>|</td><td>Sodium</td><td>{Na:NumberFormat(digitSeparator:true, places:0)}</td></tr>" +

            "<tr><tr><td>Formation</td><td>{FORMATION}</td>" +
            "<td>|</td><td>Calcium</td><td>{Ca:NumberFormat(digitSeparator:true, places:0)}</td></tr>"+
            
            "<tr><td>Geologic Age</td><td>{GEOLAGE}</td>" +
            "<td>|</td><td>Chloride</td><td>{Cl:NumberFormat(digitSeparator:true, places:0)}</td></tr>" +

            "<tr><td>Sample date</td><td>{DATESAMPLE:DateFormat(selector: 'date', fullYear: true)}</td>" +
            "<td>|</td><td>TOC</td><td>{TOC:NumberFormat(digitSeparator:true, places:0)}</td></tr>" +

          "</table>"
      });
      
      dojo.parser.parse();  // needed for popup placement, make sure dom is ready for map http://forums.arcgis.com/threads/94986-Popups-and-Zoom-are-Not-in-Correct-Spot?highlight=popups+zoom

      popup = esri.dijit.Popup({
        titleInBody: false
      }, Ext.Element(document.createElement('div')) );

      popup.resize(400,400); // w,h
      me.setPopup(popup);

      var myExt = new esri.geometry.Extent(-24000000,2100000,-3200000,11000000, new esri.SpatialReference({ wkid: 102100}));
//      var myExt = new esri.geometry.Extent(-18500000,2600000,-8000000,9000000, new esri.SpatialReference({ wkid: 102100}));

      popup.on("selection-change", 
        me.popupSelectionChange
      );

      map = new esri.Map(local_id, {
        basemap: "topo", 
        extent: myExt,
        fitExtent: false,
        logo: false,
        showAttribution:false,
        lods: lods,
        infoWindow: popup
      });

      map.on("load", function() {

        me.setArcMap(map);
        me.setInitialExtent(me.getArcMap().extent);

        me.setCriteria('1=1');      // everything
        me.setPreviousCriteria('1=1');

        me.setMyTemplate(template);
        me.getTotalPointCount();
        
        me.setRecStoreConf(Ext.StoreManager.lookup('RecordStore') );    

        var scalebar = new esri.dijit.Scalebar({
          map: map,
          attachTo:"bottom-left",
          scalebarUnit: "dual"
        });

        Ext.ComponentQuery.query('[xtype=layout.legendview]')[0].show();

      });

      map.on("layer-add-result", function (evt) {
        
        if (evt.layer.id == 'wells') {
            me.processExtentOrCriteriaChange('1=1', 'map-add');
        }
      });

      map.on("extent-change", function(e){
        
        if (me.getCriteria() === null) {
          me.setCriteria('1=1');  // everything
        }

        if ( me.getRecStoreConf() ) {
          me.getRecStoreConf().removeAll();
        }

        me.processExtentOrCriteriaChange(me.getCriteria(), 'map-extent_change');

        // var geo = map.extent;
        // console.log( 'x min :', geo.xmin.toFixed(3),', y min :', geo.ymin.toFixed(3), ', x max :', geo.xmax.toFixed(3), ', y max :',geo.ymax.toFixed(3));

      });

      var dynamicLayer = new esri.layers.ArcGISDynamicMapServiceLayer(me.getDyn_Well_Url(), {
        id:'dwells',
        opacity: 0.9,
        visible: true
      } );

      // var tileLayer = new esri.layers.ArcGISTiledMapServiceLayer( me.getCache_Well_Url() ,{       
      //   id: 'tiles',
      //   "opacity": 0.0
      // });

      var featureLayer = new esri.layers.FeatureLayer( me.getFL_Well_Url(), { 
          id: "wells",
          infoTemplate:template,
          mode: esri.layers.FeatureLayer.MODE_SELECTION,  // ONDEMAND    SNAPSHOT    SELECTION
          outFields:["OBJECTID", "IDUSGS", "API", "LAT", "LONG_", "STATE", "WELLTYPE", "DATESAMPLE", "FORMATION", "GEOLAGE", "DEPTHUPPER", "DEPTHLOWER", "REFERENCE", "TDS", "TOC", "PH", "ALKCACO3", "Br", "Ca", "Cl", "K", "Na", "SO4", "dD", "d13C", "d18O"] 
      });      

      featureLayer.on("click", function(evt){
        //console.log('fl click, evt: ',evt.graphic);
        me.selectPoint(evt.graphic);
      });

      dynamicLayer.on("update-end", function() {
//        if (me.getNotFirstTime() == null) {
            me.showNotBusy();
  //        me.setNotFirstTime(true);
 //         console.log('dynamicLayer.on - show not busy');
      //  }
      });

      map.addLayer(dynamicLayer);
//      map.addLayer(tileLayer);
      map.addLayer(featureLayer);
      
		}


    Ext.Msg.show({
      autoScroll: true,
      title: 'USGS Provisional Database Disclaimer',
      msg: 'You are aware of these limitations to data use and data quality.'  ,
      buttons: Ext.MessageBox.YESNO,
      defaultFocus:2,
      style: { 'z-index':20050},
      width:90,
      height: 90,
      top:50,
      modal:false,
 //     renderTo:'findme',
      closable: false,
      // x:50,
      // y:550,
      fn: function(btn, o) {

//        console.log('btn: ', btn, ', o: ',o);
        if (btn == 'yes') { 
          // Destroy the masks
          var mask = Ext.get('loading-mask'),
          parent = Ext.get('loading-parent');

          Ext.fly(mask).fadeOut({ duration:   1000, remove: true });
          Ext.fly(parent).fadeOut({ duration: 1050, remove: true });

          me.showBusy();
//          console.log('afterRender (before init) - show busy');
          dojo.ready(init);
        }
      }
    });


	},

  setMap: function() {
    var me = this;

    // me.showBusy();

    var theMap = me.getArcMap();
    // console.log('setMap :', theMap);

    var flayer = theMap.getLayer('wells');
 //   var clayer = theMap.getLayer('tiles');
    var dlayer = theMap.getLayer('dwells');

    dlayer.setVisibility(false);

    var qt = new esri.tasks.QueryTask(me.getFL_Well_Url() );
    var q  = new esri.tasks.Query();

    flayer.clear();
//    clayer.setVisibility(false);
//    console.log('setMap 2');
    
    if (me.getCriteria() == '1=1') {
        flayer.setDefinitionExpression('1=1');
      } else {
        flayer.setDefinitionExpression(me.getCriteria() );
    };

    q.geometry = theMap.extent;
  
    flayer.selectFeatures(q,esri.layers.FeatureLayer.SELECTION_NEW, function(results) {
//    console.log('doing selectFeatures result:', results);
      var b= [];

      var realResults = flayer.getSelectedFeatures();
      Ext.Array.each(realResults, function(name, index, resultsItSelf) {
        b.push(name.attributes);

      });

      me.getRecStoreConf().add(b);
      b.length = 0;
    }).then( function() {

     if (me.getKillBusy() ) {
       me.showNotBusy();
       me.setKillBusy(false);
 //      console.log('setMap -  killBusy, show not busy - setKillBusy(false)');
     }

      me.setMapType("Dynamic");

      // console.log('setMap about to fire countUpdate');

      PWApp2.app.fireEvent('countUpdate', me.getTotalCount(), me.getExtentCount(), me.getMapType(), me.getCriteria() , me.getCriteriaFullExtentCount(), me.getCriteriaInExtentCount(), theMap.extent );

      // console.log('setMap -  total count :', me.getTotalCount(), ', count in extent', me.getExtentCount(), 
      //  ', map type :', me.getMapType(), ', criteria :', me.getCriteria(), ', criteria full extent :', 
      //  me.getCriteriaFullExtentCount(), ', criteria in extent :', me.getCriteriaInExtentCount(), ', extent: ', theMap.extent );

    });

  },

  // have total point count, get points in current extent, get count with criteria in current extent, get total with criteria
  //  
  resetMap: function() {
    var me = this;
    var theMap = me.getArcMap();
    var flayer = theMap.getLayer('wells');
 //   var clayer = theMap.getLayer('tiles');

    var dlayer = theMap.getLayer('dwells');

    var c =  me.getCriteria();
    var layerDefs = [];

    if (me.getKillBusy() ) {
      me.showNotBusy();
      me.setKillBusy(false);
//      console.log('resetMap - killBusy, show not busy, setKillBusy(false)');
    };

    layerDefs[0] = me.getCriteria();

    dlayer.setLayerDefinitions(layerDefs, false);

    dlayer.setVisibility(true);

    flayer.clear();
//    console.log('resetMap, after clear flayer :', flayer);
//    clayer.setVisibility(true);

    me.setMapType("Cache"); 

//     if (me.getNotFirstTime()) {
//        me.showNotBusy();
// // //      console.log('not first time');
//     }


    // console.log('resetMap about to fire countUpdate');   

    PWApp2.app.fireEvent('countUpdate', me.getTotalCount(), me.getExtentCount(), me.getMapType(), me.getCriteria() , me.getCriteriaFullExtentCount(), me.getCriteriaInExtentCount(), theMap.extent  );

    // console.log('resetMap -  total count :', me.getTotalCount(), ', count in extent', me.getExtentCount(), 
    //   ', map type :', me.getMapType(), ', criteria :', me.getCriteria(), ', criteria full extent :', 
    //   me.getCriteriaFullExtentCount(), ', criteria in extent :', me.getCriteriaInExtentCount(), ', extent: ', theMap.extent )  );
  },

  processExtentOrCriteriaChange: function(criteria, caller) {
    var me = this;
    var qt = new esri.tasks.QueryTask(me.getFL_Well_Url() );
    var q  = new esri.tasks.Query(); 
    var theMap = this.getArcMap();
    
//    console.log('processExtentOrCriteriaChange, criteria :', criteria, ', caller :', caller);

    me.setCriteria(criteria);
    if (theMap ) {
      me.showBusy();
//      console.log('processExtentOrCriteriaChange, if map - show busy');
 //     console.log('processExtentOrCriteriaChange - map:', theMap);
      if (me.getPopup()) {
        me.getPopup().hide();
      }
    
      me.getRecStoreConf().removeAll();

      if (me.getCriteria() == '1=1') {  //   no criteria

        me.setCriteriaInExtentCount(0);
        me.setCriteriaFullExtentCount(0);

        q.geometry = theMap.extent;  // in current extent
        qt.executeForCount(q, function(count){            //  get points in current extent, no criteria
          me.setExtentCount(count);
  //          console.log('pts in current ext, no crit :', count);
          if ( count < 1000) {
          //  console.log('count < 1000');
              me.setKillBusy(true);
            me.setMap();

          } else {
          //  console.log('count not < 1000');
            me.resetMap();
          }
        }, function(error) {
          console.log('Error: ', error);
        });
      } else {   // have criteria


        me.setExtentCount(0);

        q.where = me.getCriteria();  // in criteria, in extent
        q.geometry = theMap.extent;  // in current extent

        qt.executeForCount(q, function(count) {       //  get points in current extent with criteria
          me.setCriteriaInExtentCount(count);
          if (count < 1000) {
              me.setKillBusy(true);
 //             console.log('processExtentOrCriteriaChange - cnt < 1000, setKillBusy');
          }
         //   console.log('pts in current ext/crit :', count);
        }, function(error) {
          console.log('Error: ', error);
        }).then(function() {
          if ( me.getPreviousCriteria() == me.getCriteria()) {

         //   console.log('pts in full ext/crit :'.me.getCriteriaFullExtentCount());
            if ( me.getCriteriaInExtentCount() < 1000 ) {
            //  console.log('count < 1000');
              me.setMap();
            } else {
            //  console.log('count not < 1000');
              me.resetMap();
            }     
            // do have to do anything else?

          } else {  // have new criteria

            me.setPreviousCriteria( me.getCriteria());

            q.geometry = me.getArcMap().getLayer('wells').fullExtent; // in criteria, in full extent
            qt.executeForCount(q, function(count) {     //  get total points with criteria

              me.setCriteriaFullExtentCount(count);
          //    console.log('pts in full ext/crit :', count)
            }, function(error) {
                console.log('Error: ', error);
            }).then(function() {

              if ( me.getCriteriaInExtentCount() < 1000 ) {
              //  console.log('count < 1000');
                me.setMap();
              } else {
              //  console.log('count not < 1000');
                me.resetMap();
              }
            });
          }  // else

        }); // then
      } // else

    }
  },

  getTotalPointCount: function() {
    var me = this, totalCount = 0;                           
    var qt = new esri.tasks.QueryTask(me.getFL_Well_Url() ); //me.getDyn_Well_Url() + '/0'     me.getFL_Well_Url()

    var q  = new esri.tasks.Query();
 
    q.where = '1=1';
    qt.executeForCount(q, function(results) {
      me.totalCount = results;
      me.setTotalCount(results);
    }, function(error) {
          console.log('Error: ', error);
        });
  },

	setInitExtent: function() {
    // this.showBusy();
    // console.log('setInitExtent - show busy');
		this.getArcMap().setExtent(this.getInitialExtent());
	},

	onResize: function() {    // keeps map & screen coordinated
    var m = this.getArcMap();
		if (m) {
      m.resize();			
		}
  },

  selectPoint: function(graphic) {  // mouse click on grid
    var myMap = this.getArcMap();
    var fl = myMap.getLayer("wells");
    var q = new esri.tasks.Query();
    var p = this.getPopup();
//    var m = Ext.ComponentQuery.query('agc')[0];

    q.geometry = graphic.geometry;

    fl.queryFeatures(q, function(featureSet) {
//    console.log("selectPoint, featureset length :", featureSet.features.length);
      p.setFeatures(featureSet.features);
     //p.show(pp);
    }, function(error) {
          console.log('Error: ', error);
        });
  },

  selectGrid: function(id) {

    var pv = Ext.ComponentQuery.query('[xtype=layout.recordview]')[0]; // PWApp.app.getApplication().getView('RecordView');

    //var s = PWApp.app.getStore('RecordStore');
    var s = this.getRecStoreConf();

    var ans = s.find('IDUSGS', id);
//    console.log('selectGrid, ans: ', ans, ', id: ,', id);
    if (ans >= 0) {
      pv.getSelectionModel().select(ans);    
    }
  },

  popupSelectionChange: function(e) {
  //console.log('e :', e);
  var m = Ext.ComponentQuery.query('agc')[0];
  var p = m.getPopup();
    if (p) {
      var t = p.getSelectedFeature();
      if (t) {
        //  console.log('Popup selection change id:', t );
        m.selectGrid(t.attributes.IDUSGS);
      }
    }
  },

  showBusy: function() {
  //  console.log('showBusy before');
    Ext.MessageBox.wait('Loading samples', 'Please wait', {
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

  setMaxExtent: function() {
    var me = this;
    var myMap = this.getArcMap();
    var fl = myMap.getLayer("wells");
    var q = new esri.tasks.Query();

    q.where = this.getCriteria();
//console.log('AGC,setMaxExtent q.where: ',this.getCriteria() );
    fl.queryFeatures(q, function(featureSet) {
      var myFeatureExtent = esri.graphicsExtent(featureSet.features);
      me.getArcMap().setExtent(myFeatureExtent, true);
    }, function(error) {
          console.log('Error: ', error);
        });
   
  }

});
