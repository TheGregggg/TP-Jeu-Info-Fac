// init algoscript
turtleEnabled = false;
Initialiser();

// 'POO' définitions

function rectangle(x, y, width, height, radius, color) {
  var RectanglePleinArrondie = function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.roundRect(this.x, this.y, this.width, this.height, this.radius);
    ctx.fill();
  };

  var collide = function() {
    if (
    this.x <= mouseX && mouseX <= this.x + this.width && this.y <= mouseY && mouseY <= this.y + this.height) {
      return true;
    } else {
      return false;
    }
  };

  obj = {
    x: x,
    y: y,
    width: width,
    height: height,
    radius: radius,
    color: color,
    draw: RectanglePleinArrondie,
    collide_with_mouse: collide
  };
  return obj;
}

function personnages(x, y, height, width, nbImage) {
  var draw = function() {
    if (is_compressed == true) {
      DrawImageObject(this.nbImage, this.x, this.y + 10, this.height, this.width - 10);
    } else {
      DrawImageObject(this.nbImage, this.x, this.y, this.height, this.width);
    }

  };

  var anim = function() {
    this.is_compressed = !this.is_compressed;
  };

  obj = {
    x: x,
    y: y,
    length: length,
    width: width,
    nbImage: nbImage,
    is_compressed: false
  };
  obj.anim = setInterval(anim.bind(obj), 1000);

  return obj;
}

function MouseClick(x, y) {
  mouse_clicked = true;
}

// variables definitions
var mouse_clicked = null;

var game_loop = null;
var window_height = ctx.canvas.height;
var window_width = ctx.canvas.width;
var rect_fin_jeu = rectangle(window_width - 30, window_height - 30, 30, 30, 0, "red");

var game_state = "menu";


var background_menu = PreloadImage('https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/portals_3/H2x1_CharacterHub_InazumaEleven_image1600w.jpg');
var rect_play_button = rectangle(window_width / 2 - 100, window_height / 2 - 50, 200, 100, 20, rgba(0, 0, 0, 0.2));

var players_images = PreloadImage(readFile('Data/persos.png'));


function draw_menu() {
  DrawImageObject(background_menu, 0, 0, window_width, window_height);


  rect_play_button.color = rgba(0, 0, 0, 0.2);
  if (rect_play_button.collide_with_mouse()) {
    rect_play_button.color = rgba(0, 0, 0, 0.4);
  }
  rect_play_button.draw();

  setCanvasFont("helvetica", window_width * 0.02 + "pt", "bold");
  Texte(window_width / 2 - 70, window_height / 2 + 15, "Jouer", "white");
}

function draw_game() {
  ctx.drawImage(players_images,0,0,38,62,0,0, 38,62);
  
  if (game_state == "player_turn") {
    setCanvasFont("helvetica", window_width * 0.02 + "pt", "bold");
    Texte(window_width / 2 - 100, 50, "Votre Tour", "purple");
  }

}


// main loop
// penser a clear les intervalles des joueurs !!!!!!!!!!!!!!


function game() {
  game_loop = setInterval(function() {
    //drawings
    ctx.clearRect(0, 0, window_width, window_height);

    if (game_state == "menu") {
      draw_menu();

      //interactions
      if (rect_play_button.collide_with_mouse() && mouse_clicked) {
        game_state = "player_turn";
      }

    } else if (game_state == "player_turn" || game_state == "enemy_turn") {
      draw_game();

      //interactions
    }

    rect_fin_jeu.draw();


    if (rect_fin_jeu.collide_with_mouse() && mouse_clicked) {
      rect_fin_jeu.color = "blue";
      rect_fin_jeu.draw();
      clearInterval(game_loop);
    }

    mouse_clicked = false;
  }, 1000 / 60);
}

game();
