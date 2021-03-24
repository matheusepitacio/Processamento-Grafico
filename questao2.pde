//OBS: COMO 2 E 3 UTC ERA MUITO PEQUENO
//EU AUMENTEI PARA 20 E 30

void setup(){
  size(250,250);
  frameRate(60);
}

void setupBG(){
  clear();
  background(153);
  translate(125,50);
}

float bracoX, bracoY, antebracoX, antebracoY;
float angulo = 0;

void draw(){
  setupBG();
  bracoX = 20 * sin(angulo);
  bracoY = 20 * cos(angulo);
  antebracoX = 50 * sin(2*angulo);
  antebracoY = 50 * cos(2*angulo);

  fill(255,255,255);
  line(0,0,bracoX,bracoY);
  line(bracoX,bracoY, antebracoX, antebracoY);
  circle(0,0,10);
  circle(bracoX,bracoY,10);
  circle(antebracoX, antebracoY,10);
  
  if (antebracoY > bracoY){
    angulo += PI/480;
  }
  
}
