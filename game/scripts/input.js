class InputHandler{
    constructor(){
        this.presskey = [];
        window.addEventListener('keydown', e => {
            console.log(e.key);
            if ((   e.key === 'ArrowUp' ||
                    e.key === 'w' ||
                    e.key === 'a' ||
                    e.key === 's' ||
                    e.key === 'd' ||
                    e.key === 'ArrowDown' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'ArrowLeft')
                    && this.presskey.indexOf(e.key) === -1){
               this.presskey.push(e.key);
            }
            console.log(e.key, this.presskey);
        });
        window.addEventListener('keyup', e => {
            console.log(e.key);
            if (    e.key === 'ArrowUp' ||
                    e.key === 'w' ||
                    e.key === 'a' ||
                    e.key === 's' ||
                    e.key === 'd' ||
                    e.key === 'ArrowDown' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'ArrowLeft'
                ){
                this.presskey.splice(this.presskey.indexOf(e.key), 1);
            }
            console.log(e.key, this.presskey);
        });
    }
}

const input_in = new InputHandler();