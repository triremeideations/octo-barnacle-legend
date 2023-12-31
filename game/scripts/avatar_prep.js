let avatar_FPS = 0;

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
        name: 'bop',
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

//do this manually for a backward run sprite
let co_ordinates = [
    {x: 0, y: 520},
    {x: 640, y: 520},
    {x: 1280, y: 520},
    {x: 1920, y: 520},
    {x: 2560, y: 520}
]

let backrun = {co_ordinates};
spritesheet['backrun'] = backrun;
console.log(spritesheet);
//manual push for backward run sprite

function avatar_render_prep() {
    //first set avatar active
    avatar_active = sessionStorage.getItem('st_ava');

    //activate different frames for separate states
    pace(avatar_active);

    const frame_limit = spritesheet[avatar_active]
                        .co_ordinates.length;
    let frame_pos = Math.floor(avatar_FPS/frame_speeds)
                    % frame_limit;

    //cycle through avatar frames
    let spr_sh_y = spritesheet[avatar_active]
                    .co_ordinates[frame_pos].y;
    spr_x =()=> (frame_pos*spr_wd);
    spr_y =()=> spr_sh_y;
    // console.log(spr_wd);
    
//reverse the cycle
    function rev_x(n){
        if (n === 0) x = 4;
        if (n === 1) x = 3;
        if (n === 2) x = 2;
        if (n === 3) x = 1;
        if (n === 4) x = 0;
        return x;
    }
    frame_sop = rev_x(frame_pos);
    rps_x =()=> (frame_sop * spr_wd);
}
//prep over

function pace(n){
    switch (n) {
        case 'run':
            frame_speeds = 8;
            bg_Speed = 10;
            break;
        case 'backrun':
            frame_speeds = 8;
            bg_Speed = 0;
            break;
        case 'standby':
            frame_speeds = 50;
            bg_Speed = 0;
            break;
        case 'fly':
            frame_speeds = 1.2;
            bg_Speed = 20;
            break;
        case 'gethit':
            frame_speeds = 9;
            bg_Speed = 0;
            break;
        case 'limp':
            frame_speeds = 6;
            bg_Speed = 1;
            break;
        case 'kick':
            frame_speeds = 5;
            bg_Speed = 0;
            break;
        case 'punch':
            frame_speeds = 3;
            bg_Speed = 0;
            break;
        case 'bop':
            frame_speeds = 5;
            bg_Speed = 5;
            break;
        case 'burst':
            frame_speeds = 5;
            bg_Speed = 2;
            break;
        default:
            frame_speeds = 8;
            bg_Speed = 10;
            break;
    }
}