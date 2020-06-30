//Declarando Variáveis
let vdiv = document.querySelector('div#iddiv0');
let ball = {
    radius: 20,
    vx: Math.floor(Math.random()*10+1),
    vy: 0,
    x: 150,
    y: 150,
    color: 'black',
    held: false
}

//Cria o Canvas
const cnv = document.createElement('canvas');
const ctx = cnv.getContext('2d');
cnv.width = 300;
cnv.height = 600;
vdiv.appendChild(cnv);

//Physics
const gravity = 0.1;

//Mouse Position\ apparence
let catX = catY = hyp = 0;
let cssValue = 'cursor: -webkit-grab; cursor: -moz-grab;';
cnv.style.cssText = cssValue;

//Escutadores-Controladores de teclas
cnv.addEventListener('mousedown',function(e){
    cssValue = 'cursor: -webkit-grabbing; cursor: -moz-grabbing;';
    cnv.style.cssText = cssValue;

    catX = ball.x - e.offsetX;
    catY = ball.y - e.offsetY;
    hyp = Math.sqrt(catX*catX + catY*catY);

    if(hyp < ball.radius){
        /* 
        Para o 'TEMPO'
        ball.held = ball.held ? false : true;
        */
       ball.held = true;
    }
},false);
cnv.addEventListener('mouseup',function(e){
    cssValue = 'cursor: -webkit-grab; cursor: -moz-grab;';
    cnv.style.cssText = cssValue;

    if(ball.held){
        ball.held = false;
    }
},false);
cnv.addEventListener('mousemove',function(e){
    if(ball.held){
        ball.x = e.offsetX;
        ball.y = e.offsetY;
    }
},false);


function loop(){
    window.requestAnimationFrame(loop, cnv);
    update();
    render();
};

function update(){
    //Ação da bola
    if(!ball.held){
        ball.vy += gravity;
        ball.y += ball.vy;
        ball.x += ball.vx;
    }else{
        ball.vx = 0;
        ball.vy = 0;
    }

    //Reação da bola-CHÃO 
    if(ball.y > cnv.height - ball.radius){
        ball.y = cnv.height - ball.radius;
        ball.vy *= -0.8;
    }

    //Reação da bola-PAREDES
    if(ball.x - ball.radius < 0 || ball.x + ball.radius > cnv.width){
        //Operador ternário
        ball.x = ball.x - ball.radius < 0 ? ball.radius : cnv.width - ball.radius;
        /*
        if(ball.x - ball.radius < 0){
            ball.x = ball.radius;
        }else{
            ball.x= cnv.width - ball.radius;
        }
        */
        ball.vx *= -0.8 
    }

};

function render(){
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(0,0,cnv.width, cnv.height);
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.closePath();
    ctx.fill();
};
loop();