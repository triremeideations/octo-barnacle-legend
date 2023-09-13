let interact = document.getElementsByClassName('interact');

interact[1].addEventListener('click', ()=>{
    window.location.assign('./game');
})
interact[0].addEventListener('click', ()=>{
    window.location.assign('./controls');
})