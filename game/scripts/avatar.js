const avatar = new Image();
avatar.src = './assets/test/spritesheet.png';

class Avatar {
    constructor(SCENE_WIDTH, SCENE_HEIGHT){
        this.xlimit = SCENE_WIDTH;
        this.ylimit = SCENE_HEIGHT;
        this.radius = fireball_radius;
        this.aura_radius = aura_radius;
        this.att_radius = att_radius;
        this.ca_x = cutout_at_x;
        this.ca_y = cutout_at_y;
        this.aura_x = this.ca_x + 200;
        this.atk_x = this.ca_x + 400;
        this.y = this.ca_y + 150;
        this.move_speed = 0;
        this.jump_height = 0;
        this.j_drag = 1;
        this.col = 'red';
    }
    draw(){
        context.drawImage(avatar,
                    spr_x(), spr_y(), spr_wd, spr_ht,
                    this.ca_x, this.ca_y, cutout_wd, cutout_ht);
        avatar_FPS++;
    }
}

const avie = new Avatar(SCENE_WIDTH, SCENE_HEIGHT);