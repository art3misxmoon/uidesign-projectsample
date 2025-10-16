function clear_warnings() {
      $( ".titlewarning" ).text("");
      $( ".imagewarning" ).text("");
      $( ".descriptionwarning" ).text("");
      $( ".multiplayerwarning" ).text("");
      $( ".consoleswarning" ).text("");
      $( ".releaseyearwarning" ).text("");
      $( ".genreswarning" ).text("");
}

function clear_inputs() {
      $( ".addtitle" ).val("");
      $( ".addimage" ).val("");
      $( ".adddescription" ).val("");
      $( ".addmultiplayer" ).val("");
      $( ".addconsoles" ).val("");
      $( ".addreleaseyear" ).val("");
      $( ".addgenres" ).val("");
}

function saveGame(game) {
      $.ajax({
            type: "POST",
            url: "/save_game",                
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(game),
            success: function(result){
                  let id = result["id"];
                  
                  $( ".creatednotif" ).empty();
                  $( ".creatednotif" ).append("new item created, <a class='addlink' href='/view/" + id + "'>see it here!</a>");
            },
            error: function(request, status, error){
                  console.log("Error");
                  console.log(request);
                  console.log(status);
                  console.log(error);
            }
      });
}

$( function() {

      $( ".addgame" ).on( "submit", function( event ) {
            event.preventDefault();

            let title = $( ".addtitle").val();
            let image = $( ".addimage").val();
            let description = $( ".adddescription").val();
            let multiplayer = $( ".addmultiplayer").val();
            let parsedmultiplayer = parseInt(multiplayer);
            let consoles = $( ".addconsoles").val().split(", ");
            let releaseyear = $( ".addreleaseyear").val();
            let parsedreleaseyear = parseInt(releaseyear);
            let genres = $( ".addgenres").val().split(", ");

            // error checking
            clear_warnings();
            let error = false;
            if (title.trim() == "") {
                  $( ".titlewarning" ).text("Must enter a title.");
                  error = true;
            }
            if (image.trim() == "") {
                  $( ".imagewarning" ).text("Must enter an image link.");
                  error = true;
            }
            if (description.trim() == "") {
                  $( ".descriptionwarning" ).text("Must enter a description.");
                  error = true;
            }

            if (multiplayer.trim() == "") {
                  $( ".multiplayerwarning" ).text("Must enter a max player count.");
                  error = true;
            } else if (isNaN(parsedmultiplayer) || parsedmultiplayer > 8 || parsedmultiplayer < 1) {
                  $( ".multiplayerwarning" ).text("Must enter a valid max player count between 1 and 8.");
                  error = true;
            }

            if (consoles.length == 1 && consoles[0].trim() == "") {
                  $( ".consoleswarning" ).text("Must enter at least one console.")
                  error = true;
            }

            if (releaseyear.trim() == "") {
                  $( ".releaseyearwarning" ).text("Must enter a release year.");
                  error = true;
            } else if (isNaN(parsedreleaseyear) || parsedreleaseyear > 2025 || parsedreleaseyear < 0) {
                  $( ".releaseyearwarning" ).text("Must enter a valid release year.");
                  error = true;
            }

            if (genres.length == 1 && genres[0].trim() == "") {
                  $( ".genreswarning" ).text("Must enter at least one genre.")
                  error = true;
            }
            if (error) return;

            let game = {
                  "title": title,
                  "image": image,
                  "description": description,
                  "multiplayer": parsedmultiplayer,
                  "consoles": consoles, // need to fix so works with or without space
                  "releaseyear": parsedreleaseyear,
                  "genres": genres
            };
            console.log(game);

            saveGame(game);
            clear_inputs();
            $( ".addtitle" ).focus();

      });

});