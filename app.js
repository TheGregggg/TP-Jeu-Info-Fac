function RectanglePleinArrondie(x, y, l, h, r, c) {
  RectanglePlein(x, y + r, l, h - r * 2, c);
  RectanglePlein(x + r, y, l - r * 2, h, c);

  CerclePlein(x + r, y + r, r * 2, c);
  CerclePlein(x + l - r, y + r, r * 2, c);
  CerclePlein(x + r, y + h - r, r * 2, c);
  CerclePlein(x + l - r, y + h - r, r * 2, c);
}

function collide(x, y, l, h) {
  if ((x <= mouseX) && (mouseX <= x + l) && (y <= mouseY) && (mouseY <= y + h)) {
    return true;
  } else {
    return false;
  }
}

function rectangle(x, y, length, height, radius, color){
  obj = {
    "x":x,
  "y":y,
  "length":length,
  "height": height,
  "radius":radius,
  "color": color,
  draw : RectanglePleinArrondie(this)};
}


var boucle_jeu = null;

function mon_jeu() {
    boucle_jeu = setInterval(function() {
    RectanglePleinArondie(100, 100, 400, 800, 50, 'red');

    if (collide(100, 100, 400, 800)) {
      RectanglePleinArondie(100, 100, 400, 800, 50, 'blue');
    }

    RectanglePleinArondie(1500, 800, 100, 100, 20, 'red');
    if (collide(1500, 800, 100, 100)) {
        clearInterval(boucle_jeu);
    }

  }, 1000 / 60);
}

mon_jeu();
