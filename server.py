from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

# NAME: KATHARINE VARI (KMV2136)

data = {
    "1": {
        "id": 1,
        "title": "Super Smash Bros Melee",
        "image": "https://m.media-amazon.com/images/I/51XFaCPaPhL.jpg",
        "description": "SSBM is a fighting game starring Nintendo characters from many franchises, such as Zelda, Donkey Kong, and Marth. The game allows you to play against your friends in several modes, with different music tracks and maps that you can fight on. This is a good option for beginners but has a high skill ceiling if you want to develop as a player. Learn the many different moves and discover which character is best of them all!",
        "multiplayer": 4,
        "consoles": ["gamecube", "wii"],
        "releaseyear": 2001,
        "genres": ["fighting"]
    },
    "2": {
        "id": 2,
        "title": "Mario Kart 8 Deluxe",
        "image": "https://m.media-amazon.com/images/I/91KQmjDxj-L._SL1500_.jpg",
        "description": "Mario Kart 8 is one of the most popular games to play with friends of all time! Race using karts and bikes and play as Nintendo characters in all of your favorite maps like Rainbow Road and Bowser's Castle. It has several modes, including Grand Prixs and VS Races where you can set the rules. There's also an online mode, so you can improve and climb the ranks.",
        "multiplayer": 4,
        "consoles": ["switch"],
        "releaseyear": 2017,
        "genres": ["racing"]
    },
    "3": {
        "id": 3,
        "title": "Super Smash Bros Ultimate",
        "image": "https://m.media-amazon.com/images/I/815hF0mZBdL._SL1500_.jpg",
        "description": "SSBU is the most recent addition to the series of Smash Bros fighting games! With brand new maps and music, as well as an online mode where you can play against players worldwide, this game has the largest roster of characters with new special moves to try out. This is a great game that you can play at home or on the go, especially with friends. It's also widely played today in tournaments and local events, so it's a great way to find community.",
        "multiplayer": 8,
        "consoles": ["switch"],
        "releaseyear": 2018,
        "genres": ["fighting"]
    },
    "4": {
        "id": 4,
        "title": "Mario Party Superstars",
        "image": "https://m.media-amazon.com/images/I/91LqNrkm6cL._SL1500_.jpg",
        "description": "Mario Party Superstars is the latest edition of a series of party games. The game runs in a board game format, great for playing with friends. It features 5 maps and a hundred minigames that can played as part of the board game or as a separate mode of playing! Collect coins and stars as you play against friends or computers to become the superstar!",
        "multiplayer": 4,
        "consoles": ["switch"],
        "releaseyear": 2021,
        "genres": ["party", "puzzle", "sports"]
    },
    "5": {
        "id": 5,
        "title": "Super Mario Odyssey",
        "image": "https://m.media-amazon.com/images/I/91SF0Tzmv4L._SL1500_.jpg",
        "description": "This entry in the Super Mario series follows Mario as he tracks Bowser across kingdoms to save Princess Peach. This game is famous for its uniquely fun movement because of Mario's ally Cappy, which gives him a unique capture ability that allows him to take the shape of new creatures and items. Explore the kingdoms, filled with puzzles, minigames, and platforming challenges to collect Power Moons that enable you to travel on. Although the game technically has a 2-player mode, this is a great option for a game to play solo on a rainy day in!",
        "multiplayer": 2,
        "consoles": ["switch"],
        "releaseyear": 2017,
        "genres": ["3D platforming", "puzzle", "action-adventure"]
    },
    "6": {
        "id": 6,
        "title": "The Legend of Zelda: Twilight Princess",
        "image": "https://m.media-amazon.com/images/I/51c7mH7zl0L.jpg",
        "description": "In this game, players get to control the character Link as he fights to protect the kingdom of Hyrule from being taken over by a parellel dimension, the Twilight Realm. The game involves combat, exploration, and puzzle-solving. Link uses a sword and shield, as well as a bow and arrow, boomerang, and bombs, but this game also introduces Link in wolf form as part of his interaction with the Twilight realm. This is a great solo-player game and an interesting development to the Legend of Zelda franchise!",
        "multiplayer": 1,
        "consoles": ["wii", "gamecube"],
        "releaseyear": 2006,
        "genres": ["action-adventure", "puzzle"]
    },
    "7": {
        "id": 7,
        "title": "The Legend of Zelda: Breath of the Wild",
        "image": "https://m.media-amazon.com/images/I/81KGsbq8ekL._SL1500_.jpg",
        "description": "This Game of the Year award-winning title is an open-world game centering on the adventures of Link, who has lost his memories but has to save Princess Zelda and Hyrule from being destroyed by Calamity Ganon. It has a unique combat style and tons of puzzles and mini-adventures to follow across the enormous kingdom. The story is also able to be completed non-linearly, allowing you to choose your own adventure and experiment on your own! One of the best games of all time, BOTW is a great showcase of the attention to detail and open-ended gameplay that Nintendo has come to be celebrated for.",
        "multiplayer": 1,
        "consoles": ["switch", "wii u"],
        "releaseyear": 2017,
        "genres": ["action-adventure", "puzzle", "open-world"]
    },
    "8": {
        "id": 8,
        "title": "Splatoon 2",
        "image": "https://m.media-amazon.com/images/I/91bW6yvE9rL._SL1500_.jpg",
        "description": "This third-person shooter has you play as an Inkling or Octoling, shooting paint-like ink to take over territory and beat your opponents with a variety of weapons and squid-based abilities. It features both a story mode, in which you are recruited to save Callie and the Great Zapfish, and an online multi-player mode. The game is known for its beautiful graphics and futuristic locations. Join the ink-splatting fun!",
        "multiplayer": 1,
        "consoles": ["switch"],
        "releaseyear": 2017,
        "genres": ["third-person shooter"]
    },
    "9": {
        "id": 9,
        "title": "Super Mario Galaxy",
        "image": "https://m.media-amazon.com/images/I/71gnh672D1L._SL1500_.jpg",
        "description": "This platform game is well-known among Nintendo fans, as you enter space as Mario to save Princess Peach. Travel across planets with the unique world design and innovative 3D gravity mechanics. The game also features some famous music tracks from the Nintendo repertoire. Explore the Mario Galaxy universe and save everyone from Bowser!",
        "multiplayer": 1,
        "consoles": ["wii"],
        "releaseyear": 2007, 
        "genres": ["3D platforming", "action-adventure"]
    },
    "10": {
        "id": 10,
        "title": "Animal Crossing: New Horizons",
        "image": "https://m.media-amazon.com/images/I/81UfEdvf2kL._SL1500_.jpg",
        "description": "In Animal Crossing, you control a character who moves to a deserted island after purchasing a getaway package, and has to accomplish tasks to develop the island. This hit game during the pandemic allows you to create a community of anthropomorphic animal friends and customize the world to your style! The game is best suited to single-player, but also allows you to be joined on your island by 3 other friends to work together. Explore the world and create your home!",
        "multiplayer": 4,
        "consoles": ["nintendo switch"],
        "releaseyear": 2020,
        "genres": ["social simulation"]
    }
}
currentid = 11


