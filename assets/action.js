// on doc ready 
$(document).ready(function () {
    // array of strings
    var topics = ["hamburger", "taco", "sandwich", "ice cream", "bacon"];

    // (1) dynamically generate buttons from the array above 
    function renderButtons() {
        $("#gifs-here").empty();

        for (var i = 0; i < topics.length; i++) {
            var topicButton = $("<button>");
            topicButton.addClass("btn btn-dark");
            topicButton.attr("data-topic", topics[i]);
            topicButton.text(topics[i]);
            $("#gifs-here").prepend(topicButton);
        }

    };
    renderButtons();

    function renderGifs() {
        // (2) when user clicks on the button,
        // retrieve 10 static gif images
        $("button").on("click", function () {
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
                .then(function (response) {
                    var results = response.data;

                    console.log(response);

                    // loop every result response 
                    for (var i = 0; i < results.length; i++) {
                        // only print appropriately rated gifs
                        if (results[i].rating !== "r") {

                            // variables to hold data attributes of items
                            var stillSrc = results[i].images.fixed_height_still.url;
                            var animatedSrc = results[i].images.fixed_height.url;
                            var rating = results[i].rating; // ==========

                            // create a div for the gifs
                            var gifDiv = $("<div>");
                            // create div for ratings <p>
                            var ratingP = $("<p>"); // ===========
                            // add a class to gifDiv
                            gifDiv.addClass("gif-divs");
                            // create an image tag
                            var foodImage = $("<img>");
                            // add class to img
                            foodImage.addClass("food-img")
                            // pull src attribute from the property of the results item
                            foodImage.attr({
                                "src": stillSrc,
                                "data-still": stillSrc,
                                "data-animate": animatedSrc,
                                "data-state": "still"
                                // "class": "gif" // not sure about this line
                            });

                            // gifDiv.append(p);
                            gifDiv.append(foodImage);
                            // prepend the generated gifDiv to the html div id="gifs-here"
                            $("#gifs-under").prepend(gifDiv);

                            // append rating
                            ratingP.append(); // =========
                        }
                    }
                });
        })

    };
    renderGifs();

    $(document).on("click", ".food-img", playPauseGif);

    function playPauseGif() {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

    // function to push input from the form
    $("#add-gif").on("click", function (event) {
        event.preventDefault();

        var newGif = $("#gif-input").val().trim();
        topics.push(newGif);
        $("#gif-input").val('');
        
        console.log(newGif);

        renderButtons();
        renderGifs();
    });


}) // everything inside this closer