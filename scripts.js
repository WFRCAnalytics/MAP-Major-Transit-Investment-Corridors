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
    "esri/widgets/Legend"
], function(Map, MapView, GeoJSONLayer, CSVLayer, FeatureLayer, SimpleLineSymbol, SimpleMarkerSymbol, Color, ClassBreaksRenderer, Legend) {

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

    map.add(layer0);
   
    // CREATE LEGEND WIDGET
    const legend = new Legend({
        view: view,
        layerInfos: [
                      { layer: layer0, title: 'Existing Transit'    },
                      { layer: layer1, title: 'Planned Transit'     },
                      { layer: layer2, title: 'Qualifying Local Bus'}
                    ]
    });
    view.ui.add(legend, "top-right");

});
