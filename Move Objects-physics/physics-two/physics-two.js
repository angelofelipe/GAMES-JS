(function(){
    //declarando o canvas
    const cnv = document.querySelector('canvas#idcnv0');
    const ctx = cnv.getContext('2d');
    /*
    ctx.fillStyle = 'blue'
    ctx.fillRect(0, 0, cnv.width, cnv.height)
    */
    
    //Estados do jogo
    const START = 1 , PLAY = 2, OVER = 3;
    let gameState = START; 

    //Objeto bola
    let ball = {
        radius: 20,
        vx: 0,
        vy: 0,
        x: cnv.width/2 - 10,
        y: 50,
        color: '#f00',
        touched: false,
        visible: false
    }
    //Menssagens
    let messages = [];
    let startMessage = {
        text: 'TOUCH TO START',
        y: cnv.height / 2 - 100,
        font: 'bold 30px Sans-Serif',
        color: '#f00',
        visible: true
    }
    messages.push(startMessage);

    //eventos
    cnv.addEventListener('mousedown', function(e){
        switch(gameState){
            case START:
                gameState = PLAY;
                startMessage.visible = false;
                startGame();
                break;
        }
    },false);

    //Funções
    function loop(){
        requestAnimationFrame(loop, cnv);
        if(gameState === PLAY){
            update();
        }
        render();
    };

    function update(){
        
    };

    function render(){
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        
        //Renderização da bola
        if(ball.visible){
            ctx.fillStyle = ball.color;
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
            ctx.closePath();
            ctx.fill();
        }
        
        //Renderização das menssagens de texto
        for(let i in messages){
            let msg = messages[i];
            if(msg.visible){
                ctx.font = msg.font;
                ctx.fillStyle = msg.color;
                /* Ele escolheu não declarar o 'x' no objeto porque utilizou outro método pra centralizar o texto na tela, mas ele simplesmente poderia utilizar o 'ctx.textAlign = "center"'.ctx.textAlign = 'center'                                    */
                ctx.fillText(msg.text, (cnv.width - ctx.measureText(msg.text).width) / 2, msg.y)


                /* Não se esqueça que o 'l' de 'textBaseline' é minúsculo ctx.textBaseline = "middle";                               ctx.fillText('Grande Homem',0, 0)                           */
            }
        }   
        //ctx.fillStyle = 'blue'
        //ctx.fillRect(0, 0, cnv.width, cnv.height)
    }; 
    //Função de inicialização do jogo
    function startGame(){
        ball.visible = true;
    }
    loop();  
}());