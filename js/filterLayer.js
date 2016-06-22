
function filterLayer() {
    var
        definition = "1 = 1", //1=1 is wrong,should be 1 = 1
        //$("#select-category").find(":selected").attr("value") is also ok
        category = $("#select-category").val(),
        rating = $("#select-rating").val();

    if (category !== "99")
        definition = definition + " AND CATEGORY = " + category;
    if (rating !== "99")
        definition = definition + " AND RATING = " + rating;

    app.layerFoodAndDrinks.setDefinitionExpression(definition);
}

$("#select-category").change(filterLayer);
$("#select-rating").change(filterLayer);
