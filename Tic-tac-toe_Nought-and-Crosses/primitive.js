const player1 = 'X'
const player2 = 'O'
var playTime = player1
var gameOver = false

atualizaMostrador()
inicializarJogadas()

function atualizaMostrador(){
    if(gameOver){
        return
    }
    if(playTime == player1){
        var player = window.document.querySelectorAll("div#mostrador img")[0]
        player.setAttribute("src","images/X.png") 
    }else{
        var player = window.document.querySelectorAll("div#mostrador img")[0]
        player.setAttribute("src","images/O.png")
    }
}

function inicializarJogadas(){
    var clcasas = window.document.getElementsByClassName("clcasas")
    for (let i = 0; i < clcasas.length; i++) {
        clcasas[i].addEventListener('click',function(){
            if(gameOver){
                return
            }
            if(this.getElementsByTagName('img').length == 0){   
                if(playTime == player1){
                    this.innerHTML = "<img src='images/X.png'>" 
                    this.setAttribute('jogador', player1)  
                    playTime = player2 
                }else{
                    this.innerHTML = "<img src='images/O.png'>"
                    this.setAttribute('jogador', player2)
                    playTime = player1
                }
            }
            atualizaMostrador()
            verificarVencedor()
        })   
    }
} 

async function verificarVencedor(){
    var a1 =document.getElementById('ida1').getAttribute('jogador')
    var a2 =document.getElementById('ida2').getAttribute('jogador')
    var a3 =document.getElementById('ida3').getAttribute('jogador')

    var b1 =document.getElementById('idb1').getAttribute('jogador')
    var b2 =document.getElementById('idb2').getAttribute('jogador')
    var b3 =document.getElementById('idb3').getAttribute('jogador')

    var c1 =document.getElementById('idc1').getAttribute('jogador')
    var c2 =document.getElementById('idc2').getAttribute('jogador')
    var c3 =document.getElementById('idc3').getAttribute('jogador')

    var winner = ""

    if((a1 == b1 && a1 == c1 && a1 != "") || (a1 == a2 && a1 == a3 && a1 != "") || (a1 == b2 && a1 == c3 && a1 != "")){
        winner = a1
    }else if(((b2 == b1 && b2 == b3) || (b2 == a2 && b2 == c2) || (b2 == a3 && b2 == c1)) && (b2 != '')){
        winner = b2
    }else if((c3 == c2 && c3 == c1) || (c3 == b3 && c3 == a3) && (c3 != '')){
        winner = c3
    }
    if(winner != ""){
        gameOver = true
        await sleep(50) 
        alert(`o jogador ${winner} venceu o jogo.`)
    }
    if(a1 != '' && a2 != '' && a3 != '' && b1 != '' && b2 != '' && b3 != '' && c1 != '' && c2 != '' && c3 != '' && winner == ''){
        await sleep(50)
        alert('Empate!!')
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

/*
function resetAll(){
    playTime = player1
    gameOver = false
    winner = ""
    var clcasas = window.document.getElementsByClassName("clcasas")
    
    for (let i = 0; i < clcasas.length; i++) {
        clcasas.innerHTML = "<img src=''>"  
        clcasas[i].setAttribute('jogador','')    
    }
    
}
*/




























/*
var vpwd = window.document.querySelector('p#idopen')
var vres = window.document.getElementById('res')
function startPrograming(e){
    vres.innerHTML = `Abraços!`
}
*/