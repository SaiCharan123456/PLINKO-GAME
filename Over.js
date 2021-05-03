class Over{
    constructor() {
         this.image = loadImage("joker.png");
        }
    
    display() { 
        imageMode(CENTER);
        image(this.image, 250,530, 900, 900);
        image(this.image, 750,530, 900, 900);
    }
}