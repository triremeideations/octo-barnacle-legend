let avatar_FPS = 0;
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
co_ordinates = [
    {x: 0, y: 520},
    {x: 640, y: 520},
    {x: 1280, y: 520},
    {x: 1920, y: 520},
    {x: 2560, y: 520}
]

backrun = {co_ordinates};
spritesheet['backrun'] = backrun;
console.log(spritesheet);
//manual push for backward run sprite

export default class Avatar{
    constructor(SCENE_WIDTH, SCENE_HEIGHT, ground_offset){
        this.img = new Image();
        this.img.src = './assets/test/spritesheet.png';
        
        this.spr_wd = 640;
        this.spr_ht = 520;
        
        this.ca_x = 0;
        this.ca_y = (SCENE_HEIGHT/ground_offset);

        this.cutout_wd = 427;
        this.cutout_ht = 345;

        this.xlimit = SCENE_WIDTH;
        this.ylimit = SCENE_HEIGHT;
        
        this.aura_x = this.ca_x + 200;
        this.atk_x = this.ca_x + 400;
        this.y = this.ca_y + 150;
        
        this.radius = fireball_radius;
        this.aura_radius = aura_radius;
        this.att_radius = att_radius;

        this.move_speed = 0;
        this.jump_height = 0;
        this.j_drag = 1;
        this.col = 'red';
    }

}