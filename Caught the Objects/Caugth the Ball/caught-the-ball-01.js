(function gameTest(){  
    //Constant
    const UP = 87, DOWN = 83,  RIGHT = 68, LEFT = 65;   
    
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
        pickColor: 1
    };
    
    //Messages
    let messages = {}
    
    //Comands
    window.addEventListener('keydown',function(e){
        let key = e.keyCode;
        if(p1.vx < 3){    
            if(key === RIGHT){
                p1.vx++;
            }else if(key === LEFT){
                p1.vx--;
            }
        }else if(key != RIGHT){
            p1.vx--
        }else if(key != LEFT){
            p1.vx++
        }
        //System of control of the UP(W) and DOWN(S)
        if(p1.vy < 3){
            if(key === UP){
                p1.vy--;
                //alert(e.keyCode);     
            }else if(key === DOWN){
                p1.vy++;
            }
        }else if(key != UP){
            p1.vy++;
        }else if(key != DOWN){
            p1.vy--;
        }

    });

    cnv.addEventListener('keyup',function(){},false);

    //Functions
    function loop(){
        requestAnimationFrame(loop, cnv);
        update();
        render();    
    };
    
    function update(){
      //Deslocamento da bola
      p1.x += p1.vx;  
      p1.y += p1.vy;

      //Colisions X and Y
        if(p1.x - p1.radius < 0){
            p1.x = p1.radius;
            p1.vx *= -0.8;
        }else if(p1.x + p1.radius > cnv.width){
            p1.x = cnv.width - p1.radius;
            p1.vx *= -0.8;
        }

        if(p1.y - p1.radius < 0){
            p1.y = p1.radius;
            p1.vy *= -0.8;
        }else if(p1.y + p1.radius > cnv.height){
            p1.y = cnv.height - p1.radius;
            p1.vy *= -0.8;
        }
    };
    
    function render(){
        //Background
        ctx.clearRect(0, 0, cnv.width,cnv.height);
        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, cnv.width, cnv.height);
        
        //player1 render
        ctx.fillStyle = p1.color;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill();
    };
    
    function startGame(){
        p1.radius = 5;
    };

    loop();
}());
 