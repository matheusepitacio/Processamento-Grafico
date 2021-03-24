PVector a = new PVector(100,50,20);

void setup(){
  size(800,800,P3D);
  strokeWeight(3);
}

float angulo; 
float angulo2;

void draw(){
  background(255);
  //draw from centre and rotate with mouse
  translate(width * 0.5, height * 0.5, 0);
  rotateX(map(mouseY,0,height,-PI,PI));
  rotateY(map(mouseX,0,width,PI,-PI));

   //draw centred coordinate system
  drawAxes(400);
  
  pushMatrix();
  stroke(0);
  rotateX(radians(-60));
  noFill();
  rect(0,0,200,200);
  noFill();
  circle(100,100,200);
  pushMatrix();
  translate(100,100);
  rotateY(radians(90));
  rotateX(radians(angulo));
  noFill();
  circle(25,100,50);
  translate(25,100);
  rotateZ(radians(-angulo2));
  fill(256,0,0);
  circle(17.5, 17.5,10);
  popMatrix();
  popMatrix();
  
  angulo = angulo + 1;
  angulo2 = angulo + 10;
  
}
void drawAxes(float size){
  //X  - red
  stroke(192,0,0);
  line(-size,0,0,size,0,0);
  //Y - green
  stroke(0,192,0);
  line(0,-size,0,0,size,0);
  //Z - blue
  stroke(0,0,192);
  line(0,0,-size,0,0,size);
}
