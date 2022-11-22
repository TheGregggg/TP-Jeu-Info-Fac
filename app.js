// init algoscript
turtleEnabled=false;
Initialiser();

// 'POO' définitions
function rectangle(x, y, length, height, radius, color) {
  var RectanglePleinArrondie = function() {
    RectanglePlein(
    this.x, this.y + this.radius, this.length, this.height - this.radius * 2, this.color);
    RectanglePlein(
    this.x + this.radius, this.y, this.length - this.radius * 2, this.height, this.color);

    CerclePlein(
    this.x + this.radius, this.y + this.radius, this.radius * 2, this.color);
    CerclePlein(
    this.x + this.length - this.radius, this.y + this.radius, this.radius * 2, this.color);
    CerclePlein(
    this.x + this.radius, this.y + this.height - this.radius, this.radius * 2, this.color);
    CerclePlein(
    this.x + this.length - this.radius, this.y + this.height - this.radius, this.radius * 2, this.color);
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

// variables definitions
var gmae_loop = null;
var window_height = ctx.canvas.height;
var window_width = ctx.canvas.width;
var rect_fin_jeu = rectangle(window_width - 30, window_height - 30, 30, 30, 0, "red");

var game_state = "menu";


var background_menu = PreloadImage('https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/portals_3/H2x1_CharacterHub_InazumaEleven_image1600w.jpg');

function draw_menu() {
  DrawImageObject(background_menu,0,0,window_width,window_height);
  setCanvasFont("helvetica", window_width*0.02 + "pt", "bold");
  Texte(window_width/2 - 100, window_height/2 -100, "Jouer", "purple");
}

function draw_game() {}



// main loop
function game() {
  gmae_loop = setInterval(function() {
    //drawings
    ctx.clearRect(0, 0, window_width, window_height);
    if (game_state == "menu") {
      draw_menu();
    } else if (game_state == "player_turn" || game_state == "enemy_turn") {
      draw_game();
    }
    
    rect_fin_jeu.draw();
    
    //interactions
    if (rect_fin_jeu.collide_with_mouse()) {
      rect_fin_jeu.color = "blue";
      rect_fin_jeu.draw();
      clearInterval(gmae_loop);
    }

    
    
  }, 1000 / 60);
}

game();

