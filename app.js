// init algoscript
turtleEnabled = false;
Initialiser();

// 'POO' définitions

function rectangle(x, y, length, height, radius, color) {
  var RectanglePleinArrondie = function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.roundRect(this.x, this.y, this.length, this.height, this.radius);
    ctx.fill();
  };

  var collide = function() {
    if (
    this.x <= mouseX && mouseX <= this.x + this.length && this.y <= mouseY && mouseY <= this.y + this.height) {
      return true;
    } else {
      return false;
    }
  };

  obj = {
    x: x,
    y: y,
    length: length,
    height: height,
    radius: radius,
    color: color,
    draw: RectanglePleinArrondie,
    collide_with_mouse: collide
  };
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
  if (game_state == "player_turn") {
    setCanvasFont("helvetica", window_width * 0.02 + "pt", "bold");
    Texte(100, window_height / 2 - 100, "Votre Tour", "purple");
  }

}


// main loop

function game() {
  game_loop = setInterval(function() {
    //drawings
    ctx.clearRect(0, 0, window_width, window_height);
    if (game_state == "menu") {
      draw_menu();
    } else if (game_state == "player_turn" || game_state == "enemy_turn") {
      draw_game();
    }

    rect_fin_jeu.draw();

    //interactions
    if (rect_fin_jeu.collide_with_mouse() && mouse_clicked) {
      rect_fin_jeu.color = "blue";
      rect_fin_jeu.draw();
      clearInterval(game_loop);
    }


    mouse_clicked = false;
  }, 1000 / 60);
}

game();
