(function gameTest(){  
    /*Tenho que implementar o sistema de GAME OVER, guardar o BEST SCORE na memória, dar um limite de bolas que dá pra pegar, depois estudar a física com outras bolas, entender esse RIT BOX maluco e implementar um modo multiplayer*/

    //Constant
    const START = 1, PLAY = 2, OVER = 3;
    const UP = 87, DOWN = 83,  RIGHT = 68, LEFT = 65;   
    const SPEED = 3, REACTION = -1 ; 

    //Variables
    let key = disX = disY = radiusP1 = 0;
    let stateGame = START;

    //Criation of the canvas
    const cnv = document.querySelector('canvas');
    const ctx = cnv.getContext('2d');
    
    //player1
    let p1 = {
        vx: 0,
        vy: 0,
        x: 100,
        y: 100,
        radius: 5,
        color: 'black',
        visible: false,
        pickColor: 1
    };
    
    //Score-Points
    let scPoint = {
        value: 1,
        scPt: 0,
        radius: 5,
        color: 'red',
        visible: false,
        x: (Math.floor(Math.random()*(cnv.width-10)))+5,
        y: (Math.floor(Math.random()*(cnv.height-10)))+5,
    };

    //Messages
    let messages = [];
    let scoreMessage = {
        x: 20,
        y: 20,
        text: 'SCORE: ',
        font: 'bold 15pt Arial',
        color: 'white',
        align: 'left',
        visible: false
    };
    messages.push(scoreMessage);
    
    let startMessage = Object.create(scoreMessage);
    startMessage.x = cnv.width / 2 ;
    startMessage.y = cnv.height / 2 - 100;
    startMessage.font = 'bold 30pt Romam';
    startMessage.text = 'CLICK TO START';
    startMessage.align = 'center';
    startMessage.visible = true;
    messages.push(startMessage);

    let scoreEndMessage = Object.create(scoreMessage);
    scoreEndMessage.x = cnv.width / 2;
    scoreEndMessage.y = cnv.height / 2 + 100;
    scoreEndMessage.font = 'bold 30pt Arial';
    scoreEndMessage.text = 'YOUR SCORE';
    scoreEndMessage.align = 'center';
    scoreEndMessage.visible = false
    messages.push(scoreEndMessage);

    let overMessage = Object.create(scoreMessage);
    overMessage.x = cnv.width / 2;
    overMessage.y = cnv.height / 2;
    overMessage.font = 'bold 30 Arial';
    overMessage.text = 'GAME OVER';
    overMessage.align = 'center';
    overMessage.visible = false;
    messages.push(overMessage);

    //Comands
    window.addEventListener('keydown',function(e){
        key = e.keyCode;
        //System of control of the LEFT(A) and RIGHT(D)
        if(-SPEED < p1.vx && p1.vx < SPEED){    
            if(key === RIGHT){
                p1.vx++;
            }else if(key === LEFT){
                p1.vx--;
            };
        }else if(p1.vx <= -SPEED || SPEED <= p1.vx){
            if(key == RIGHT && p1.vx <= -SPEED){
                p1.vx++;
            }else if(key == LEFT && SPEED <= p1.vx){
                p1.vx--;
            };
        };
        //System of control of the UP(W) and DOWN(S)
        if(-SPEED < p1.vy && p1.vy < SPEED){
            if(key === UP){
                p1.vy--;
                //alert(e.keyCode);     
            }else if(key === DOWN){
                p1.vy++;
            };
        }else if(p1.vy <= -SPEED || SPEED <= p1.vy ){
            if(key === UP && SPEED <= p1.vy){
                p1.vy--;
            }else if(key === DOWN && p1.vy <= -SPEED){
                p1.vy++;
            };
        };

        switch(stateGame){
            case START:
                stateGame = PLAY;
                startMessage.visible = false;
                p1.visible = true;
                scPoint.visible = true;
                break;
            case PLAY:
                scoreMessage.visible = true;
                break;
        }
    },false);

    //Functions
    function loop(){
        requestAnimationFrame(loop, cnv);
        update();
        render();    
    };
    
    function update(){
        //State Game
        if(stateGame === START){

        }else if(stateGame === PLAY){

        }else if(stateGame === OVER){

        };

        //Dislocation of the ball
        p1.x += p1.vx;  
        p1.y += p1.vy;

        //Colisions X and Y
        if(p1.x - p1.radius < 0){
            p1.x = p1.radius;
            p1.vx *= REACTION;
        }else if(p1.x + p1.radius > cnv.width){
            p1.x = cnv.width - p1.radius;
            p1.vx *= REACTION;
        }

        if(p1.y - p1.radius < 0){
            p1.y = p1.radius;
            p1.vy *= REACTION;
        }else if(p1.y + p1.radius > cnv.height){
            p1.y = cnv.height - p1.radius;
            p1.vy *= REACTION;
        }
        
        //Colisions between player1 and scPoint
        radiusP1 = p1.radius + scPoint.radius;
        //1, 2, 3 and 4 quadrant respectively
        if(scPoint.x < p1.x && scPoint.y < p1.y){
            disX = p1.x - scPoint.x;
            disY = p1.y - scPoint.y;
        }else if(p1.x < scPoint && scPoint.y < p1.y){
            disX = scPoint.x - p1.x;
            disY = p1.y - scPoint.y;
        }else if(p1.x < scPoint.x && p1.y < scPoint.y){
            disX = scPoint.x - p1.x;
            disY = scPoint.y - p1.y;
        }else if(scPoint.x < p1.x && p1.y < scPoint.y){
            disX = p1.x - scPoint.x;
            disY = scPoint.y - p1.y;
        };
        //Current Score
        if(disX < radiusP1 && disY < radiusP1){
            scPoint.scPt += 1; 
            p1.radius+=1;
            //Respawn of the scPoint
            scPoint.x = (Math.floor(Math.random()*(cnv.width-10)))+5;
            scPoint.y = (Math.floor(Math.random()*(cnv.height-10)))+5;
        };
        
    };
    
    function render(){
        //Background
        ctx.clearRect(0, 0, cnv.width,cnv.height);
        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, cnv.width, cnv.height);
        
        //player1 render
        if(p1.visible){
            ctx.fillStyle = p1.color;
            ctx.beginPath();
            ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI*2);
            ctx.closePath();
            ctx.fill();
            //Render Score 
            ctx.fillStyle = scoreMessage.color;
            ctx.font = scPoint.font;
            ctx.fillText(scoreMessage.text + scPoint.scPt, scoreMessage.x, scoreMessage.y);
        };

        //Score-Points
        if(scPoint.visible){
            ctx.fillStyle = scPoint.color;
            ctx.beginPath();
            ctx.arc(scPoint.x, scPoint.y, scPoint.radius, 0, Math.PI*2);
            ctx.closePath();
            ctx.fill();
        };

        //messages text
        for(let i in messages){
            let msg = messages[i];
            if(msg.visible){
                ctx.font = msg.font;
                ctx.fillStyle = msg.color;
                ctx.textAlign = msg.align;
                ctx.fillText(msg.text, msg.x, msg.y);
            };
        };
    };
    
    function startGame(){
        p1.radius = 5;
    };

    loop();
}());
 