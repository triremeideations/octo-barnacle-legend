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

        //simulate keyboard input

        const touch_ev =(key, designation)=>{
            console.log(key);
            if ((key === designation)
                && this.presskey.indexOf(key) === -1
            ){ this.presskey.push(key) }

            console.log(key, this.presskey);
        }

        const touch_ev_up =(key, designation)=>{
                console.log(key);
                if ((key === designation)){
                    this.presskey.splice(this.presskey.indexOf(key), 1);
                }
            
            console.log(key, this.presskey);
        }

        const simkey =(knob, designation)=> {
            knob.addEventListener('touchstart', e => {
                let key = e.changedTouches[0].target.textContent;
                touch_ev(key, designation);
                const duration = setInterval(()=>touch_ev(key, designation), 300);
                sessionStorage.setItem('dur',duration);
            });

            knob.addEventListener('touchend', e => {
                const duration = sessionStorage.getItem('dur');
                clearInterval(duration);
                let key = e.changedTouches[0].target.textContent;
                touch_ev_up(key, designation);
            });

        }

        simkey(up_k, "ArrowUp");
        simkey(dw_k, "ArrowDown");
        simkey(lf_k, "ArrowLeft");
        simkey(rt_k, "ArrowRight");
        simkey(w_k, "w");
        simkey(a_k, "a");
        simkey(s_k, "s");
        simkey(d_k, "d");
    }
}

const input_in = new InputHandler();