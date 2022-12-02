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

  var obj = {
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

function animated_tilemap(image, nb_images) {
  var obj = {
    image: image,
    nb_images: nb_images,
    sprite_width: image.width / nb_images,
    sprite_height: image.height
  };
  return obj;
}

function animated_sprite(tilemap, x, y, rel_size, refresh_rate) {
  var draw = function() {
    ctx.drawImage(
    this.tilemap.image, this.tilemap.sprite_width * this.current_frame, 0, this.tilemap.sprite_width, this.tilemap.sprite_height, this.x, this.y, this.tilemap.sprite_width*this.rel_size, this.tilemap.sprite_height*this.rel_size);
  };

  var anim = function() {
    this.current_frame += 1;
    if (this.current_frame === this.tilemap.nb_images) {
      this.current_frame = 0;
    }
  };

  var obj = {
    x: x,
    y: y,
    rel_size: rel_size,
    tilemap: tilemap,
    current_frame: 0,
    refresh_rate: refresh_rate,
    draw: draw
  };

  obj.anim = setInterval(anim.bind(obj), obj.refresh_rate);

  return obj;
}

function personnages(x, y, nbImage) {
  var draw = function() {
    if (this.is_compressed == true) {
      ctx.drawImage(
      players_images, 38 * (this.nbImage - 1), 0, 38, 62, this.x, this.y + 4, 38, 62 - 4);
    } else {
      ctx.drawImage(
      players_images, 38 * (this.nbImage - 1), 0, 38, 62, this.x, this.y, 38, 62);
    }
  };

  var anim = function() {
    this.is_compressed = !this.is_compressed;
  };

  var obj = {
    x: x,
    y: y,
    nbImage: nbImage,
    is_compressed: false,
    draw: draw
  };

  var createAnimInterval = function() {
    obj.anim = setInterval(anim.bind(obj), 500);
  };
  setTimeout(createAnimInterval.bind(obj), Hasard(1000));

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
var rect_fin_jeu = rectangle(
window_width - 30, window_height - 30, 30, 30, 0, "red");

var game_state = "menu";

var background_menu = PreloadImage("https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/portals_3/H2x1_CharacterHub_InazumaEleven_image1600w.jpg");
var rect_play_button = rectangle(
window_width / 2 - 100, window_height / 2 - 50, 200, 100, 20, rgba(0, 0, 0, 0.2));

var players_images = PreloadImage(readFile("Data/persos.png"));
var players = [];
players.push(personnages(window_width / 3,  window_height / 2 - 35, 1));
players.push(personnages(window_width / 3 - 50,  window_height / 2, 2));
players.push(personnages(window_width / 3 + 50,  window_height / 2, 3));
players.push(personnages(window_width / 3,  window_height / 2 + 35, 4));

players.push(personnages(window_width*2 / 3,  window_height / 2 - 35, 6));
players.push(personnages(window_width*2 / 3 - 50,  window_height / 2, 7));
players.push(personnages(window_width*2 / 3 + 50,  window_height / 2, 8));
players.push(personnages(window_width*2 / 3,  window_height / 2 + 35, 9));

var blue_fire_img = PreloadImage(readFile("Data/blue-fire.png"));
var blue_fire_tiles = animated_tilemap(blue_fire_img, 6);
var blue_fire = animated_sprite(blue_fire_tiles,  0,  window_height - blue_fire_img.height*0.8 - 10, 0.8, 120);

// Game variables defintions
var health = 40;
var max_health = 40;
var hisastu = 5;
var max_hisastu = 5;

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
  players.forEach(function(player) {
    player.draw();
  });
  
  blue_fire.draw();
  
  setCanvasFont("helvetica", window_width * 0.02 + "pt", "bold");
  Texte(window_width*0.03, window_height, "10", "black");

  if (game_state == "player_turn") {
    setCanvasFont("helvetica", window_width * 0.02 + "pt", "bold");
    Texte(window_width*0.03, window_height - 50, "10", "blue");
  }
  Texte(window_width*0.03, window_height - 50, hisastu, "white");
}

// main loop

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

      players.forEach(function(player) {
        clearInterval(player.anim);
      });

      clearInterval(game_loop);
    }

    mouse_clicked = false;
  }, 1000 / 60);
}

game();
