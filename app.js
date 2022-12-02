// init algoscript
turtleEnabled = false;
Initialiser();

var font = PreloadGooglefont("'Audiowide', cursive");

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

function card(x, y, width, height, radius, spacing, color) {
  var draw = function() {
    this.main_rect.draw();
    this.title_rect.draw();
    this.effect_rect.draw();
  };
 
  
  var obj = {
    x: x,
    y: y,
    width: width,
    height: height,
    radius: radius,
    spacing: spacing,
    color: color,
    draw: draw
  }; 
  obj.main_rect = rectangle(obj.x,obj.y,obj.width,obj.height,obj.radius, obj.color);
  obj.title_rect = rectangle(obj.x + obj.spacing, obj.y + obj.spacing, obj.width - obj.spacing*2, obj.height*0.25 - obj.spacing*2, obj.radius, 'white');
  obj.effect_rect = rectangle(obj.x + obj.spacing, obj.y + obj.height*0.25 + obj.spacing, obj.width - obj.spacing * 2, obj.height*0.75 - obj.spacing*2, obj.radius, 'white');
  
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
    this.tilemap.image, this.tilemap.sprite_width * this.current_frame, 0, this.tilemap.sprite_width, this.tilemap.sprite_height, this.x, this.y, this.tilemap.sprite_width * this.rel_size, this.tilemap.sprite_height * this.rel_size);
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

var background_game = PreloadImage(readFile("Data/background.jpg"));

var players_images = PreloadImage(readFile("Data/persos.png"));
var rel_player_x = window_height * 1.75 / 3;
var rel_player_y = window_width / 3;
var players = [];
players.push(personnages(rel_player_y, rel_player_x - 35, 1));
players.push(personnages(rel_player_y - 50, rel_player_x, 2));
players.push(personnages(rel_player_y + 50, rel_player_x, 3));
players.push(personnages(rel_player_y, rel_player_x + 35, 4));

players.push(personnages(rel_player_y * 2, rel_player_x - 35, 6));
players.push(personnages(rel_player_y * 2 - 50, rel_player_x, 7));
players.push(personnages(rel_player_y * 2 + 50, rel_player_x, 8));
players.push(personnages(rel_player_y * 2, rel_player_x + 35, 9));

var blue_fire_img = PreloadImage(readFile("Data/blue-fire.png"));
var blue_fire_tiles = animated_tilemap(blue_fire_img, 6);
var blue_fire = animated_sprite(blue_fire_tiles, 0, window_height - blue_fire_img.height * 0.8 - 10, 0.8, 120);

var main = 5;

var rel_card_y = window_height*5 / 6;
var rel_card_width = window_width * 0.09;
var rel_card_x = (window_width / 2) - (rel_card_width * main / 2);
var cards = [];
for(i = 0; i < main; i++) {
  cards.push(card(rel_card_x + rel_card_width*i, rel_card_y, window_width*0.09, window_width*0.09*1.62, 12, 5, 'orange'));
}

//var test_card = card(0,0,100,162,12,5,'orange');

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

  setCanvasFont(font, window_width * 0.02 + "pt", "bold");
  Texte(window_width / 2 - 70, window_height / 2 + 15, "Jouer", "white");
}

function draw_game() {
  DrawImageObject(background_game, 0, 0, window_width, window_height);

  players.forEach(function(player) {
    player.draw();
  });

  blue_fire.draw();
  
  cards.forEach(function(cardd) {
    cardd.draw();
  });
  
  //test_card.draw();

  if (game_state == "player_turn") {
    setCanvasFont(font, window_width * 0.02 + "pt", "bold");
    Texte(window_width / 2 - 100, 50, "Votre Tour", rgb(219, 118, 75));
  }
  setCanvasFont(font, window_width * 0.02 + "pt", "bold");
  Texte(blue_fire_tiles.sprite_width*0.8/2 - window_width * 0.02 / 2, window_height - 50, hisastu, rgb(219, 118, 75));
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
      clearInterval(blue_fire.anim);
      clearInterval(game_loop);
    }

    mouse_clicked = false;
  }, 1000 / 60);
}

setTimeout(game(),1000);
