void setup(){
  size(800,600);
  frameRate(60);
} 

void setupBG(){
  translate(400,300);
  scale(1,-1);
  line(-400,0,400,0);
  line(0,-300,0,300);
}

float x, y;
float angulo = 0;
float tamanho = 20;
float yAntigo;
float centro = 0;
float anguloPi = 0;

void draw(){
  setupBG();
  noStroke();
  float x = -tamanho * cos(angulo);
  float y = -tamanho * sin(angulo);
  translate(centro,0);
  circle(x, y, 5);
  angulo += PI/240;
  if ((yAntigo < 0 && y > 0) || (yAntigo > 0 && y < 0)){
    if (centro >= 0) {
      centro = centro - tamanho;
    }
    else if (centro < 0) {
      centro = centro + tamanho;
    }
    tamanho = tamanho * 2;
  }
  yAntigo = y;
}
