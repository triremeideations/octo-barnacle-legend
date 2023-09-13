import avatar_render_prep from "./render_prep.js";

const main = document.querySelectorAll(".main_frame");
const win_w = window.innerWidth;
const win_h = window.innerHeight;
const canvas = document.getElementById('scene_1');
const context = canvas.getContext('2d');

//this is an attempt to override clipping on firefox
//to reduce game lag
//CanvasRenderingContext2D.prototype.clip = function () { };

const ground_offset = 1.61;

if (win_w < 600){
    alert('game is best played in landscape mode!');
}

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

// const health_reduction_factor = 0.1;
// const score_reduction_factor = 0.2;
// const enemy_hurt_factor = 0.05;

function render_scene(){
    avatar_render_prep();
    context.clearRect(0,0, SCENE_WIDTH, SCENE_HEIGHT);
    
    requestAnimationFrame(render_scene());
}