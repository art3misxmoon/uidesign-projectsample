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

function editGame(game) {
      $.ajax({
            type: "POST",
            url: "/edit_game",                
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(game),
            success: function(result){
                  let id = result["id"];
                  window.location.href = "/view/" + id;
            },
            error: function(request, status, error){
                  console.log("Error");
                  console.log(request);
                  console.log(status);
                  console.log(error);
            }
      });
}

function getGameEdit(id) {
      $.ajax({
            type: "GET",
            url: "/get_game",                
            dataType : "json",
            data : {"id": id},
            success: function(result){
                  let game = result["data"];

                  $( ".addtitle" ).val(game["title"]);
                  $( ".addimage" ).val(game["image"]);
                  $( ".adddescription" ).val(game["description"]);
                  $( ".addmultiplayer" ).val(game["multiplayer"]);
                  $( ".addconsoles" ).val(game["consoles"].join(", "));
                  $( ".addreleaseyear" ).val(game["releaseyear"]);
                  $( ".addgenres" ).val(game["genres"].join(", "));
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
      getGameEdit(gameid);


      $( ".editgame" ).on( "submit", function( event ) {
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
                  "id": gameid,
                  "title": title,
                  "image": image,
                  "description": description,
                  "multiplayer": parsedmultiplayer,
                  "consoles": consoles, 
                  "releaseyear": parsedreleaseyear,
                  "genres": genres
            };
            console.log(game);

            editGame(game);

      });

      $( ".discard" ).on( "click", function() {
            $( ".dialog" ).dialog( "open" );
      });

      $( ".dialog" ).dialog({
            autoOpen: false
      });

      $( ".confirmdiscard" ).on("click", function() {
            window.location.href = "/view/" + gameid;
      });

      $( ".undodiscard" ).on("click", function() {
            $( ".dialog" ).dialog( "close" );
      });

});