const avatar_active = sessionStorage.getItem('st_ava');

export default function pace(){
    switch (avatar_active) {
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