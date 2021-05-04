PImage photo, img, img2;

void setup(){
  size(410,736);
  img = loadImage("char2_d.png");
  photo = loadImage("char2_s.png");
  //img2 = loadImage("char2_n.png");
  photo.loadPixels();
  //img2.loadPixels();
  img.loadPixels();
  for (int i = 0; i < photo.pixels.length ; i++){
    photo.pixels[i] = photo.pixels[i] + img.pixels[i]; //mg2.pixels[i];
  }
  photo.updatePixels();
}


void draw(){
  image(photo, 0, 0);
  
}