# ROUTES

@app.route('/')
def home():
   return render_template('home.html', data=data)   

@app.route('/results-<searchtext>')
def results(searchtext):
    return render_template('results.html', searchtext=searchtext)

@app.route('/view/<gameid>')
def view(gameid):
    return render_template('gameinfo.html', gameid=gameid)

@app.route('/add')
def add():
    return render_template('add.html')

@app.route('/edit/<gameid>')
def edit(gameid):
    return render_template('edit.html', gameid=gameid)

# AJAX FUNCTIONS

@app.route('/find_result', methods=['GET'])
def find_result():
    global data
    searchtext = request.args.get('searchtext').lower()
    
    results = []
    for game in data.values():
        matchingfields = {
            "title": False,
            "players": False,
            "consoles": False,
            "genres": False
        }
        titlematch = searchtext in game["title"].lower()
        if titlematch:
            matchingfields["title"] = True
        playersmatch = searchtext in str(game["multiplayer"])
        if playersmatch: 
            matchingfields["players"] = True
        consolesmatch = any(searchtext in console for console in game
            ["consoles"])
        if consolesmatch:
            matchingfields["consoles"] = True
        genresmatch = any(searchtext in genre for genre in game["genres"])
        if genresmatch:
            matchingfields["genres"] = True
        if titlematch or playersmatch or consolesmatch or genresmatch:
            game["matches"] = matchingfields
            results.append(game)

    return jsonify({"data": results})
 
@app.route('/get_game', methods=['GET'])
def get_game():
    global data
    getid = request.args.get('id')

    results = [game for game in data.values() if getid == str(game["id"])]

    return jsonify({"data": results[0]})

@app.route('/save_game', methods=['POST'])
def save_game():
    global data
    global currentid

    game = request.get_json()
    game["id"] = currentid
    
    data[str(currentid)] = game
    currentid += 1
    return jsonify({"id": game["id"]})

@app.route('/edit_game', methods=['POST'])
def edit_game():
    global data

    game = request.get_json()
    data[str(game["id"])] = game

    return jsonify({"id": game["id"]})

if __name__ == '__main__':
   app.run(debug = True, port=5001)

