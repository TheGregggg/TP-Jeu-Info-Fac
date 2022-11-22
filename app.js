function collide(x, y, l, h) {
  if ((x <= mouseX) && (mouseX <= x + l) && (y <= mouseY) && (mouseY <= y + h)) {
    return true;
  } else {
    return false;
  }
}

function rectangle(x, y, length, height, radius, color) {

  var RectanglePleinArrondie = function() {
    RectanglePlein(this.x, this.y + this.radius, this.length, this.height - this.radius * 2, this.color);
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
    if ((this.x <= mouseX) && (mouseX <= this.x + this.length) && (this.y <= mouseY) && (mouseY <= this.y + this.height)) {
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



var boucle_jeu = null;


function mon_jeu() {

  rect_fin_jeu = rectangle(100, 100, 400, 800, 50, 'red');

  boucle_jeu = setInterval(function() {
	
    
    if (rect_fin_jeu.collide_with_mouse()) {
      rect_fin_jeu.color = 'blue';
      clearInterval(boucle_jeu);
    }
    
    
    rect_fin_jeu.draw();

  }, 1000 / 60);
}

mon_jeu();
