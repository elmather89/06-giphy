// on doc ready 
$(document).ready(function () {
    // array of strings
    var topics = ["hamburger", "taco", "sandwich", "ice cream", "bacon"];

    // (1) dynamically generate buttons from the array above 
    for (var i = 0; i < topics.length; i++) {
        var topicButton = $("<button>");
        topicButton.addClass("btn btn-dark");
        topicButton.attr("data-topic", topics[i]);
        topicButton.text(topics[i]);
        $("#btn-append").append(topicButton);
    }

    // (2) when user clicks on the button,
    // retrieve 10 static gif images
    $("button").on("click", function() {
        // set a variable to capture the data-topic text
        var food = $(this).attr("data-topic");
        // construct search url
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        food + "&api_key=kypnXslCOr8dWGPP3FqDkamXoM81JOG7&limit=10";

        // ajax GET
        $.ajax({
            url: queryURL,
            method: "GET"
        })

        // after data comes back from the API... 
        .then(function(response) {
            var results = response.data;

            // loop every result response 
            for (var i = 0; i < results.length; i++) {
                // only print appropriately rated gifs
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // create a div for the gifs
                    var gifDiv = $("<div>");
                    // // storing the rating for each result
                    // var rating = results[i].rating;
                    // // create p tag for the rating text
                    // var p = $("<p>").text("Rating: " + rating);
                    // create an image tag
                    var foodImage = $("<img>");
                    // pull src attribute from the property of the results item
                    foodImage.attr("src", results[i].images.fixed_height_still.url);
                    // append p and image to the gif div
                    // gifDiv.append(p);
                    gifDiv.append(foodImage);
                    // prepend the generated gifDiv to the html div id="gifs-here"
                    $("#gifs-here").prepend(gifDiv);
                }
            }

            console.log(results);
        })
    })    

}) // everything inside this closer