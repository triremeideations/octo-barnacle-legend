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
let spr_wd = 640, spr_ht = 520;
let cutout_at_x = 0;
let cutout_at_y = (SCENE_HEIGHT/ground_offset);
let cutout_wd = 427;
let cutout_ht = 345;

function render_scene(){
    avatar_render_prep();
    context.clearRect(0, 0, SCENE_WIDTH, SCENE_HEIGHT);
    //TODO:
    //apply foreground

    //ensure active state

    //apply avatar on canvas

    //apply wizard to canvas

    //instantiate wizard attacks

    //display health and status bar

    requestAnimationFrame(render_scene);
}
if (sessionStorage.getItem('game_active')==='true') render_scene();