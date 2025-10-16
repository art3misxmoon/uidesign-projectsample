function getGame(id) {
      $.ajax({
            type: "GET",
            url: "/get_game",                
            dataType : "json",
            data : { "id": id},
            success: function(result){
                  let game = result["data"];

                  $( ".infotitle" )       .text(game["title"]);
                  $( ".inforeleaseyear" ) .text(game["releaseyear"]);
                  $( ".infodescription" ) .text(game["description"]);
                  $( ".infomultiplayer" ) .html("<a href='/results-" + game["multiplayer"] + "'>" + game["multiplayer"] + "</a>&emsp;&emsp;");
                  
                  $( ".infoconsoles" ).empty();
                  for (let i = 0; i < game["consoles"].length; i++) {
                        $( ".infoconsoles" ).append("<a href='/results-" + game["consoles"][i] + "'>" + game["consoles"][i] + "</a>");
                        if (i != game["consoles"].length - 1) {
                              $( ".infoconsoles" ).append(", ");
                        }
                  }

                  $( ".infogenres" ).empty();
                  for (let i = 0; i < game["genres"].length; i++) {
                        $( ".infogenres" ).append("<a href='/results-" + game["genres"][i] + "'>" + game["genres"][i] + "</a>");
                        if (i != game["genres"].length - 1) {
                              $( ".infogenres" ).append(", ");
                        }
                  }

                  
                  $( ".infoimage" )       .attr("src", game["image"]);

                  for (let i = 0; i < game["multiplayer"]; i++) {
                        $( ".infomultiplayer" ).append("<img class='person img-fluid' src='/static/images/person.png' alt='person icon for multiplayer count'>")
                  }
                  
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
      getGame(gameid);

      $( ".editform" ).on( "submit", function( event ) {
            event.preventDefault();

            window.location.href = "/edit/" + gameid

      });
});

