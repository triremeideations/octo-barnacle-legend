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
        this.col_2 = 'green';
        this.col_3 = 'blue';
        this.col_asp = 'transparent'
        this.col_aura_s = this.col_asp;
    }
    
    draw(){
        context.drawImage(avatar,
                    spr_x(), spr_y(), spr_wd, spr_ht,
                    this.ca_x, this.ca_y, cutout_wd, cutout_ht);
        avatar_FPS++;
    }
    backward(){
        context.drawImage(avatar,
                        rps_x(), spr_y(), spr_wd, spr_ht,
                        this.ca_x, this.ca_y, cutout_wd, cutout_ht);
        avatar_FPS++;
    }

    landed(){
        return this.ca_y >= this.ylimit - cutout_ht + 20;
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
        else if(input_in.presskey.indexOf('ArrowDown') > -1){
            this.move_speed = 0;
            sessionStorage.setItem('st_ava','burst');
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
    aura(){
        context.beginPath();
        context.arc(this.aura_x, this.y,
            this.aura_radius, 0, 2 * Math.PI);
            context.fillStyle = this.col_asp;
            context.stroke();
            context.closePath();
        }

    shield(fire_list){
        this.aura_y = this.y;
        context.beginPath(fire_list);
        context.arc(this.atk_x, this.y,
            this.att_radius, 0, 2 * Math.PI);
        context.fillStyle = this.col_aura_s;
        context.fill();
        context.closePath();
        
        //implement immunity to fireballs
        //immunity stops when magick depletes
            fire_list.forEach(ball => {
                const dee_x = (ball.x_fb) - this.aura_x; 
                const dee_y = (ball.y_fb) - this.aura_y;
                const dist_tance = Math.sqrt(dee_x*dee_x + dee_y*dee_y);
                if (dist_tance < ball.radius + this.aura_radius){
                    mkp -= mkp_reduction_factor_B;
                    if (mkp >= 1) {
                        this.col_aura_s = this.col_2;
                        this.aura_radius = 0;
                    }
                }
                setTimeout(()=> this.aura_radius = 80, 3000);
                setTimeout(()=>{this.col_aura_s = this.col_asp}, 1500);
            })
    }


    attack(input_in, wizard_list){
        if(input_in.presskey.indexOf('w') > -1){
            sessionStorage.setItem('st_ava','punch');
            this.col = 'white';
        }
        else if(input_in.presskey.indexOf('s') > -1){
            sessionStorage.setItem('st_ava','kick');
        }
        
        else if(input_in.presskey.indexOf('a') > -1
                && this.landed()){
            this.jump_height -= 10;
        }
        else if(input_in.presskey.indexOf('a') > -1){
            sessionStorage.setItem('st_ava','bop');
        }
        else if(input_in.presskey.indexOf('d') > -1){
            sessionStorage.setItem('st_ava','burst');
        }

        //dealing damage to wizard
        if (wizard_health <= 0) wizard_health = 0;
        if (
            avatar_active === 'punch'
        ){
            if (mkp >= 1){
                context.beginPath();
                context.arc(this.atk_x, this.y,
                    this.att_radius, 0, 2 * Math.PI);
                    context.fillStyle = 'brown';
                    context.fill();
                    context.closePath();
                    
                    for(i=0; i < 200; i++){
                        this.atk_x++;
                        mkp -= mkp_reduction_factor_A;
                    }
                    setTimeout(() => {
                        for(i=0; i < 200; i++){
                            this.atk_x--;
                        }
                    }, 500);
                }
            wizard_list.forEach(wizzy => {
                const di_x = (wizzy.x + wizzy.width*0.5) - this.atk_x; 
                const di_y = (wizzy.y + wizzy.height*0.5) - this.y;
                const dist_dist = Math.sqrt(di_x*di_x + di_y*di_y);
                if (dist_dist < wizzy.radius + this.att_radius){
                    wizard_health -= enemy_hurt_factor;
                } 
            })
        }

    }

    life(fire_list, wizard_list){
        if (sessionStorage.getItem('game_over')!='true'){
            if(skillXP <= 4) mkp += 0.005;
            else if(19 > skillXP > 10 ) mkp += 0.05;
            else if(50 > skillXP > 20) mkp += 0.08;
            else if(skillXP >= 50) mkp += 0.5;
            if (mkp <= 0) mkp = 0;
            if (mkp > 100) mkp = 100;
            
            //detect collision
            let damage = 0;
            fire_list.forEach(ball => {
                const dx = ball.x_fb - this.aura_x; 
                const dy = ball.y_fb - this.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < ball.radius + this.aura_radius){
                    sessionStorage.setItem('st_ava','gethit');
                    health-= health_reduction_factor;
                    skillXP--;
                    handle_game_points();
                }
            })
            wizard_list.forEach(wizzy => {
                const ax = (wizzy.x + wizzy.width*0.5) - this.aura_x; 
                const ay = (wizzy.y + wizzy.height*0.5) - this.y;
                const aist = Math.sqrt(ax*ax + ay*ay);
                if (aist < wizzy.radius + this.aura_radius){
                    sessionStorage.setItem('st_ava','gethit');
                    damage++;
                    health -= damage;
                    health = Math.floor(health);
                    handle_game_points();
                } 
            })
        }
    }
}

function handle_game_points(){
    if (health <= 0){
        health = 0;
        sessionStorage.setItem('game_over','true');
    }
    if (health <= 50){
        sessionStorage.setItem('is_injured', 'true');
    }
    if (health > 50){
        sessionStorage.setItem('is_injured', 'false');
    }
    if (skillXP <= 0) skillXP = 0;

}

const avie = new Avatar(SCENE_WIDTH, SCENE_HEIGHT);