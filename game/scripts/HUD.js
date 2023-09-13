let health = 100;
let mkp = 50;
let skillXP = 0;
let wizard_health = 100;

function displayHealth(context){
    if (sessionStorage.getItem('game_over')==='true'){
        context.font = '8rem cnt_b';
        context.fillStyle = 'rebeccapurple';
        context.fillText('GAME OVER',
        (canvas.width * 0.3), 410);
        context.fillStyle = 'goldenrod';
        context.fillText('GAME OVER',
        (canvas.width * 0.3), 400);
        denouement();
    }
    else {
    context.beginPath();
    context.fillStyle = 'rebeccapurple';
    context.fillRect(250, 43, 600, 30);
    context.closePath();

    context.beginPath();
    context.fillStyle = 'goldenrod';
    context.fillRect(250, 43, health*6, 30);
    context.closePath();

    context.beginPath();
    context.fillStyle = 'rebeccapurple';
    context.fillRect(1150, 43, 300, 30);
    context.closePath();

    context.beginPath();
    context.fillStyle = 'yellowgreen';
    context.fillRect(1150, 43, mkp*3, 30);
    context.closePath();

    context.font = '4rem cnt_b';
    context.beginPath();
    context.fillStyle = 'rebeccapurple';
    context.fillText('Health:  ', 20, 75);
    context.fillText('Kpiureh:  ', 870, 75);
    context.fillText('Skill XP:  ' + skillXP, 1500, 75);
    context.closePath();

    context.beginPath();
    context.fillStyle = 'goldenrod';
    context.fillText('Health:  ', 20, 70);
    context.fillText('Kpiureh:  ', 870, 70);
    context.fillText('Skill XP:  ' + skillXP, 1500, 70);
    context.closePath();

    context.beginPath();
    context.fillStyle = 'gray';
    context.fillRect(450, 743, 1000, 30);
    context.closePath();

    context.beginPath();
    context.fillStyle = 'red';
    context.fillRect(450, 743, wizard_health*10, 30);
    context.closePath();
    }
}