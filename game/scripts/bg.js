let bg_Speed = 10;

//adding background

const bgHeight = 1080;
const bgWidth = SCENE_WIDTH;

const bgLayer_1 = new Image();
bgLayer_1.src = './assets/test/01_PaleMist.png';
const bgLayer_2 = new Image();
bgLayer_2.src = './assets/test/02_Bushes.png';
const bgLayer_3 = new Image();
bgLayer_3.src = './assets/test/03_Particles.png';
const bgLayer_4 = new Image();
bgLayer_4.src = './assets/test/04_Forest.png';
const bgLayer_5 = new Image();
bgLayer_5.src = './assets/test/05_Particles.png';
const bgLayer_6 = new Image();
bgLayer_6.src = './assets/test/06_Forest.png';
const bgLayer_7 = new Image();
bgLayer_7.src = './assets/test/07_Forest.png';
const bgLayer_8 = new Image();
bgLayer_8.src = './assets/test/08_Forest.png';
const bgLayer_9 = new Image();
bgLayer_9.src = './assets/test/09_Forest.png';
const bgLayer_10 = new Image();
bgLayer_10.src = './assets/test/10_Sky.png';

//background image render
class bgLayer {
    constructor(bg_img, change_speed){
        this.at_loop_1 = 0;
        this.y = 0;
        this.width = bgWidth;
        this.height = bgHeight;
        this.bg_img = bg_img;
        this.change_speed = change_speed;
        this.speed = bg_Speed * this.change_speed;
    }
    update(){
        this.speed = bg_Speed * this.change_speed;
        //determine when the bgLayer ends loop. Reset the position.
        if (this.at_loop_1 <= -this.width) this.at_loop_1 = 0;
        //hence or otherwise, continue as normal
        this.at_loop_1 = Math.floor(this.at_loop_1 - this.speed);
    }
    apply(){
        context.drawImage(this.bg_img,
            this.at_loop_1, this.y, this.width, this.height);
        
        context.drawImage(this.bg_img,
            (this.at_loop_1) + this.width, this.y, this.width, this.height);
    }
}

const bgl_10 = new bgLayer(bgLayer_10, 0.2);
const bgl_9 = new bgLayer(bgLayer_9, 0.3);
const bgl_8 = new bgLayer(bgLayer_8, 0.4);
const bgl_7 = new bgLayer(bgLayer_7, 0.6);
const bgl_6 = new bgLayer(bgLayer_6, 0.7);
const bgl_5 = new bgLayer(bgLayer_5, 10);
const bgl_4 = new bgLayer(bgLayer_4, 1.1);
const bgl_3 = new bgLayer(bgLayer_3, 1);
const bgl_2 = new bgLayer(bgLayer_2, 2);
const bgl_1 = new bgLayer(bgLayer_1, 3);

const bgLayersPre = [
    bgl_10, bgl_9, bgl_8, bgl_7, bgl_6
]
const bgLayersPost = [
    bgl_5, bgl_4, bgl_3, bgl_2, bgl_1
]

console.log (bgLayersPre);
console.log (bgLayersPost);
//end background image render