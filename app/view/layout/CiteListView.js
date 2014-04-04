Ext.define('PWApp2.view.layout.CiteListView', {
    extend: 'Ext.window.Window',
    alias: 'widget.layout.citelistview',

    title : 'ID Database Sources',
    height: 325,
    width : 535,
    bodyPadding: 0,
    layout: 'hbox',
    closeAction: 'hide',
//    enableTextSelection : true,

    initComponent: function() {
//        console.log('Help Controller - initComponent');
        function columnWrap(val){
            return '<div style="white-space:normal !important;">'+ val +'</div>';
        };

        Ext.override(Ext.grid.View, { enableTextSelection: true });

        this.store = {
            storeID: 'citeStore',
            fields: ['NAME', 'REFERENCE'],
            data  : [
                {NAME: 'ANTRIM',    REFERENCE: 'Walter, L.M. et al., 1997, Hydrogeochemistry of the Antrim Shale in the Michigan Basin, Gas Research Institute.'},
                {NAME: 'APPALACHIAN', REFERENCE: 'Breen, K. J., Angelo, C. G., Masters, R. W., and Sedam, A. C., 1985, Chemical and isotopic characteristics of brines from three oil- and gas-producing sandstones in eastern Ohio, with applications to the geochemical tracing of brine sources: U.S. Geological Survey, v. Water-Resources Investigations Report WRI 84-4314, http://pubs.er.usgs.gov/djvu/WRI/wrir_84_4314.djvu, p. 58 p.'},
                {NAME: 'APPALACHIAN', REFERENCE: 'Dresel, P. E., and Rose, A. W., 2010, Chemistry and origin of oil and gas well brines in western Pennsylvania: Pennsylvania Geological Survey, v. 4th series, Open-File Report OFOG 10–01.0, web version, accessed on 12/28/12: http://www.dcnr.state.pa.us/topogeo/pub/openfile/pdfs/ofog10_01.pdf, p. 48 p.'},
                {NAME: 'APPALACHIAN', REFERENCE: 'Hayes, T., 2009, Sampling and analysis of water streams associated with development of Marcellus Shale gas, Final Report, December 31, 2009: Marcellus Shale Coalition, v. Available at: http://catskillcitizens.org/learnmore/20100916IOGAResponsetoDECChesapeake_IOGAResponsetoDEC.pdf, "Attachment A", p. 107-356.'},
                {NAME: 'APPALACHIAN', REFERENCE: 'Hoskins, H. A., 1947, Analyses of West Virginia Brines: West Virginia Geological and Economic Survey, v. Report of Investigations, No. 1, p. 1-21.'},
                {NAME: 'APPALACHIAN', REFERENCE: 'Lamborn, R. E., 1952, Additional analyses of brines from Ohio: Ohio Division of Geological Survey Report of Investigations No. 11, 56 p.'},
                {NAME: 'APPALACHIAN', REFERENCE: 'NYSDEC, 2009, Draft supplemental generic environmental impact statement on the oil, gas, and solution mining regulatory program, well permit issuance for horizontal drilling and high-volume hydraulic fracturing to develop the Marcellus Shale and other low-permeability gas reservoirs: New York State Department of Environmental Conservation (DEC), http://www.dec.ny.gov/energy/58440.html, Appendix 13, NYS Marcellus radiological data from production brine, http://www.dec.ny.gov/docs/materials_minerals_pdf/ogsgeisapp1.pdf.'},
                {NAME: 'APPALACHIAN', REFERENCE: 'Osborn, S. G., and McIntosh, J. C., 2010, Chemical and isotopic tracers of the contribution of microbial gas in Devonian organic-rich shales and reservoir sandstones, northern Appalachian Basin: Applied Geochemistry, v. 25, p. 456-471.'},
                {NAME: 'APPALACHIAN', REFERENCE: 'Osborn, S. G., McIntosh, J. C., Hanor, J. S., and Biddulph, D., 2012, Iodine-129, 87Sr/86Sr, and trace elemental geochemistry of northern Appalachian Basin brines: evidence for basinal-scale fluid migration and clay mineral diagenesis: American Journal of Science, v. 312, p. 263-287.'},
                {NAME: 'APPALACHIAN', REFERENCE: 'PA DEP (BOGM), P. D., 1991, NORM Survey Summary: http://files.dep.state.pa.us/OilGas/BOGM/BOGMPortalFiles/RadiationProtection/NORM.pdf.'},
                {NAME: 'APPALACHIAN', REFERENCE: 'Pennsylvania Department of Environmental Protection (PA DEP), unpublished documents.'},
                {NAME: 'APPALACHIAN', REFERENCE: 'Poth, C. W., 1962, The occurrence of brine in western Pennsylvania: Pennsylvania Geological Survey, v. Fourth Series, Bulletin M 47, p. 53 p.'},
                {NAME: 'APPALACHIAN', REFERENCE: 'Price, P. H., Hare, C. E., McCue, J. B., and Hoskins, H. A., 1937, Salt Brines of West Virginia: West Virginia Geological Survey, v. VIII, p. 203 p.'},
                {NAME: 'APPALACHIAN', REFERENCE: 'Rowan, E. L., Engle, M. A., Kirby, C., and Kraemer, T. F., 2011, Radium content of oil- and gas-field produced waters in the northern Appalachian Basin: Summary and discussion of data: U.S. Geological Survey, v. Scientific Investigations Report 2011-5135, p. 31 p.'},
                {NAME: 'APPALACHIAN', REFERENCE: 'Stith, D. A., 1979, Brine analyses, 1972-1974: Ohio Department of Natural Resources, Division of Geological Survey Open-File Report 79-1, 77 p.'},
                {NAME: 'APPALACHIAN', REFERENCE: 'Stout, W. E., Lamborn, R. E., and Schaaf, D., 1932, Brines of Ohio (Preliminary Report): Geological Survey of Ohio, v. Bulletin 37, p. 123 p.'},
                {NAME: 'APPALACHIAN', REFERENCE: 'Warner, N. R., Jackson, R. B., Darrah, T. H., Osborn, S. G., Down, A., Zhao, K., White, A., and Vengosh, A., 2012, Geochemical evidence for possible natural migration of Marcellus Formation brine to shallow aquifers in Pennsylvania: PNAS, v. 109, no. 30, p. 11961–11966, www.pnas.org/cgi/doi/11910.11073/pnas.1121181109.'},
                {NAME: 'APPALACHIAN', REFERENCE: 'Williams, J. H., Taylor, L. E., and Low, D. J., 1998, Hydrogeology and groundwater quality of the glaciated valleys of Bradford, Tioga, and Potter Counties, Pennsylvania: Pennsylvania Department of Natural Resources (DCNR); Pennsylvania Geological Survey, 4th Ser., Water Resource Report 68, 89 p.'},
                {NAME: 'ARKMOLDOVANYI', REFERENCE: 'Moldovanyi, E.P., and Walter, L.M., 1992, Regional Trends in Water Chemistry, Smackover Formation, Southwest Arkansas: Geochemical and Physical Controls, AAPG Bulletin, v. 76, n. 6, p 864-894.'},
                {NAME: 'BAKKEN', REFERENCE: 'Thamke, J., 2013, personal communication.'},
                {NAME: 'CBM', REFERENCE: 'Dahm, K.G. et al., 2011, Composite Geochemical Database for Coalbed Methane Produced Water Quality in the Rocky Mountain Region, Environmental Science and Technology, v. 45, 7655-7663.'},
                {NAME: 'CBM', REFERENCE: 'Dahm, K.G., 2013, personal communication.'},
                {NAME: 'CIMEREX', REFERENCE: 'Cimerex Energy Company, 2013, personal communication.'},
                {NAME: 'FERRON', REFERENCE: 'Rice, C.A., 2013, personal communication.'},
                {NAME: 'ILLINOIS', REFERENCE: 'Meents, W.F. et al., 1952, Illinois Oil-Field Brines Their Geologic Occurrence and Chemical Composition, Illinois State Geological Survey, Illinois Petroleum no. 66.'},
                {NAME: 'INDIANA', REFERENCE: 'Keller, S.J., 1983, Analyses of Subsurface Brines of Indiana, Department of Natural Resources Geological Survey Occasional Paper 41.'},
                {NAME: 'MISSISSIPPI', REFERENCE: 'Carpenter, A.B., et al., Preliminary Report on the Origin and Chemical Evolution of Lead and Zinc-Rich Oil Field Brines in Central Mississippi, Economic Geology, v. 69, p 1191-1206. 1974'},
                {NAME: 'NATCARB', REFERENCE: 'NATCARB Brine Database, Department of Energy, National Energy Technology Laboratory (NETL), www.netl.doe.gov (accessed early 2013)'},
                {NAME: 'NORTHDAKOTA', REFERENCE: 'North Dakota Oil and Gas Division https://www.dmr.nd.gov/oilgas/'},
                {NAME: 'OHBRINE', REFERENCE: 'Stout, W. E., Lamborn, R. E., and Schaaf, D., 1932, Brines of Ohio (Preliminary Report): Geological Survey of Ohio, v. Bulletin 37, p. 123 p.'},
                {NAME: 'PALODURO', REFERENCE: 'Bassett, R.L., and Bentley, M.E., 1983, Deep Brine Aquifers in the Palo Duro Basin: Regional Flow and Geochemical Constraints, Bureau of Economic Geology, University of Texas, Report of Investigations no. 130.'},
                {NAME: 'PARADOX', REFERENCE: 'Hanshaw, B.B. and Hill, G.A.,  1969, Geochemistry and Hydrodynamics of the Paradox Basin Region, Utah, Colorado, and New Mexico, Chemical Geology, v. 4, p 263-164.'},
                {NAME: 'PASHIN', REFERENCE: 'Pashin, J., 2013, personal communication.'},
                {NAME: 'POWDERRIVERCBM', REFERENCE: 'Rice, C.A., et al., 2000, Water co-produced with coalbed methane in the Powder River Basin, Wyoming: preliminary compositional data, Unites States Geological Survey, Open File Report 00-372.'},
                {NAME: 'ROCKIES', REFERENCE: 'NETL, DOE.  Contract work done by Advance Resources International (ARI) http://www.alrc.doe.gov/technologies/oil-gas/Software/database.html'},
                {NAME: 'USGSARK', REFERENCE: 'Breit et al., USGS Produced Waters Database, 2002, energy.cr.usgs.gov/prov/prodwat'},
                {NAME: 'USGSMAIN', REFERENCE: 'Breit et al., USGS Produced Waters Database, 2002, energy.cr.usgs.gov/prov/prodwat'},
                {NAME: 'USGSOK', REFERENCE: 'Breit et al., USGS Produced Waters Database, 2002, energy.cr.usgs.gov/prov/prodwat'},
                {NAME: 'WYOGCC', REFERENCE: 'wogcc.state.wy.us'}
            ]
        };

        this.items = 
        [
            {
                xtype: 'grid',
                autoScroll: true,
                itemId: 'citegrid',
                height:300,
                width:520,
                store: this.store,
                columns: [
                    {header: 'ID Database',  dataIndex: 'NAME',  width:120},
                    {header: 'Reference', dataIndex: 'REFERENCE', width:380, renderer: columnWrap}
                ]

            }
        ];
        this.callParent(arguments);  
    }
});

