void setup(){
  size(800,600);
  frameRate(30);
}

void setupBG(){
   clear();
   background(153);
   translate(400,300);
   scale(1,-1);
   noFill();
   stroke(0);
   circle(0,0,200);
}

float centroX;
float centroY;
float angulo = 0;
float pontoX;
float pontoY;
float angulo2 = 0;

void draw(){
   setupBG();
   noFill();
   stroke(0);
   centroX = 75*cos(angulo);
   centroY = 75*sin(angulo);
   circle(centroX,centroY,50);
   pontoX = 25*cos(-angulo2);
   pontoY = 25*sin(-angulo2);
   translate(centroX,centroY);
   fill(255,0,0);
   noStroke();
   circle(pontoX, pontoY, 5);
   angulo = angulo + PI/60;
   angulo2 = angulo2 + PI/20;
}
