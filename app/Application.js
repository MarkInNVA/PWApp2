Ext.define('PWApp2.Application', {
    name: 'PWApp2',

    extend: 'Ext.app.Application',

    views: [         
        'layout.MapView',          
        'layout.RecordView',
        'layout.ScoreCardView',
        'layout.HelpView',
        'filter.View',
        'filter.ChemLineView',
        'filter.BasinLineView',
        'layout.LegendView',
        'layout.CiteListView'
    ],

    controllers: [  
        'MapController',
        'ScoreCardController',
        'RecordController',
        'HelpController',
        'FilterController',
        'LegendController'
//        'NationalController'
    ],

    stores: [  
    ]
});
