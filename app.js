


function RectanglePleinArondie(x, y, l, h, r, c){
	RectanglePlein(x  ,y+r,l  ,h-r*2,c);
	RectanglePlein(x+r,y  ,l-r*2,h  ,c);
  
	CerclePlein(x+r  ,y+r  ,r*2, c);
	CerclePlein(x+l-r,y+r  ,r*2, c);
	CerclePlein(x+r  ,y+h-r,r*2, c);
	CerclePlein(x+l-r,y+h-r,r*2, c);
}

function collide(x,y,l,h){
  if((x <= mouseX) && (mouseX <= x+h) && (y <= mouseY) && (mouseY <= y+l) ){
    return true;
  }
  else{
    return false;
  }
}


function mon_jeu(){
  setInterval(function (){
    RectanglePleinArondie(100,100,400,800,50, 'red');
    
    if(collide(100,100,400,800)){
      RectanglePleinArondie(100,100,400,800,50, 'blue');
    }
   
  },1000/60);
}

mon_jeu();
