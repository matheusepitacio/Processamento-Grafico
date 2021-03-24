void setup(){
    size(800,600);
    frameRate(30);
}

float x = 0;
float y = 0;
float velocidadeX = 370/30;
float velocidadeY = 10;

void draw(){
  clear();
  background(153);
  translate(0,300);
  scale(1,-1);
  line(0,0,800,0);
  circle(x+30,y+30,60);
  x = x + velocidadeX;
  velocidadeY = velocidadeY - 0.5;
  if (y <= 0) {
    velocidadeY = 10;
  }
  y = y + velocidadeY;
  if (x >= 740) {
     velocidadeX = -5;
  } 
  if (x <= 0) {
     velocidadeX = 5; 
  }
  saveFrame();
}
