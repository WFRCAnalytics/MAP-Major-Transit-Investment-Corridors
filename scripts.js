require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/GeoJSONLayer",
    "esri/layers/CSVLayer",
    "esri/layers/FeatureLayer",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/Color",
    "esri/renderers/ClassBreaksRenderer",
    "esri/widgets/Legend",
    "esri/widgets/Expand",
    "esri/widgets/Zoom"
], function(Map, MapView, GeoJSONLayer, CSVLayer, FeatureLayer, SimpleLineSymbol, SimpleMarkerSymbol, Color, ClassBreaksRenderer, Legend, Expand, Zoom) {

    // CREATE MAP
    const map = new Map({
        basemap: "gray-vector" // Basemap service
    });

    // ADD NEW VIEW OF MAP
    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-111.8910, 40.7608], // center on Salt Lake County
        zoom: 10, // Zoom level
    });
    
    // Add FeatureLayers
    
    const _fsname = "https://services1.arcgis.com/taguadKoI1XFwivx/arcgis/rest/services/MTIC_Jan2024_WFL1/FeatureServer";
    const _fsnameStations = "https://services1.arcgis.com/taguadKoI1XFwivx/arcgis/rest/services/MajorTransitInvestment_Stations/FeatureServer"

    layer2 = new FeatureLayer({
        url: _fsname + "/2"
    });

    map.add(layer2);

    layer1 = new FeatureLayer({
        url: _fsname + "/1"
    });

    map.add(layer1);
    
    layer0 = new FeatureLayer({
        url: _fsname + "/0"
    });
    console.log(layer0.renderer)

    map.add(layer0);

    layerStations = new FeatureLayer ({
        url: _fsnameStations
    })

    map.add(layerStations);
   

    // Remove default zoom controls
    view.ui.remove("zoom");

    // Create a new Zoom widget
    const zoomWidget = new Zoom({
        view: view
    });

    const _sideHTML = `
    <p>This map shows existing and planned transit corridors* that qualify as Major Transit Investment Corridors (MTIC's) under Utah's current statutory definition.</p>
    <p>The corridors shown for planned future projects (dashed lines) are sourced from the <a href="https://unifiedplan.org">2023 - 2050 Unified Transportation Plan</a>.</p>
    <p>Cities and counties that contain the MTICs must coordinate and plan for residential and commercial development around these corridors to improve connections between housing, employment, education, recreation, and commerce. [<a href="https://data.wfrc.org/maps/wfrc::sb34-major-transit-investment-corridors-jan-2024-1/about" target="_blank">download MTIC GIS data</a>]</p>
    
    <p>Major Transit Investment Corridors are defined in Utah Code <a href="https://le.utah.gov/xcode/Title10/Chapter9a/10-9a-S103.html?v=C10-9a-S103_2019051420190514" target="_blank">10-9a-103</a> as:</p>
    <p class="indented">"Major transit investment corridor" means public transit service that uses or occupies:</p>
    <ol class="main-points">
        <li>public transit rail right-of-way;</li>
        <li>dedicated road right-of-way for the use of public transit, such as bus rapid transit; or</li>
        <li>fixed-route bus corridors subject to an interlocal agreement or contract between a municipality or county and:
            <ol class="sub-points">
                <li>a public transit district as defined in Section 17B-2a-802; or</li>
                <li>an eligible political subdivision as defined in Section 59-12-2219.</li>
            </ol>
        </li>
    </ol>
    
    <p>As of January 2024, MTIC's are referenced in the following planning-related sections of Utah Code:</p>
    <ul>
        <li><a href="https://le.utah.gov/xcode/Title10/Chapter9A/10-9a-S206.html" target="_blank">10-9a-206</a>.  Municipal Land Use, Development, and Management Act. Third party notice -- High priority transportation corridor notice.</li>
        <li><a href="https://le.utah.gov/xcode/Title10/Chapter9a/10-9a-S403.html" target="_blank">10-9a-403</a>.  Municipal Land Use, Development, and Management Act. General plan preparation.</li>
        <li><a href="https://le.utah.gov/xcode/Title17/Chapter27a/17-27a-S403.html" target="_blank">17-27a-403</a>. County Land Use, Development, and Management Act.  Plan preparation. </li>
        <li><a href="https://le.utah.gov/xcode/Title63N/Chapter3/63N-3-S603.html" target="_blank">63N-3-603</a>.  Housing and Transit Reinvestment Zone Act. Applicability, requirements, and limitations on a housing and transit reinvestment zone.</li>
    </ul>
    <p>MTICs were originally defined in Senate Bill 34 (<a href="https://docs.google.com/document/d/13EPa3tHzlNGK7y_s2U64P2C0YWT53aGatFnMESWg4go/edit" target="_blank">bill summary</a>), passed in the 2019 General Session of the Utah Legislature.</p>
    <p>*The full routes for Bus Rapid Transit (BRT) lines are shown on this map as major transit investment corridors, however current statute may only apply to the portion of BRT service that has a dedicated right of way. Some BRT routes utilize dedicated road right of way for only a portion of the service route. The full BRT route service lines are shown on this map, conveying important connectivity to other qualifying transit services across the region.</p>
    `

    const contentContainer = document.createElement('div');
    contentContainer.className = 'scenario-selector-container';

    // Append the calcite-select to the content container
    contentContainer.innerHTML = _sideHTML;

    // Create the Expand widget
    const expandSide = new Expand({
        view: view,
        content: contentContainer,
        expanded: true,
        expandTooltip: 'Description',
        group: "top-left"
    });

    // Add the Expand widget to the view
    
    view.ui.add(expandSide, "top-left");


    // Add the Zoom widget to the top-right corner of the view
    view.ui.add(zoomWidget, "top-left");



    // CREATE LEGEND WIDGET
    const legend = new Legend({
        view: view,
        layerInfos: [
                      { layer: layer0, title: 'Existing Transit'    },
                      { layer: layer1, title: 'Planned Transit'     },
                      { layer: layer2, title: 'Qualifying Local Bus'},
                      { layer: layerStations, title: 'Stations'}
                    ]
    });

        
    // CREATE EXPAND WIDGET
    const expand = new Expand({
        view: view,
        content: legend,
        expandIconClass: "esri-icon-layer-list", // Choose an appropriate icon here
        group: "top-right", // Group it with other widgets in the top-right corner, if any
        expanded: "true",
        width:"50px"
    });

    // ADD EXPAND WIDGET TO THE VIEW
    view.ui.add(expand, "top-right");

});
