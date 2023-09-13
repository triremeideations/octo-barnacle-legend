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

    move(input_in){
        // move horizontal
        this.ca_x += this.move_speed;
        this.atk_x += this.move_speed;
        this.aura_x += this.move_speed;

        if(input_in.presskey.indexOf('ArrowRight') > -1){
            this.move_speed = 4;
            if (sessionStorage.getItem('is_injured')==='true'){
                sessionStorage.setItem('st_ava','limp');
            }
            else {sessionStorage.setItem('st_ava','run')};
            console.log(sessionStorage.getItem('is_injured'));
        }
        else if(input_in.presskey.indexOf('ArrowLeft') > -1){
            this.move_speed = -7;
            sessionStorage.setItem('st_ava','backrun');
        }
        else if(input_in.presskey.indexOf('ArrowUp') > -1 && this.landed()){
            this.jump_height -= 30;
        }
        else if(input_in.presskey.indexOf('ArrowUp') > -1){
            sessionStorage.setItem('st_ava','fly');
        }
        else{
            this.move_speed = 0;
            sessionStorage.setItem('st_ava','standby');
        }

        //set run boundaries
        if (this.ca_x < cutout_at_x)
            this.ca_x = cutout_at_x;
        else if (this.ca_x > (this.xlimit - cutout_wd))
            this.ca_x = (this.xlimit - cutout_wd);
        
        //set aura boundaries
        if (this.aura_x < this.ca_x + 200)
            this.aura_x = this.ca_x + 200;
        else if (this.aura_x > 1700)
            this.aura_x = 1700;

        if (this.atk_x < this.ca_x + 400)
            this.atk_x = this.ca_x + 400;
        else if (this.atk_x > SCENE_WIDTH)
            this.atk_x = SCENE_WIDTH;

        //move vertical
        this.ca_y += this.jump_height;
        this.y += this.jump_height;
        if(!this.landed()){
            this.jump_height += this.j_drag;
        }else{
            this.jump_height = 0;
        }

        //set jump boundaries when falling
        if (this.ca_y > SCENE_HEIGHT - cutout_ht + 20)
            this.ca_y = SCENE_HEIGHT - cutout_ht + 20;
        if (this.y > SCENE_HEIGHT - cutout_ht + 170)
            this.y = SCENE_HEIGHT - cutout_ht + 170;
    }
}

const avie = new Avatar(SCENE_WIDTH, SCENE_HEIGHT);