//Cria o Canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 256;
canvas.height = 256;
document.body.appendChild(canvas);

ctx.fillStyle = 'black';
ctx.fillRect(0,0,canvas.width,canvas.height);

//Imagem de Fundo
let bgReady = false;
const bgImage = new Image();
bgImage.onload = function(){
    bgReady = true;
}
bgImage.src = 'images/background.jpg';
 
//Imagem do Herói
 let heroReady = false;
 const heroImage = new Image();
 heroImage.onload = function(){
     heroReady = true;
 }
heroImage.src = 'images/link18.png';

//Imagem do Mostro
let monsterReady = false;
const monsterImage = new Image();
monsterImage.onload = function(){
    monsterReady = true;
}
monsterImage.src = 'images/boy.png'

//Objetos do Jogo
const hero = {
    speed: 256 //movimento em pixels por segundo
}
const monster = {};
let monstersCaught = 0;

//Controle do Teclado
const keysDown = {};

window.addEventListener('keydown',function(e){
    /*
    ESSE COMANDO É ÚTIL PRA OBSERVAR ATRAVÉS DO CONSOLE QUAL O 'KEYCODE' DA TECLA PRESSIONADA.
->  console.log(e);
    */
    keysDown[e.keyCode] = true;
},false);

window.addEventListener('keyup',function(e){
    delete keysDown[e.keyCode];
},false);
 
//Reseta o Jogo quando o Jogador Pega o Mostro
const reset = function(){
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    //Posiciona o Mostro Randomicamente Pela Tela
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};