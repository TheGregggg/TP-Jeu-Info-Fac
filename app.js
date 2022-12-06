turtleEnabled = false;
Initialiser();

var font = PreloadGooglefont("'Audiowide', cursive");
var orange = rgb(255, 143, 23);

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

function card(x, y, width, height, radius, spacing, color, hissatsu) {
  var draw = function() {
    var txt_size;
    var text_height;
    
    var type_to_display = 'Attaque';
    var card_color = 'red';
    var effect_to_display = 'de dégats';
    if (this.hissatsu.type == 'def'){
      type_to_display = 'Défense';
      card_color = 'blue';
      effect_to_display = 'de défenses';
    }
    
    if (this.color == "default"){
      this.main_rect.color = card_color;
    }
    this.main_rect.draw();
    
    this.hissatsu_cost_rect.draw();
    setCanvasFont(font, this.width * 0.11 + "pt", "bold");
    txt_size = ctx.measureText(this.hissatsu.cost);
    text_height = txt_size.fontBoundingBoxAscent + txt_size.fontBoundingBoxDescent;
    Texte(this.hissatsu_cost_rect.x + this.hissatsu_cost_rect.width/2 - txt_size.width/2, this.y + this.hissatsu_cost_rect.height/2 + text_height/2, this.hissatsu.cost, orange);
    
    
    this.type_rect.draw();
    setCanvasFont(font, this.width * 0.085 + "pt", "bold");
    txt_size = ctx.measureText(type_to_display);
    text_height = txt_size.fontBoundingBoxAscent + txt_size.fontBoundingBoxDescent;
    Texte(this.type_rect.x + this.type_rect.width/2 - txt_size.width/2, this.y + this.type_rect.height/2 + text_height/2, type_to_display, orange);
    
    
    this.title_rect.draw();
    setCanvasFont('Arial', this.width * 0.07 + "pt", "bold");
    txt_size = ctx.measureText(this.hissatsu.name);
    text_height = txt_size.fontBoundingBoxAscent + txt_size.fontBoundingBoxDescent;
    Texte(this.x + this.width/2 - txt_size.width/2, this.title_rect.y + this.title_rect.height/2 + text_height/2 - this.spacing*2/3, this.hissatsu.name, "black");
    
    this.effect_rect.draw();
    // effect number
    setCanvasFont(font, this.width * 0.085 + "pt", "bold");
    txt_size = ctx.measureText(this.hissatsu.effect);
    text_height = txt_size.fontBoundingBoxAscent + txt_size.fontBoundingBoxDescent;
    Texte(this.x + this.width/2 - txt_size.width/2, this.effect_rect.y + this.effect_rect.height/2 - this.spacing*2/3, this.hissatsu.effect, card_color);
    
    // effect text
    setCanvasFont('Arial', this.width * 0.08 + "pt", "bold");
    txt_size = ctx.measureText(effect_to_display);
    text_height = txt_size.fontBoundingBoxAscent + txt_size.fontBoundingBoxDescent;
    if (!(this.effect_rect.y + this.effect_rect.height/2 + text_height - this.spacing*2/3 > window_height)){
    Texte(this.x + this.width/2 - txt_size.width/2, this.effect_rect.y + this.effect_rect.height/2 + text_height - this.spacing*2/3, effect_to_display, "black");
    }
  };

  var obj = {
    x: x,
    y: y,
    width: width,
    height: height,
    radius: radius,
    spacing: spacing,
    color: color,
    draw: draw,
    hissatsu: hissatsu
  };
  obj.main_rect = rectangle(obj.x, obj.y, obj.width, obj.height, obj.radius, obj.color);
  obj.hissatsu_cost_rect = rectangle(obj.x + obj.spacing, obj.y + obj.spacing, (obj.width - obj.spacing * 3)*0.25, obj.height * 0.25 - obj.spacing * 2, obj.radius, 'white');
  obj.type_rect = rectangle(obj.x + obj.spacing*2 + (obj.width - obj.spacing * 3)*0.25, obj.y + obj.spacing, (obj.width - obj.spacing * 3)*0.75, obj.height * 0.25 - obj.spacing * 2, obj.radius, 'white');
  obj.title_rect = rectangle(obj.x + obj.spacing, obj.y + obj.type_rect.height + obj.spacing * 2, obj.width - obj.spacing * 2, obj.height * 0.25 - obj.spacing * 2, obj.radius, 'white');
  obj.effect_rect = rectangle(obj.x + obj.spacing, obj.y + obj.type_rect.height*2 + obj.spacing * 3, obj.width - obj.spacing * 2, obj.height * 0.50, obj.radius, 'white');

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

function hissatsu(name, cost, type, effect){
  obj = {
    name: name,
    cost: cost,
    type: type,
    effect: effect
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

var nb_cards_hand = 5;

var rel_card_y = window_height * 5 / 6;
var rel_cards_spacing = window_width * 0.002;

var total_cards_width = rel_card_width * nb_cards_hand + rel_cards_spacing * (nb_cards_hand - 1);

var rel_card_width = window_width * 0.09;
var rel_card_height = rel_card_width * 1.2;
var rel_card_x = (window_width / 2) - total_cards_width / 2;
var rel_card_radius = window_width * 0.006;
var rel_card_spacing = window_width * 0.0032;

var test_hissatsu = hissatsu("Tempete de feu", 3, "atk", 5);

var cards = [];
for (i = 0; i < nb_cards_hand; i++) {
  cards.push(card(rel_card_x + rel_card_width * i + rel_cards_spacing * i, rel_card_y, rel_card_width, rel_card_height, rel_card_radius, rel_card_spacing, 'default', test_hissatsu));
}
var hover_card = null;

var selected_card_id = null;
var selected_card = null;
var selected_x_offset = null;
var selected_y_offset = null;
var deselect_time = 500;
var can_deselect = false;


// Game variables defintions
var health = 40;
var max_health = 40;
var hissatsu = 5;
var max_hissatsu = 5;

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

  for (i = 0; i < nb_cards_hand; i++) {
    if (cards[i].main_rect.collide_with_mouse() && selected_card === null) {
      hover_card = i;
      if (mouse_clicked) {
        // si aucune carte est selectionné on selectionne la carte survolé lors du click
        selected_card_id = i;
        selected_card = cards[i];
        selected_x_offset = mouseX - (selected_card.x - (rel_card_width * 0.1) / 2);
        selected_y_offset = mouseY - (window_height - rel_card_height * 1.1);
        setTimeout(function(){can_deselect = true;}, deselect_time);
      }

    } else if (i !== selected_card_id) {
      cards[i] = card(rel_card_x + rel_card_width * i + rel_cards_spacing * i, rel_card_y, rel_card_width, rel_card_height, rel_card_radius, rel_card_spacing, 'default', cards[i].hissatsu);
      cards[i].draw();
    }

  }
  if (hover_card != null && selected_card === null) {
    i = hover_card;
    card(rel_card_x + rel_card_width * i + rel_cards_spacing * i - (rel_card_width * 0.1) / 2, window_height - rel_card_height * 1.1, rel_card_width * 1.1, rel_card_height * 1.1, rel_card_radius, rel_card_spacing, orange, cards[i].hissatsu).draw();
    hover_card = null;
  }

  if (selected_card != null) {
    selected_card = card(mouseX - selected_x_offset, mouseY - selected_y_offset, rel_card_width* 1.1, rel_card_height* 1.1, rel_card_radius, rel_card_spacing, 'default', selected_card.hissatsu);
    selected_card.draw();

    if (mouse_clicked && can_deselect && mouseY > rel_card_y*0.8  && mouseX > rel_card_x*0.8 && mouseX < rel_card_x+total_cards_width*1.2) {
        // si user clique dans la zone des cartes, annule la selection
        selected_card = null;
        selected_card_id = null;
        can_deselect = false;
    }
  }


  if (game_state == "player_turn") {
    setCanvasFont(font, window_width * 0.02 + "pt", "bold");
    Texte(window_width / 2 - 100, 50, "Votre Tour", orange);
  }
  setCanvasFont(font, window_width * 0.02 + "pt", "bold");
  Texte(blue_fire_tiles.sprite_width * 0.8 / 2 - window_width * 0.02 / 2, window_height - 50, hissatsu, orange);
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

setTimeout(game(), 1000);