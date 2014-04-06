Ext.define('PWApp2.view.layout.HelpView', {
    extend: 'Ext.window.Window',
    alias: 'widget.layout.helpview',

    title : 'Help',
    height: 175,
    width : 375,
//    bodyPadding: 5,
    layout: 'fit',
    closeAction: 'hide',

    initComponent: function() {
//        console.log('Help Controller - initComponent');
        this.items = 
        [
            {
                xtype: 'panel',
                autoScroll: true,
                bodyPadding: 10,
                html:   '<ul>' +
                            '<li>To make the map interactive, you must reduce the number of points visible to 1000. You can see how many points are visible by looking just below the map. For example, “Filtered: 45,363 out of 45,363 filtered samples visible. For details, reduce number of samples to below 1000 (see help)”.</li>' +
                            '<li>Filtering allows you to select a set of data based on criteria. Click on Filter in the upper left corner of the map to open the Filter Box. You can select data by Well Type, ID Database, Formation, State or Basin. You can set constraints on the chemistry (Chem: TDS >= 100000). The formation draw-down list is not complete so you can also find formation by typing it in the box. You can use the wildcard symbol, %, for this. For example, typing %mar% into the Formation filter will return points for Marcellus, Marmaton Group, Cimarron, etc. Click the Submit button to apply the filter. Clicking the Reset button in the Filter Box will clear your results and refresh the datapoints in the current map extent.</li>' +
                            '<li>Once you have filtered the data you need, you will see the number of samples visible at the bottom left of the map. If there are more than 1000 points you will need to pan and zoom until you are below 1000 points. When this happens the map becomes interactive. The grid below the map shows data for all points in the current map extent. You can click on points to get information on a well. Clicking on a well also scrolls the grid to that data point. When the map is active you can export data to a CSV file. This will give you all the data for selected points including data not on the interactive map grid (major, minor, trace chemicals, isotopes).</li>' +
                            '<li>If you filter and your data points are not all in the current map extent, you will have the option to “Expand Extent to Current Selection”. This option is next to the “Download CSV Data” option at the bottom left of the map.</li>' +
                            '<li>Initial Extent:  This option in the upper left corner of the map refreshes the initial map extent. If you do not see all the datapoints, refresh the webpage.</li>' +
                            '<li>Legend: This shows how the points are color-coded by well type.</li>' +
                            '<li>Sources: This is a list of references for the ID Databases. Currently there are 24 separate databases which are incorporated into the overall database. If you are curious about the publication source for a given well, you can look up the publication by the well’s ID Database in the Sources menu option.</li>' +
                        '</ul>' 

            }
        ];
        this.callParent(arguments);  
    }
});



    // '<li>To make the map interactive, the numbers of samples in the viewport must be reduced to below 1000. Either filter (menu bar) the number of samples shows or change the map extent by panning or zooming</li>' +
    // '<li>Use "+" and "-"  buttons to zoom in and out.</li>' +
    // '<li>Place mouse pointer on map, push and hold left mount button, and drag to pan the map.</li>' +
    // '<li>Click on Initial Extent button to go back to full map view.</li>' +
