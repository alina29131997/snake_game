window.onload = () => {

    let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    cw = canvas.width = canvas.height = 500,
    s = cw / 20, x = y = 0,
    rows = cols = cw / s,
    direction = { dir: 'right', change: true },
    tail = [],
    food = {x, y},
    head,
    drawInterval,
    speed = 150,
    isPaused = false,
    points,
    record;
        
    createFood();    
    draw();
    document.addEventListener('keydown', e => getDirection(e));
    document.getElementById("pauseBtn").addEventListener('click', e => pause(e));
        
    function cutTale() {
        alert('shit! you fail ');
        tail = [];
    }
        
    function createFood(caught = false) {
        
        let xf = Math.floor(Math.random() * cols) * s;
        let yf = Math.floor(Math.random() * rows) * s;
        
        for (let i = 0; i < tail.length; i++) {
            if (xf     == tail[i].x + s && yf     == tail[i].y    ) { createFood(); return; };
            if (xf     == tail[i].x     && yf     == tail[i].y + s) { createFood(); return; };
            if (xf + s == tail[i].x     && yf     == tail[i].y    ) { createFood(); return; };
            if (xf     == tail[i].x     && yf + s == tail[i].y    ) { createFood(); return; };
            
            if (xf == tail[i].x && yf == tail[i].y) { createFood(); return; };
        }
        
        food = { ...food, x: xf, y: yf };
        tail = [ ...tail, '1' ];
        
        if (caught) {
            points = tail.length - 1;
            
            if (record < points) {
                record = points;
                localStorage.setItem('record', record);
                getEl('record').innerHTML = record;
            };
                
            getEl('points').innerHTML = points;
        }
    }
        
    function getDirection(e) {
        switch(e.keyCode) {
            case 37: if (direction.dir !== 'right' && direction.change) 
                direction = { ...direction, dir: 'left', change: false }; break;
            case 38: if (direction.dir !== 'bottom' && direction.change) 
                direction = { ...direction, dir: 'top', change: false }; break;
            case 39: if (direction.dir !== 'left' && direction.change) 
                direction = { ...direction, dir: 'right', change: false }; break;
            case 40: if (direction.dir !== 'top' && direction.change) 
                direction = { ...direction, dir: 'bottom', change: false }; break;
        }
    }
        
    function setDirection() {
        switch(direction.dir) {
            case 'left':    x -= s; break;
            case 'top':     y -= s; break;
            case 'right':   x += s; break;
            case 'bottom':  y += s; break;
        }
        if (x == cw) x =  0;
        if (x <   0) x =  cw - s;
        if (y == cw) y =  0;
        if (y <   0) y =  cw - s;
    }
        
    function draw () {
        drawInterval = setInterval(() => {
            if(!isPaused){
                setDirection();
                
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, cw, cw);
                
                if (tail.length > 0) {
                    for (let i = 1; i < tail.length; i++) {
                        tail[i - 1] = tail[i];
                        ctx.fillStyle = '#02A4A8';
                        ctx.fillRect(tail[i].x + 2, tail[i].y + 2, s - 4, s - 4);
                        if (tail[i].x == x && tail[i].y == y) cutTale();
                    }   
                    tail[tail.length - 1] = {x, y};
                }
                
                ctx.fillStyle = '#F16D31';
                ctx.fillRect(food.x, food.y, s, s);
                
                ctx.fillStyle = '#02A4A8';
                ctx.fillRect(x, y, s, s);
                
                if (x == food.x && y == food.y) createFood(true);
                
                direction = { ...direction, dir: direction.dir, change: true }
            }
        }, speed)
    }
        
    function getEl(id) {
        return document.getElementById(id);
    }

    function pause(event){
        isPaused = !isPaused;
    }
        
}   