let start_btn = document.getElementsByClassName('start')[0];
let stop_btn = document.getElementsByClassName('stop')[0];
let reload_btn = document.getElementsByClassName('rel')[0];
let curtain = document.getElementsByClassName('introit')[0];
let veil = document.getElementsByClassName('exitus')[0];
start_btn.addEventListener('click', ()=>curtain_call(curtain));
stop_btn.addEventListener('click', ()=>restart_game());
// reload_btn.addEventListener('click', ()=>restart_game());

sessionStorage.setItem('is_injured', 'false');
sessionStorage.setItem('game_active', 'false');

function curtain_call(x){
    // full_sc();
    sessionStorage.setItem('st_ava','standby');
    sessionStorage.setItem('game_active','true');
    setTimeout(() => {
        sessionStorage.setItem('wizards','ready');
        sessionStorage.setItem('wizard_fire','start');
    }, 2000);

    x.style.transition = '1s';
    x.style.transform = 'translateY(-100%)';
    setTimeout(() => {
        x.style.display = 'none';
    }, 2000);
    render_scene();
}

function full_sc(){
    let bod = document.querySelector('body');
    if (bod.requestFullscreen){
        bod.requestFullscreen();
    }
    else if (bod.webkitRequestFullScreen){
        bod.webkitRequestFullScreen();
    }
    else if (bod.msRequestFullScreen){
        bod.msRequestFullScreen();
    }
}

function restart_game(){
    sessionStorage.clear();
    window.location.reload();
}
function denouement(){
    if (sessionStorage.getItem('game_over')==='true'){
        veil.classList.add('ostendii');
    }
}

denouement();