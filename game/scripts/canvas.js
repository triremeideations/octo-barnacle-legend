const main = document.querySelectorAll(".main_frame");
const win_w = window.innerWidth;
const win_h = window.innerHeight;
const canvas = document.getElementById('scene_1');
const context = canvas.getContext('2d');

if (win_w < 600){
    alert('game is best played in landscape mode!');
}

const ground_offset = 1.61;

//dimensions
canvas.width = 1920;
canvas.height = 800;
const SCENE_WIDTH = canvas.width;
const SCENE_HEIGHT = canvas.height;
const fireball_radius = 40;
const aura_radius = 80;

let att_radius = 100;
const spr_wd = 640;
const spr_ht = 520;
let cutout_at_x = 0;
let cutout_at_y = (SCENE_HEIGHT/ground_offset);
let cutout_wd = 427;
let cutout_ht = 345;

const health_reduction_factor = 0.1;
const score_reduction_factor = 0.2;
const enemy_hurt_factor = 0.5;

function render_scene(){
    avatar_render_prep();
    context.clearRect(0, 0, SCENE_WIDTH, SCENE_HEIGHT);
    
    bgLayersPre.forEach(layer =>{
        layer.update();
        layer.apply();
    });
    //ensure avatar active state
    avatar_active = sessionStorage.getItem('st_ava');
    avatar_active === 'backrun' ? avie.backward() : avie.draw();

    //apply avatar on canvas
    avie.aura();

    avatar_active === 'burst' ? avie.shield() : avie.draw();
    avie.move(input_in);
    avie.attack(input_in, fire_list, wizard_list);
    avie.life(fire_list, wizard_list);
    
    //apply wizard to canvas
    wizard_list.forEach(n => {
        n.update();
        n.apply();
    });

    //instantiate wizard attacks
    //engage fireballs
    fire_list.forEach(n =>{
        n.apply();
        n.rain_fire();
    });

    //apply remaining background
    bgLayersPost.forEach(layer =>{
        layer.update();
        layer.apply();
    });

    //display health and status bar
    //display health
    displayHealth(context);

    requestAnimationFrame(render_scene);
}

if (sessionStorage.getItem('game_active')==='true') render_scene();