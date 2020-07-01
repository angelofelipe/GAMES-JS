(function(){
    //declarando o canvas
    const cnv = document.querySelector('canvas#idcnv0');
    const ctx = cnv.getContext('2d');
    
    const gravity = 0.1;
    let catX = catY = hyp = 0;
    /*
    ctx.fillStyle = 'blue'
    ctx.fillRect(0, 0, cnv.width, cnv.height)
    */
    
    //Estados do jogo
    const START = 1 , PLAY = 2, OVER = 3;
    let gameState = START; 

    //Pontuação
    let score = 0;

    //Record
    let record = localStorage.getItem('record') ? localStorage.getItem('record') : null;
    /*
    let record = 0;
    if(localStorage.getItem('record') !== null){
        record = localStorage.getItem('record');
    };
    */

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

    //Menssagem inicial
    let startMessage = {
        text: 'TOUCH TO START',
        y: (cnv.height / 2 - 100),
        font: 'bold 30px Sans-Serif',
        color: '#f00',
        visible: true
    }
    messages.push(startMessage);

    //Menssagem do record 
    let recordMessage = Object.create(startMessage);
    recordMessage.visible = false;
    recordMessage.y = (cnv.height / 2 + 100);
    messages.push(recordMessage);

    //Mensagem final
    let scoreText = Object.create(startMessage);
    scoreText.visible = false;
    scoreText.y = (cnv.height / 2 + 50);
    messages.push(scoreText);

    //eventos
    cnv.addEventListener('mousedown', function(e){
        catX = ball.x - e.offsetX;
        catY = ball.y - e.offsetY;
        hyp = Math.sqrt(catX*catX + catY*catY);
        switch(gameState){
            case START:
                gameState = PLAY;
                startMessage.visible = false;
                startGame();
                break;
            case PLAY:
                if(hyp <= ball.radius && !ball.touched){
                    ball.vx = Math.floor((Math.random()*21) -10);
                    ball.vy = -(Math.floor((Math.random() * 6) + 5));
                    ball.touched = true;
                    score++;
                }
                break;
        }
    },false);

    cnv.addEventListener('mouseup',function(){
        ball.touched = false;
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
        //Ação da gravidade e deslocamento da bola
        ball.vy += gravity;
        ball.y += ball.vy;
        ball.x += ball.vx;

        //Reação da bola com o cenário lateral
        if(ball.x < ball.radius  || ball.x + ball.radius > cnv.width){
            if(ball.x < ball.radius){
                ball.x = ball.radius;
            }else{
                ball.x = cnv.width - ball.radius;
            }
            ball.vx *= -0.8;
        }

        //Reação da bola com o cenário superior
        if(ball.y < ball.radius && ball.vy < 0){
            ball.y = ball.radius;
            ball.vy *= -1; 
        };

        //Game OVER
        if(ball.y - ball.radius > cnv.height){
            gameState = OVER;
            ball.visible = false;

            window.setTimeout(function(){
                startMessage.visible = true;
                gameState = START;
            },2000/*Tempo em milisegundos*/);

            scoreText.text = 'YOUR SCORE: '+ score;
            scoreText.visible = true;

            if(score > record){
                record = score;
                localStorage.setItem('record',record);
            };
            recordMessage.text = 'BEST SCORE: '+record;
            recordMessage.visible = 'true'
        }
    };

    function render(){
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        
        ctx.fillStyle = 'blue'
        ctx.fillRect(0, 0, cnv.width, cnv.height)

        //Renderização da bola
        if(ball.visible){
            ctx.fillStyle = ball.color;
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
            ctx.closePath();
            ctx.fill();
            //Renderizar o placar
            ctx.font = 'bold 15px Arial';
            ctx.fillStyle = '#ffffff';
            ctx.fillText('SCORE: '+ score, 10, 20);

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
        
    }; 
    //Função de inicialização do jogo
    function startGame(){
        ball.vy = 0;
        ball.y = 50;
        /*Depois de alguns minutos tentando entender o código(fórmula), finalmente comprendi, primeiro ela encontra um número entre o e 0.9, depois, multiplica por 21, o que nos dá uma faixa de valores entre 0 e 20, logo após ele subtrai por 10, o que nos possibilita uma outra faixa de valores entre -10 e 10 e por fim arredonda o número pra baixo pra resultar num inteiro. Pode parecer meio besta, mas é uma sensação incrível quando esse tipo de coisa acontece*/
        ball.vx = (Math.floor((Math.random()*21)-10))
        /*Essa fórmula faz com que o eixo 'x' seja alterado pra qualquer lugar a cada vez que o jogo inicia*/
        ball.x = ((Math.floor(Math.random()*261) + 20))
        ball.visible = true;
        score = 0;
        scoreText.visible = false;
        recordMessage.visible = false;
    }
    loop();  
}());