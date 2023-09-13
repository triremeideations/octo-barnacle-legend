const main = document.querySelectorAll(".main_frame");
const win_w = window.innerWidth;
const win_h = window.innerHeight;
const canvas = document.getElementById('scene_1');
const context = canvas.getContext('2d');

if (win_w < 600){
    alert('game is best played in landscape mode!');
}

let action_btn = document.getElementsByClassName('knob');
for (btn of action_btn){
    btn.addEventListener('click', yelp);
}

//dimensions

canvas.width = 1920;
canvas.height = 800;
const SCENE_WIDTH = canvas.width;
const SCENE_HEIGHT = canvas.height;

let spr_wd = 640, spr_ht = 520;
let cutout_at_x = -100, cutout_at_y = (SCENE_HEIGHT/1.7);
let cutout_wd = 427, cutout_ht = 345;

//kinetics
let bg_Speed = 4;
let frame_rate = 0;

//adding background

const bgHeight = 1080;
const bgWidth = SCENE_WIDTH;

const bgLayer_1 = new Image();
bgLayer_1.src = './assets/test/01_Mist.png';
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

const backgroudLayers = [
    bgLayer_1, bgLayer_2, bgLayer_3, bgLayer_4, bgLayer_5,
    bgLayer_6, bgLayer_7, bgLayer_8, bgLayer_9, bgLayer_10
]


//adding player avatar

const avatar = new Image();
avatar.src = './assets/test/spritesheet.png';

const spritesheet = [];
const avatar_states = [
    {
        name: 'standby',
        fr_count: 10,
    },
    {
        name: 'run',
        fr_count: 5,
    },
    {
        name: 'gethit',
        fr_count: 4, /* can +1 for a blink effect*/
    },
    {
        name: 'pob',
        fr_count: 4,
    },
    {
        name: 'fly',
        fr_count: 1,
    },
    {
        name: 'limp',
        fr_count: 7,
    },
    {
        name: 'punch',
        fr_count: 7,
    },
    {
        name: 'burst',
        fr_count: 12,
    },
    {
        name: 'kick',
        fr_count: 4,
    }
];


avatar_states.forEach((el, ind) => {
    /* create and populate the sprites json object
    with an array of the frames' x-y positions.*/

    let sprites = {
        co_ordinates: [],
    }

    for(i=0; i<el.fr_count; i++){
        let ex = i * spr_wd;
        let why = ind * spr_ht;
        sprites.co_ordinates.push(
            {x: ex, y: why}
        );
    }
    
    // append these co-ordinates as a key value pair to the
    // spritesheet array;
    spritesheet[el.name] = sprites;
});

console.log(spritesheet);

at_loop_1 = 0;
at_loop_2 = bgWidth;

//++++++++++++++++game render logic+++++++++++++++++++++++++++++
function render_scene(){
    //first set avatar active

    set_av = sessionStorage.getItem('test_ava');
    move = sessionStorage.getItem('is_move');

    deff =()=> avatar_active = 'standby';
    actv =()=> avatar_active = set_av;

    !move ? deff() : actv();

    pace(); 
    
    const frame_limit = spritesheet[avatar_active].co_ordinates.length;
    
    let frame_pos = Math.floor(frame_rate/frame_speeds) % frame_limit;
    
    spr_x =()=> (frame_pos*spr_wd);
    spr_y =()=> spritesheet[avatar_active].co_ordinates[frame_pos].y;

    context.clearRect(0, 0, SCENE_WIDTH, SCENE_HEIGHT); /*absolutely vital*/

    //background image render

    buckie=(im)=>{
        context.drawImage(im,
            at_loop_1, 0, bgWidth, bgHeight);

        //determine when bgLayer ends loop
        if (at_loop_1 < -bgWidth) {
            at_loop_1 = bgWidth
                        + at_loop_2
                        - bg_Speed;
        }
        else at_loop_1 -= bg_Speed;
    }

    buckie2=(im)=>{
        context.drawImage(im,
            at_loop_2, 0, bgWidth, bgHeight);
        if (at_loop_2 < -bgWidth) {
            at_loop_2 = bgWidth
                        + at_loop_1
                        - bg_Speed;
        }
        else at_loop_2 -= bg_Speed;
    }
    //end background image render
 
    //avatar image render

    avie=()=>{
        context.drawImage(avatar,
            spr_x(), spr_y(), spr_wd, spr_ht,
            cutout_at_x, cutout_at_y, cutout_wd, cutout_ht);
        frame_rate++;
    }
    //end avatar image render

    // buckie(bgLayer_7);
    // buckie2(bgLayer_7);
    avie();


    requestAnimationFrame(render_scene);
};

render_scene();


/* core function definitions */
function yelp(e){
    const move = 'move is set';
    const th_active = sessionStorage.getItem('thunder');
    console.log(move);
    selectmove = e.target.classList[1];
    selectmove == 'fly' ? thunder() : calmed();
    sessionStorage.setItem('test_ava', selectmove);
    sessionStorage.setItem('is_move', move);
}

function pace(){
    switch (avatar_active) {
        case 'run':
            frame_speeds = 8;
            break;
        case 'standby':
            frame_speeds = 50;
            break;
        case 'fly':
            frame_speeds = 1.2;
            break;
        case 'gethit':
            frame_speeds = 9;
            break;
        case 'kick':
            frame_speeds = 9;
            break;
        case 'punch':
            frame_speeds = 7;
            break;
        default:
            frame_speeds = 8;
            break;
    }
}

function thunder(){
    canvas.style.transition='1s';
    cutout_at_y = (SCENE_HEIGHT/3);
    setTimeout(() => {
        canvas.style.backgroundColor = 'black';
            setTimeout(() => {
                canvas.style.backgroundColor = 'rebeccapurple';
                setTimeout(() => {
                    canvas.style.backgroundColor = 'purple';
                }, 500);
            }, 700);
    }, 200);
    canvas.style.transition='0';
}

function calmed(){
    cutout_at_y =(SCENE_HEIGHT/1.7);
    canvas.style.backgroundColor = getComputedStyle(
                                document.documentElement)
                                .getPropertyValue('--canvas_backdrop');
}