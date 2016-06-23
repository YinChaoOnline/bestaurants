define(['esri/InfoTemplate'], function (InfoTemplate) {

    return {
        mapOptions: {
            extentJson: {
                "xmin": 30236013.176644534,
                "ymin": 1976510.339413753,
                "xmax": 30272702.950221367,
                "ymax": 1988568.2806257235,
                "spatialReference": {
                    "wkid": 102100
                }
            },
            basemap: "osm"
                //minZoom: 4,
                //isScrollWheelZoom: true,
                //nav: false,
                //logo: false,
                //wrapAround180: true,
                //showLabels: true
        },

        /*
         *operation layers,belize restaurants layer
         */
        layers: {
            belizeMapService: {
                url: 'http://localhost:6080/arcgis/rest/services/BelizeEdit/FeatureServer',
                title: 'Restaurants',
                options: {
                    id: 'Restaurants',
                    opacity: 1.0,
                    visible: false
                }
            }
        },

        // Add config parameters for each map widget you want to include
        // The map reference will get appended to the options
        // To accept default options just pass empty object {}
        // NOTE: to change the position of these widgets, make changes in map.css
        widgets: {
            legend: {
                id:"map-legend",
            },
            scalebar: {

            },
            homeButton: {

            },
            locateButton: {

            },
            layerList: {

            },
            bookMarks: {

            },
            geocoder: {
                autoComplete: true,
                arcgisGeocoder: {
                    placeholder: 'Address or Location'
                },
                'class': 'geocoder'
            }
        },

        portalUrl: 'http://www.arcgis.com'
    };
});
