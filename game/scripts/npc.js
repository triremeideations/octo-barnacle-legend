//NPC characters render: the wizards
const wizard_count = 2;
const wizard_list=[];
const fire_list=[];

const fbl_list_x =[];
const fbl_list_y =[];

class Wizard_NPC {
    constructor(){
        this.image = new Image();
        this.image.src = './assets/test/Idle.png';
        this.min_x = 500;
        this.max_x = 1300;
        this.radius = 200;
        this.x = Math.floor(
                    Math.random()*(this.max_x - this.min_x + 1)
                    ) + this.min_x;

        fbl_list_x.push(this.x);
        //fireball is to be aligned
        //as clsoe to wizard stick as possible

        let astrg_x = JSON.stringify(fbl_list_x);
        sessionStorage.setItem('fb_x', astrg_x);

        this.min_y = 50;
        this.max_y = 200;
        this.y = Math.floor(
                    Math.random()*(this.max_y - this.min_y + 1)
                    ) + this.min_y;
        
        fbl_list_y.push(this.y); //ditto
        let astrg_y = JSON.stringify(fbl_list_y);
        sessionStorage.setItem('fb_y', astrg_y);
        
        this.spr_width = 628;
        this.spr_height = 540;
        this.width = this.spr_width * 0.75; //scale down wizard girth
        this.height = this.spr_height;
        this.current_frame = 0;
        // this.move_loci = Math.round(Math.random() * 5 - 2.5);
        
        this.wizard_FPS = 0;
        this.flare = Math.round(Math.random()*3 + 4); //flame speed not fireball
    }

    update(){
        this.x += Math.round(Math.random()*5 - 2.5);
        this.y += Math.round(Math.random()*5 - 2.5);
        //generate wizard at a random location each time
        if (this.wizard_FPS % this.flare === 0){
            this.current_frame > 4 ? this.current_frame=0 : this.current_frame++;
        }
    }

    apply(){
        this.at_x = this.current_frame * this.spr_width;
        //put a collision indicator on the wizard
        context.beginPath();
            context.arc(this.x + this.width*0.5,
                this.y + this.height*0.5,
                this.radius,
                0, 2*Math.PI);
                // context.strokeStyle = 'white';
                context.strokeStyle = 'transparent';
            context.stroke();
            context.closePath();
        context.drawImage(this.image,
                        this.at_x, 0, this.spr_width, this.spr_height,
                        this.x, this.y, this.width, this.height);
        this.wizard_FPS++;
    }
}
//create and push new wizard cahracter to dedicated array
for (i=0; i < wizard_count; i++){
    wizard_list.push(new Wizard_NPC());
}
console.log(wizard_list);


class Fireball{
    constructor(){
        let x_array = [];
        x_array = JSON.parse(sessionStorage.getItem('fb_x'));
        let y_array = JSON.parse(sessionStorage.getItem('fb_y'));

        if (x_array.length > 0){
            this.x_fb = (x_array.slice(-1)[0]) + 200;
            x_array.pop(-1)[0];
            let re_astrg_x = JSON.stringify(x_array);
            sessionStorage.setItem('fb_x', re_astrg_x);
        }
        if (y_array.length > 0){
            this.y_fb = (y_array.slice(-1)[0]) + 200;
            y_array.pop(-1)[0];
            let re_astrg_y = JSON.stringify(y_array);
            sessionStorage.setItem('fb_y', re_astrg_y);
        }
        //NOTE TO SELF. This gets very involved: basically its just to ensure
        //the fireballs are aligned to the sticks. Since the wizard is randomly
        //generated, i have to store the coordinate keys as reference, but then
        //select them in reverse order. Since the fireballs are basically the same
        //image, it ultimately doesn't matter.

        this.fbl_speed = 0;
        this.radius = fireball_radius;
        this.init = this.x_fb; //its the fireball init position, innit? lol.
        this.angle = 0;
        this.angle_chg = Math.random()*0.03;
    }
    
    apply(){
        if (sessionStorage.getItem('wizards')=='ready'){
            // this.fbl_speed = Math.random()*4 + 1;

            context.beginPath();
            context.arc(this.x_fb, this.y_fb, this.radius,
                        0, 2*Math.PI);
            context.fillStyle = getComputedStyle(
                        document.documentElement)
                        .getPropertyValue('--wizard_fire_1');
            context.fill();
            context.closePath();
        }
    }

    rain_fire(){
        if (sessionStorage.getItem('wizard_fire')=='start'){
            this.fbl_speed = 3;
        }
        this.x_fb -= this.fbl_speed * 3.5;
        if(this.x_fb + this.radius < 0){
            this.x_fb = this.init;
            
        }  
        this.y_fb += 3 * Math.sin(this.angle);
        this.angle += this.angle_chg;
    }

}
for (i=0; i < wizard_count; i++){
    fire_list.push(new Fireball());
}

console.log(fire_list);
//end fireball render