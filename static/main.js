function search(searchtext) {
      $.ajax({
            type: "GET",
            url: "/find_result",                
            dataType : "json",
            data : { "searchtext": searchtext},
            success: function(result){
                  let list = result["data"];
                  $( ".result" ).empty();
                  if (list.length == 0) {
                        $( ".resultsubtitle" ).append("<p>No results found, sorry!</p>");
                  } else {
                        $( ".resultsubtitle" ).append("<p><span class='bold'>" + list.length + "</span> results found.</p>")
                        for (let i = 0; i < list.length; i++) {
                              displayResult(list[i], "results");
                        }
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
function displayResult(game, destination) { // pass dict for game
      let title = game["title"];
      let image = game["image"];
      let thisid = game["id"];
      let players = game["multiplayer"];
      let consoles = game["consoles"];
      let genres = game["genres"];
      let matches = game["matches"];

      let newresult = 
            $("<div class='row result d-flex align-items-center'>"
                  + "<div class='col-3 resultimgcontainer'>" + "<img class='resultimage' src='" + image + "' alt='cover art for " + title + "'></div>"
                  + "<div class='col-5 resulttitlecontainer'>" + "<a class='resulttitle resulttitlehighlight' href='/view/" + thisid + "'>" + title + "</a></div>"
                  + "<div class='resultleftborder col-4'>"
                        + "<div class='row lighttext resultplayers'>players:&emsp;<span class='resultplayershighlight bold'>" + players + "</span></div>"
                        + "<div class='row lighttext resultconsoles'>consoles:&emsp;<span class='resultconsoleshighlight bold'>" + consoles.join(", ") + "</span></div>"
                        + "<div class='row lighttext resultgenres'>genres:&emsp;<span class='resultgenreshighlight bold'>" + genres.join(", ") + "</span></div>"
                  + "</div>"
            + "</div><br>");

      for (let field in matches) {
            if (matches[field]) {
                  newresult.find(".result" + field + "highlight").addClass("matchingresult")
            }
      }


      $( "." + destination ).append(newresult)
}
function displayHomeResult(game, destination) {
      let title = game["title"];
      let image = game["image"];
      let thisid = game["id"];
      let players = game["multiplayer"];
      let consoles = game["consoles"];
      let genres = game["genres"];

      let newresult = 
            $("<div class='col-4 favcontainer'>"
                  + "<div class='col-12 fav d-flex align-items-center'>"
                        + "<div class='col-6'>" + "<a href='/view/" + thisid + "'><img class='favimage' src='" + image + "' alt='cover art for " + title + "'></a></div>"
                        + "<div class='col-6'>"
                              + "<div class='row'><a class='favtitle' href='/view/" + thisid + "'>" + title + "</a></div><br>"
                              + "<div class='row favplayers'>" + players + " players</div>"
                              + "<div class='row favconsoles'>consoles: " + consoles.join(", ") + "</div>"
                              + "<div class='row favgenres'>genres: " + genres.join(", ") + "</div>"
                        + "</div>"
                  + "</div>"
            + "</div><br>");
      $( "." + destination ).append(newresult)
}


$( function() {

      $( ".searchform" ).on( "submit", function( event ) {
            event.preventDefault();

            let searchtext = $( ".searchtext" ).val();
            if (searchtext.trim() == "") {
                  $( ".searchtext" ).val("");
                  $( ".searchtext" ).focus();
            } else {
                  window.location.href = "/results-" + searchtext;
            }

      });

      $( ".addform" ).on( "submit", function( event ) {
            event.preventDefault();

            window.location.href = "/add"

      });

});
