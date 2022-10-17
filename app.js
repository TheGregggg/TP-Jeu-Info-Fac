// Your code here
function RectanglePleinArondie(x, y, l, h, r, c){
	RectanglePlein(x  ,y+r,l  ,h-r*2,c);
	RectanglePlein(x+r,y  ,l-r*2,h  ,c);
  
	CerclePlein(x+r  ,y+r  ,r*2, c);
	CerclePlein(x+l-r,y+r  ,r*2, c);
	CerclePlein(x+r  ,y+h-r,r*2, c);
	CerclePlein(x+l-r,y+h-r,r*2, c);
}

RectanglePleinArondie(100,100,400,800,50, 'red');
