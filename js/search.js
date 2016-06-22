require([
    "esri/tasks/QueryTask",
    "esri/tasks/query", "esri/symbols/SimpleMarkerSymbol", "app/config"],
    function (QueryTask, Query, SimpleMarkerSymbol, appConfig) {

        function showRestaurant(i) {
            var
                name=$(this).text(),
                symbol,
                currentFeature;

            //find the feature by name
            for(var i=0;i<app.queryResults.features.length;i++){
                if(name===app.queryResults.features[i].attributes.name){
                    currentFeature=app.queryResults.features[i];
                    break;
                }
            }

            if(!currentFeature) return;

            //create symbol
            symbol = new SimpleMarkerSymbol();
            symbol.setSize(50);
            symbol.setColor(new dojo.Color([255, 255, 0, 0.5]));

            //finally set the symbol to the record
            currentFeature.setSymbol(symbol);


            //clear any graphics on the map
            app.map.graphics.clear();
            //so we only add this one
            app.map.graphics.add(currentFeature);
        }


        function showResults(results) {
            var feature,
                i = 0,
                resultHtml = "";

            //store the results
            app.queryResults = results;

            for (i = 0; i < results.features.length; i = i + 1) {
                //for each single feature or record in the result
                feature = results.features[i];

                //TODO:use handlebar template
                resultHtml = resultHtml + String.format(
                    "<b>Name:</b><a>{1}</a><br/> <b>Rating:</b>{2}<br/><br/><br/>",
                    i,
                    feature.attributes["name"],
                    feature.attributes["rating"]
                );
            }

            $("#search-result").html(resultHtml);

            //highlight the feature
            $.each($("#search-result a"),function(index,value){
               $(value).click(showRestaurant);
            });
        }


        //search button click event handler
        $("#search-submit").click(function (event) {

            //execute a query against ags server map layer
            var
                query,
                searchText = $("#search-text").val().trim();

            //create task
            app.queryTask = new QueryTask(
                appConfig.layers.belizeMapService.url + "/0"
            );

            //null empty results
            if (!searchText) {
                $("#search-result").html("");
                return;
            }

            query = new Query();
            query.outFields = ["name", "rating", "objectid"];
            query.returnGeometry = true;

            //support lowerCase or upperCase search
            query.where = String.format(
                "name LIKE '%{0}%' OR name LIKE '%{1}%'",
                searchText.toLowerCase(),
                searchText.toUpperCase()
            );

            app.queryTask.execute(query, showResults);
        });

    });
